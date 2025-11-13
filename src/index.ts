// src/index.ts
import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

// ---- Seed tipleri
type CategorySeed = {
  name: string;
  parent?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

type AttributeSeed = { key: string; value: string };

type VariantSeed = {
  sku?: string;
  barcode?: string;
  options?: Record<string, string | number>;
  price: number;
  salePrice?: number;
  stockQty?: number;
  manageStock?: boolean;
};

type ProductSeed = {
  title: string;
  shortDescription?: string;
  description?: string;
  price: number;
  salePrice?: number;
  currency?: string;
  sku?: string;
  barcode?: string;
  stockQty?: number;
  manageStock?: boolean;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'preorder';
  categories?: string[]; // isim listesi (ör. ["Electronics"])
  brand?: string;
  tags?: any;
  attributes?: AttributeSeed[];
  variants?: VariantSeed[];
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  seoTitle?: string;
  seoDescription?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
};

// ---- Content-Type UID'leri
const CATEGORY_CT = 'api::category.category' as const;
const PRODUCT_CT = 'api::product.product' as const;
const SHIPPING_ZONE_CT = 'api::shipping-zone.shipping-zone' as const;
const SHIPPING_METHOD_CT = 'api::shipping-method.shipping-method' as const;
const TAX_RULE_CT = 'api::tax-rule.tax-rule' as const;
const DISCOUNT_CT = 'api::discount.discount' as const;
const COUPON_CT = 'api::coupon.coupon' as const;

// ---- Data kök klasör (default: ./data)
const DATA_ROOT = process.env.SEED_DATA_ROOT || "./src/data";

// ---- JSON okuma helper
function readJSON<T>(...segments: string[]): T {
  const p = path.resolve(process.cwd(), DATA_ROOT, ...segments);
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw) as T;
}

// ---- Sayı parse helper
const priceNum = (v?: number | string) =>
  typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : undefined;

// ---- Ürün modelinde kategori alanı ve ilişki türü tespiti
function getProductCategoryFieldInfo(strapi: Core.Strapi) {
  const model = strapi.contentType(PRODUCT_CT);
  if (!model) return { field: null as string | null, relation: null as string | null };

  // Önce "categories", yoksa "category"
  let field: string | null = null;
  if (model.attributes?.['categories']) field = 'categories';
  else if (model.attributes?.['category']) field = 'category';

  const relation = field ? (model.attributes[field] as any)?.relation : null; // manyToMany, manyToOne, oneToOne...
  return { field, relation };
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed tetikleyici (ENV)
    if (process.env.SEED_CATEGORIES !== 'true') {
      strapi.log.info('Seed skipped. Set SEED_CATEGORIES=true to run.');
      return;
    }

    // Aynı makinede bir kez çalıştırma koruması (opsiyonel)
    if (process.env.SEED_ONCE === 'true') {
      const FLAG = 'seed:done:v1';
      const store = strapi.store({ type: 'core', name: 'app' });
      const done = await store.get({ key: FLAG });
      if (done) {
        strapi.log.info('Seed already done (core_store). Skipping.');
        return;
      }
      // en sonda set edeceğiz
    }

    // =========================
    // 1) KATEGORİLER
    // =========================
    const { categories } = readJSON<{ categories: CategorySeed[] }>('categories.json');
    const nameToId = new Map<string, number>();

    for (const c of categories) {
      const baseData = {
        name: c.name,
        slug: slugify(c.name, { lower: true, strict: true }),
        description: c.description ?? '',
        sortOrder: c.sortOrder ?? 0,
        isActive: c.isActive ?? true,
        seoTitle: c.seoTitle ?? c.name,
        seoDescription: c.seoDescription ?? (c.description ? String(c.description).slice(0, 160) : ''),
        publishedAt: new Date().toISOString(),
      };

      const existing = await strapi.entityService.findMany(CATEGORY_CT, {
        filters: { name: c.name },
        limit: 1,
      });

      let id: number;
      if (existing?.length) {
        const updated = await strapi.entityService.update(CATEGORY_CT, existing[0].id, { data: baseData });
        id = (updated as any).id as number;
      } else {
        const created = await strapi.entityService.create(CATEGORY_CT, { data: baseData });
        id = (created as any).id as number;
      }
      nameToId.set(c.name, id);
    }

    // parent ilişkileri (varsa)
    for (const c of categories) {
      if (!c.parent) continue;
      const childId = nameToId.get(c.name);
      const parentId = nameToId.get(c.parent);
      if (childId && parentId) {
        // parent gerçekten var mı kontrol
        const parentExists = await strapi.entityService.findOne(CATEGORY_CT, parentId, { fields: ['id'] });
        if (parentExists) {
          await strapi.entityService.update(CATEGORY_CT, childId, { data: { parent: parentId } });
        } else {
          strapi.log.warn(`Parent id ${parentId} bulunamadı, "${c.name}" için parent set edilmedi.`);
        }
      }
    }

    strapi.log.info(`Seeded/updated ${categories.length} categories ✅`);

    // =========================
    // 2) ÜRÜNLER
    // =========================
    const { products } = readJSON<{ products: ProductSeed[] }>('products.json');

    const { field: categoryFieldName, relation: categoryRelation } = getProductCategoryFieldInfo(strapi);
    if (!categoryFieldName) {
      strapi.log.warn('Product modelinde "categories" veya "category" alanı bulunamadı. Ürün-kategori ilişkileri set edilmeyecek.');
    }

    for (const p of products) {
      // Kategori isimlerinden id map'i
      const rawCategoryIds =
        p.categories?.map((catName) => nameToId.get(catName)).filter((id): id is number => typeof id === 'number') ?? [];

      // DB'de gerçekten var olan kategori id'lerini doğrula
      let validCategoryIds: number[] = [];
      if (rawCategoryIds.length) {
        const existingCats = await strapi.entityService.findMany(CATEGORY_CT, {
          filters: { id: { $in: rawCategoryIds } },
          fields: ['id'],
          limit: rawCategoryIds.length,
        });
        validCategoryIds = existingCats.map((x: any) => x.id);
        if (validCategoryIds.length !== rawCategoryIds.length) {
          const missing = rawCategoryIds.filter((id) => !validCategoryIds.includes(id));
          strapi.log.warn(`Product "${p.title}": şu kategori id'leri yok sayıldı -> ${missing.join(', ')}`);
        }
      }

      // m2m / m2o format hazırlığı
      let categoriesData: any = undefined;
      if (categoryFieldName) {
        if ((categoryRelation || '').toLowerCase().includes('many')) {
          categoriesData = validCategoryIds.length ? validCategoryIds : undefined; // manyToMany / oneToMany gibi
        } else {
          categoriesData = validCategoryIds[0] ?? undefined; // manyToOne / oneToOne gibi tek id
        }
      }

      // min/max price (ürün + varyantlar)
      const candidatePrices: number[] = [];
      const baseP = priceNum(p.salePrice ?? p.price);
      if (typeof baseP === 'number') candidatePrices.push(baseP);
      for (const v of p.variants ?? []) {
        const vp = priceNum(v.salePrice ?? v.price);
        if (typeof vp === 'number') candidatePrices.push(vp);
      }
      const minPrice = candidatePrices.length ? Math.min(...candidatePrices) : priceNum(p.price);
      const maxPrice = candidatePrices.length ? Math.max(...candidatePrices) : priceNum(p.price);

      // Ürün base alanları (modelinde olmayan alanları eklediysen burada çıkarmalısın)
      const baseData: any = {
        title: p.title,
        slug: slugify(p.title, { lower: true, strict: true }),
        shortDescription: p.shortDescription ?? '',
        description: p.description ?? '',
        price: p.price,
        salePrice: p.salePrice,
        currency: p.currency ?? 'USD',
        sku: p.sku,
        barcode: p.barcode,
        stockQty: p.stockQty ?? 0,
        manageStock: p.manageStock ?? true,
        stockStatus: p.stockStatus ?? 'in_stock',
        brand: p.brand,
        tags: p.tags ?? [],
        attributes: (p.attributes ?? []) as any,
        variants: (p.variants ?? []) as any,
        minPrice,
        maxPrice,
        isFeatured: p.isFeatured ?? false,
        isNew: p.isNew ?? false,
        rating: p.rating ?? 4.6,
        reviewCount: p.reviewCount ?? 0,
        weight: p.weight,
        width: p.width,
        height: p.height,
        depth: p.depth,
        seoTitle: p.seoTitle ?? p.title,
        seoDescription: p.seoDescription ?? (p.shortDescription ? p.shortDescription.slice(0, 160) : ''),
        publishedAt: new Date().toISOString(),
      };

      // upsert kriteri: SKU varsa SKU, yoksa title
      const filters: any = p.sku ? { sku: p.sku } : { title: p.title };
      const existingProd = await strapi.entityService.findMany(PRODUCT_CT, { filters, limit: 1 });

      const dataForWrite: any = { ...baseData };
      if (categoryFieldName && categoriesData !== undefined) {
        dataForWrite[categoryFieldName] = categoriesData;
      }

      if (existingProd?.length) {
        await strapi.entityService.update(PRODUCT_CT, existingProd[0].id, { data: dataForWrite });
      } else {
        await strapi.entityService.create(PRODUCT_CT, { data: dataForWrite });
      }
    }

    strapi.log.info(`Seeded/updated ${products.length} products ✅`);

    // =========================
    // 3) SHIPPING
    // =========================
    const { zones, methods } = readJSON<{ zones: any[]; methods: any[] }>('shipping.json');
    const zoneNameToId = new Map<string, number>();

    for (const z of zones) {
      const exists = await strapi.entityService.findMany(SHIPPING_ZONE_CT, { filters: { name: z.name }, limit: 1 });
      let id: number;
      if (exists?.length) {
        id = (await strapi.entityService.update(SHIPPING_ZONE_CT, exists[0].id, { data: z }))!.id as any;
      } else {
        id = (await strapi.entityService.create(SHIPPING_ZONE_CT, { data: z }))!.id as any;
      }
      zoneNameToId.set(z.name, id);
    }

    for (const m of methods) {
      const data = { ...m, zone: zoneNameToId.get(m.zone) };
      const exists = await strapi.entityService.findMany(SHIPPING_METHOD_CT, { filters: { name: m.name }, limit: 1 });
      if (exists?.length) {
        await strapi.entityService.update(SHIPPING_METHOD_CT, exists[0].id, { data });
      } else {
        await strapi.entityService.create(SHIPPING_METHOD_CT, { data });
      }
    }
    strapi.log.info(`Seeded shipping zones (${zones.length}) & methods (${methods.length}) ✅`);

    // =========================
    // 4) TAX
    // =========================
    const { rules } = readJSON<{ rules: any[] }>('taxes.json');
    for (const r of rules) {
      const exists = await strapi.entityService.findMany(TAX_RULE_CT, { filters: { name: r.name }, limit: 1 });
      if (exists?.length) {
        await strapi.entityService.update(TAX_RULE_CT, exists[0].id, { data: r });
      } else {
        await strapi.entityService.create(TAX_RULE_CT, { data: r });
      }
    }
    strapi.log.info(`Seeded tax rules (${rules.length}) ✅`);

    // =========================
    // 5) DISCOUNT & COUPON
    // =========================
    const { discounts, coupons } = readJSON<{ discounts: any[]; coupons: any[] }>('discounts.json');
    const discNameToId = new Map<string, number>();

    for (const d of discounts) {
      const exists = await strapi.entityService.findMany(DISCOUNT_CT, { filters: { name: d.name }, limit: 1 });
      let id: number;
      if (exists?.length) {
        id = (await strapi.entityService.update(DISCOUNT_CT, exists[0].id, { data: d }))!.id as any;
      } else {
        id = (await strapi.entityService.create(DISCOUNT_CT, { data: d }))!.id as any;
      }
      discNameToId.set(d.name, id);
    }

    for (const c of coupons) {
      const data = { ...c, discount: discNameToId.get(c.discount) };
      const exists = await strapi.entityService.findMany(COUPON_CT, { filters: { code: c.code }, limit: 1 });
      if (exists?.length) {
        await strapi.entityService.update(COUPON_CT, exists[0].id, { data });
      } else {
        await strapi.entityService.create(COUPON_CT, { data });
      }
    }
    strapi.log.info(`Seeded discounts (${discounts.length}) & coupons (${coupons.length}) ✅`);

    // ---- Tek sefer koruma flag'ini yaz
    if (process.env.SEED_ONCE === 'true') {
      const store = strapi.store({ type: 'core', name: 'app' });
      await store.set({ key: 'seed:done:v1', value: true });
    }

    strapi.log.info('✅ Seed tamamlandı.');
  },
};
