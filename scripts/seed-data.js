const strapi = require('@strapi/strapi');

// Tüm veri
const categoriesData = [
  {
    "id": 1,
    "title": "Nokta dedektor",
    "slug": "nokta-dedektor",
    "products": [
      {
        "name": "Nokta Makro Simplex+ WHP",
        "slug": "nokta-makro-simplexplus-whp",
        "description": "Nokta Makro Simplex+ WHP gelişmiş dedektör teknolojisiyle üstün performans sunar.",
        "shortDescription": "Nokta Makro Simplex+ WHP ile hazine avında fark yaratın.",
        "sku": "SKU-42553",
        "price": 47981,
        "originalPrice": 47981,
        "discountPercentage": 0,
        "stock": 61,
        "brand": "Nokta",
        "specifications": {
          "frekans": "40kHz",
          "ağırlık": "1.6 kg",
          "batarya": "AA"
        },
        "isActive": true,
        "isFeatured": true,
        "isNew": true,
        "isOnSale": false,
        "weight": 1.4763449736550327,
        "dimensions": "35x32x14 cm",
        "width": 31,
        "height": 12,
        "unit": "adet",
        "tags": ["nokta", "dedektör"],
        "rating": 4.5,
        "reviewCount": 189,
        "seoTitle": "Nokta Makro Simplex+ WHP - En İyi Dedektör Fiyatı ve Özellikleri",
        "seoDescription": "Nokta Makro Simplex+ WHP modeli, en son teknoloji ile tasarlanmış bir dedektördür.",
        "metaKeywords": "Nokta Makro Simplex+ WHP, dedektör, hazine, metal, arama"
      },
      {
        "name": "Nokta Makro The Legend",
        "slug": "nokta-makro-the-legend",
        "description": "Nokta Makro The Legend gelişmiş dedektör teknolojisiyle üstün performans sunar.",
        "shortDescription": "Nokta Makro The Legend ile hazine avında fark yaratın.",
        "sku": "SKU-55230",
        "price": 25403,
        "originalPrice": 30483,
        "discountPercentage": 20,
        "stock": 31,
        "brand": "Nokta",
        "specifications": {
          "frekans": "40kHz",
          "ağırlık": "2.0 kg",
          "batarya": "AA"
        },
        "isActive": true,
        "isFeatured": true,
        "isNew": true,
        "isOnSale": true,
        "weight": 1.5914236648593478,
        "dimensions": "49x23x17 cm",
        "width": 34,
        "height": 18,
        "unit": "adet",
        "tags": ["nokta", "dedektör"],
        "rating": 4.2,
        "reviewCount": 155,
        "seoTitle": "Nokta Makro The Legend - En İyi Dedektör Fiyatı ve Özellikleri",
        "seoDescription": "Nokta Makro The Legend modeli, en son teknoloji ile tasarlanmış bir dedektördür.",
        "metaKeywords": "Nokta Makro The Legend, dedektör, hazine, metal, arama"
      },
      {
        "name": "Nokta Makro Anfibio Multi",
        "slug": "nokta-makro-anfibio-multi",
        "description": "Nokta Makro Anfibio Multi gelişmiş dedektör teknolojisiyle üstün performans sunar.",
        "shortDescription": "Nokta Makro Anfibio Multi ile hazine avında fark yaratın.",
        "sku": "SKU-70619",
        "price": 46419,
        "originalPrice": 48739,
        "discountPercentage": 5,
        "stock": 61,
        "brand": "Nokta",
        "specifications": {
          "frekans": "10kHz",
          "ağırlık": "2.4 kg",
          "batarya": "Li-ion"
        },
        "isActive": true,
        "isFeatured": true,
        "isNew": true,
        "isOnSale": true,
        "weight": 1.6451364883918969,
        "dimensions": "36x23x20 cm",
        "width": 24,
        "height": 18,
        "unit": "adet",
        "tags": ["nokta", "dedektör"],
        "rating": 3.5,
        "reviewCount": 82,
        "seoTitle": "Nokta Makro Anfibio Multi - En İyi Dedektör Fiyatı ve Özellikleri",
        "seoDescription": "Nokta Makro Anfibio Multi modeli, en son teknoloji ile tasarlanmış bir dedektördür.",
        "metaKeywords": "Nokta Makro Anfibio Multi, dedektör, hazine, metal, arama"
      }
    ]
  },
  {
    "title": "Minelab",
    "slug": "minelab-dedektor",
    "products": [
      {
        "name": "Minelab 11\" Coil, Commander Mono",
        "slug": "minelab-11-coil-commander-mono",
        "description": "Minelab 11\" Coil, Commander Mono yüksek performanslı bir metal dedektörüdür.",
        "shortDescription": "Minelab 11\" Coil, Commander Mono gelişmiş arama teknolojisine sahiptir.",
        "sku": "MIN-1001",
        "price": 14625,
        "originalPrice": 12657,
        "discountPercentage": 16,
        "stock": 35,
        "brand": "Minelab",
        "specifications": {
          "frequency": "Variable",
          "waterproof": true,
          "batteryLife": "8 saat"
        },
        "isActive": true,
        "isFeatured": true,
        "isNew": false,
        "isOnSale": false,
        "weight": 1.5,
        "dimensions": "120x30x20 cm",
        "width": 30,
        "height": 120,
        "unit": "adet",
        "tags": ["metal dedektör", "minelab", "arama cihazı"],
        "rating": 4.2,
        "reviewCount": 88,
        "seoTitle": "Minelab 11\" Coil, Commander Mono | Minelab Dedektör",
        "seoDescription": "Minelab 11\" Coil, Commander Mono modeli ile en zorlu koşullarda bile üstün metal algılama performansı.",
        "metaKeywords": "Minelab 11\" Coil, Commander Mono, metal dedektör, minelab, arama cihazı"
      }
    ]
  },
  {
    "title": "Xp dedektor",
    "slug": "xp-dedektor",
    "products": [
      {
        "name": "XP Deus II",
        "slug": "xp-deus-ii",
        "description": "XP Deus II gelişmiş dedektör teknolojisiyle üstün performans sunar.",
        "shortDescription": "XP Deus II ile hazine avında fark yaratın.",
        "sku": "SKU-91197",
        "price": 41272,
        "originalPrice": 41272,
        "discountPercentage": 0,
        "stock": 37,
        "brand": "Xp",
        "specifications": {
          "frekans": "10kHz",
          "ağırlık": "2.3 kg",
          "batarya": "AA"
        },
        "isActive": true,
        "isFeatured": false,
        "isNew": false,
        "isOnSale": false,
        "weight": 2.1828946376389555,
        "dimensions": "31x29x12 cm",
        "width": 30,
        "height": 15,
        "unit": "adet",
        "tags": ["xp", "dedektör"],
        "rating": 4.5,
        "reviewCount": 169,
        "seoTitle": "XP Deus II - En İyi Dedektör Fiyatı ve Özellikleri",
        "seoDescription": "XP Deus II modeli, en son teknoloji ile tasarlanmış bir dedektördür.",
        "metaKeywords": "XP Deus II, dedektör, hazine, metal, arama"
      }
    ]
  },
  {
    "title": "Garrett dedektor",
    "slug": "garrett-dedektor",
    "products": [
      {
        "name": "Garrett ACE 400i",
        "slug": "garrett-ace-400i",
        "description": "Garrett ACE 400i gelişmiş dedektör teknolojisiyle üstün performans sunar.",
        "shortDescription": "Garrett ACE 400i ile hazine avında fark yaratın.",
        "sku": "SKU-42597",
        "price": 18697,
        "originalPrice": 19631,
        "discountPercentage": 5,
        "stock": 63,
        "brand": "Garrett",
        "specifications": {
          "frekans": "20kHz",
          "ağırlık": "1.8 kg",
          "batarya": "Li-ion"
        },
        "isActive": true,
        "isFeatured": false,
        "isNew": false,
        "isOnSale": true,
        "weight": 2.261456052063789,
        "dimensions": "42x35x15 cm",
        "width": 30,
        "height": 10,
        "unit": "adet",
        "tags": ["garrett", "dedektör"],
        "rating": 4.6,
        "reviewCount": 73,
        "seoTitle": "Garrett ACE 400i - En İyi Dedektör Fiyatı ve Özellikleri",
        "seoDescription": "Garrett ACE 400i modeli, en son teknoloji ile tasarlanmış bir dedektördür.",
        "metaKeywords": "Garrett ACE 400i, dedektör, hazine, metal, arama"
      }
    ]
  },
  {
    "title": "Pointer Dedektor",
    "slug": "pointer-dedektor",
    "products": [
      {
        "name": "Minelab Pro Find 35 Pointer",
        "slug": "minelab-pro-find-35-pointer",
        "description": "Minelab Pro Find 35 Pointer gelişmiş dedektör teknolojisiyle üstün performans sunar.",
        "shortDescription": "Minelab Pro Find 35 Pointer ile hazine avında fark yaratın.",
        "sku": "SKU-12345",
        "price": 12500,
        "originalPrice": 14000,
        "discountPercentage": 10,
        "stock": 25,
        "brand": "Minelab",
        "specifications": {
          "frekans": "20kHz",
          "ağırlık": "1.8 kg",
          "batarya": "Li-ion"
        },
        "isActive": true,
        "isFeatured": true,
        "isNew": false,
        "isOnSale": true,
        "weight": 1.8,
        "dimensions": "40x20x15 cm",
        "width": 20,
        "height": 15,
        "unit": "adet",
        "tags": ["minelab", "dedektör"],
        "rating": 4.7,
        "reviewCount": 35,
        "seoTitle": "Minelab Pro Find 35 Pointer - En İyi Dedektör Fiyatı ve Özellikleri",
        "seoDescription": "Minelab Pro Find 35 Pointer modeli, en son teknoloji ile tasarlanmış bir dedektördür.",
        "metaKeywords": "Minelab Pro Find 35 Pointer, dedektör, hazine, metal, arama"
      }
    ]
  }
];

async function seedData() {
  console.log('Starting data seeding...');
  
  try {
    // Strapi'yi başlat
    const app = await strapi().load();
    
    // Önce brand'leri oluştur
    const brands = new Set();
    categoriesData.forEach(category => {
      category.products.forEach(product => {
        brands.add(product.brand);
      });
    });
    
    const brandMap = new Map();
    for (const brandName of brands) {
      try {
        const brand = await strapi.entityService.create('api::brand.brand', {
          data: {
            name: brandName,
            slug: brandName.toLowerCase().replace(/\s+/g, '-'),
            isActive: true,
            publishedAt: new Date()
          }
        });
        brandMap.set(brandName, brand.id);
        console.log(`Brand created: ${brandName}`);
      } catch (error) {
        console.log(`Brand might already exist: ${brandName}`);
        // Mevcut brand'i bul
        const existingBrand = await strapi.entityService.findMany('api::brand.brand', {
          filters: { name: brandName }
        });
        if (existingBrand.length > 0) {
          brandMap.set(brandName, existingBrand[0].id);
        }
      }
    }
    
    // Tag'leri oluştur
    const tags = new Set();
    categoriesData.forEach(category => {
      category.products.forEach(product => {
        product.tags.forEach(tag => tags.add(tag));
      });
    });
    
    const tagMap = new Map();
    for (const tagName of tags) {
      try {
        const tag = await strapi.entityService.create('api::tag.tag', {
          data: {
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, '-'),
            isActive: true,
            publishedAt: new Date()
          }
        });
        tagMap.set(tagName, tag.id);
        console.log(`Tag created: ${tagName}`);
      } catch (error) {
        console.log(`Tag might already exist: ${tagName}`);
        // Mevcut tag'i bul
        const existingTag = await strapi.entityService.findMany('api::tag.tag', {
          filters: { name: tagName }
        });
        if (existingTag.length > 0) {
          tagMap.set(tagName, existingTag[0].id);
        }
      }
    }
    
    // Kategorileri ve ürünleri oluştur
    for (const categoryData of categoriesData) {
      console.log(`Processing category: ${categoryData.title}`);
      
      let category;
      try {
        category = await strapi.entityService.create('api::category.category', {
          data: {
            name: categoryData.slug,
            title: categoryData.title,
            slug: categoryData.slug,
            isActive: true,
            publishedAt: new Date()
          }
        });
        console.log(`Category created: ${categoryData.title}`);
      } catch (error) {
        console.log(`Category might already exist: ${categoryData.title}`);
        // Mevcut kategoriyi bul
        const existingCategory = await strapi.entityService.findMany('api::category.category', {
          filters: { slug: categoryData.slug }
        });
        if (existingCategory.length > 0) {
          category = existingCategory[0];
        } else {
          console.error(`Failed to create or find category: ${categoryData.title}`);
          continue;
        }
      }
      
      // Ürünleri oluştur
      for (const productData of categoryData.products) {
        console.log(`Processing product: ${productData.name}`);
        
        const brandId = brandMap.get(productData.brand);
        const productTagIds = productData.tags.map(tagName => tagMap.get(tagName)).filter(Boolean);
        
        try {
          const product = await strapi.entityService.create('api::product.product', {
            data: {
              name: productData.name,
              slug: productData.slug,
              description: productData.description,
              shortDescription: productData.shortDescription,
              sku: productData.sku,
              price: productData.price,
              originalPrice: productData.originalPrice,
              discountPercentage: productData.discountPercentage,
              stock: productData.stock,
              brand: brandId,
              categories: [category.id],
              tags: productTagIds,
              specifications: productData.specifications,
              isActive: productData.isActive,
              isFeatured: productData.isFeatured,
              isNew: productData.isNew,
              isOnSale: productData.isOnSale,
              weight: productData.weight,
              dimensions: productData.dimensions,
              width: productData.width,
              height: productData.height,
              unit: productData.unit,
              rating: productData.rating,
              reviewCount: productData.reviewCount,
              seoTitle: productData.seoTitle,
              seoDescription: productData.seoDescription,
              metaKeywords: productData.metaKeywords,
              publishedAt: new Date()
            }
          });
          console.log(`Product created: ${productData.name}`);
        } catch (error) {
          console.error(`Error creating product ${productData.name}:`, error.message);
        }
      }
    }
    
    console.log('Data seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error during data seeding:', error);
    process.exit(1);
  }
}

seedData();