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
  categories?: string[];
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

const CATEGORY_CT = 'api::category.category' as any;
const PRODUCT_CT = 'api::product.product' as any;
const SHIPPING_ZONE_CT = 'api::shipping-zone.shipping-zone' as any;
const SHIPPING_METHOD_CT = 'api::shipping-method.shipping-method' as any;
const TAX_RULE_CT = 'api::tax-rule.tax-rule' as any;
const DISCOUNT_CT = 'api::discount.discount' as any;
const COUPON_CT = 'api::coupon.coupon' as any;

const readJSON = <T>(...segments: string[]): T => {
  const p = path.resolve(process.cwd(), 'src', ...segments);
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw) as T;
};

export default {
  register() { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.SEED_CATEGORIES !== 'true') {
      strapi.log.info('Seed skipped. Set SEED_CATEGORIES=true to run.');
      return;
    }

    // ---- 1) KATEGORİLER
    const { categories } = readJSON<{ categories: CategorySeed[] }>('data', 'categories.json');
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
        publishedAt: new Date().toISOString()
      };

      const existing = await strapi.entityService.findMany(CATEGORY_CT, {
        filters: { name: c.name },
        limit: 1
      });

      let id: number;
      if (existing?.length) {
        const updated = await strapi.entityService.update(CATEGORY_CT, existing[0].id, baseData as any);
        id = (updated as any).id as number;
      } else {
        const created = await strapi.entityService.create(CATEGORY_CT, { data: baseData as any });
        id = (created as any).id as number;
      }
      nameToId.set(c.name, id);
    }

    // parent ilişkileri
    for (const c of categories) {
      if (!c.parent) continue;
      const childId = nameToId.get(c.name);
      const parentId = nameToId.get(c.parent);
      if (childId && parentId) {
        await strapi.entityService.update(CATEGORY_CT, childId, { parent: parentId } as any);
      }
    }

    strapi.log.info(`Seeded/updated ${categories.length} categories ✅`);

    // ---- 2) ÜRÜNLER
    const { products } = readJSON<{ products: ProductSeed[] }>('data', 'products.json');

    const priceNum = (v?: number | string) =>
      typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : undefined;

    for (const p of products) {
      const categoryIds =
        p.categories?.map((catName) => nameToId.get(catName)).filter((id): id is number => typeof id === 'number') ?? [];

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

      const baseData = {
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
        minPrice: minPrice,
        maxPrice: maxPrice,
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
        categories: categoryIds.length ? categoryIds : undefined
      };

      // upsert by SKU (varsa) yoksa title
      const filters: any = p.sku ? { sku: p.sku } : { title: p.title };
      const existingProd = await strapi.entityService.findMany(PRODUCT_CT, { filters, limit: 1 });

      if (existingProd?.length) {
        await strapi.entityService.update(PRODUCT_CT, existingProd[0].id, { ...baseData, categories: categoryIds } as any);
      } else {
        await strapi.entityService.create(PRODUCT_CT, { data: { ...baseData, categories: categoryIds } as any });
      }
    }

    strapi.log.info(`Seeded/updated ${products.length} products ✅`);

    // ---- 3) SHIPPING seed
    const { zones, methods } = readJSON<{ zones: any[]; methods: any[] }>('data', 'shipping.json');
    const zoneNameToId = new Map<string, number>();

    for (const z of zones) {
      const exists = await strapi.entityService.findMany(SHIPPING_ZONE_CT, { filters: { name: z.name }, limit: 1 });
      let id: number;
      if (exists?.length) {
        id = (await strapi.entityService.update(SHIPPING_ZONE_CT, exists[0].id, z as any))!.id as any;
      } else {
        id = (await strapi.entityService.create(SHIPPING_ZONE_CT, { data: z as any }))!.id as any;
      }
      zoneNameToId.set(z.name, id);
    }

    for (const m of methods) {
      const data = { ...m, zone: zoneNameToId.get(m.zone) };
      const exists = await strapi.entityService.findMany(SHIPPING_METHOD_CT, { filters: { name: m.name }, limit: 1 });
      if (exists?.length) {
        await strapi.entityService.update(SHIPPING_METHOD_CT, exists[0].id, data as any);
      } else {
        await strapi.entityService.create(SHIPPING_METHOD_CT, { data: data as any });
      }
    }
    strapi.log.info(`Seeded shipping zones (${zones.length}) & methods (${methods.length}) ✅`);

    // ---- 4) TAX seed
    const { rules } = readJSON<{ rules: any[] }>('data', 'taxes.json');
    for (const r of rules) {
      const exists = await strapi.entityService.findMany(TAX_RULE_CT, { filters: { name: r.name }, limit: 1 });
      if (exists?.length) {
        await strapi.entityService.update(TAX_RULE_CT, exists[0].id, r as any);
      } else {
        await strapi.entityService.create(TAX_RULE_CT, { data: r as any });
      }
    }
    strapi.log.info(`Seeded tax rules (${rules.length}) ✅`);

    // ---- 5) DISCOUNT & COUPON seed
    const { discounts, coupons } = readJSON<{ discounts: any[]; coupons: any[] }>('data', 'discounts.json');
    const discNameToId = new Map<string, number>();

    for (const d of discounts) {
      const exists = await strapi.entityService.findMany(DISCOUNT_CT, { filters: { name: d.name }, limit: 1 });
      let id: number;
      if (exists?.length) {
        id = (await strapi.entityService.update(DISCOUNT_CT, exists[0].id, d as any))!.id as any;
      } else {
        id = (await strapi.entityService.create(DISCOUNT_CT, { data: d as any }))!.id as any;
      }
      discNameToId.set(d.name, id);
    }

    for (const c of coupons) {
      const data = { ...c, discount: discNameToId.get(c.discount) };
      const exists = await strapi.entityService.findMany(COUPON_CT, { filters: { code: c.code }, limit: 1 });
      if (exists?.length) {
        await strapi.entityService.update(COUPON_CT, exists[0].id, data as any);
      } else {
        await strapi.entityService.create(COUPON_CT, { data: data as any });
      }
    }
    strapi.log.info(`Seeded discounts (${discounts.length}) & coupons (${coupons.length}) ✅`);
  }
};
