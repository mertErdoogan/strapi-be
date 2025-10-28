const fs = require('fs');
const path = require('path');

// JSON verisi
const categoriesData = [
    {
        "id": 1,
        "title": "Nokta dedektor",
        "slug": "nokta-dedektor",
        "products": [
            {
                "id": 1,
                "name": "Nokta Makro Simplex+ WHP",
                "slug": "nokta-makro-simplexplus-whp",
                "description": "Nokta Makro Simplex+ WHP gelişmiş dedektör teknolojisiyle üstün performans sunar.",
                "shortDescription": "Nokta Makro Simplex+ WHP ile hazine avında fark yaratın.",
                "sku": "SKU-42553",
                "price": 47981,
                "originalPrice": 47981,
                "discountPercentage": 0,
                "stock": 61,
                "images": ["/images/nokta-makro-simplexplus-whp.jpg"],
                "categories": ["nokta"],
                "brand": "Nokta",
                "specifications": {
                    "frekans": "40kHz",
                    "ağırlık": "1.6 kg",
                    "batarya": "AA"
                },
                "variants": [],
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
                "id": 2,
                "name": "Nokta Makro The Legend",
                "slug": "nokta-makro-the-legend",
                "description": "Nokta Makro The Legend gelişmiş dedektör teknolojisiyle üstün performans sunar.",
                "shortDescription": "Nokta Makro The Legend ile hazine avında fark yaratın.",
                "sku": "SKU-55230",
                "price": 25403,
                "originalPrice": 30483,
                "discountPercentage": 20,
                "stock": 31,
                "images": ["/images/nokta-makro-the-legend.jpg"],
                "categories": ["nokta"],
                "brand": "Nokta",
                "specifications": {
                    "frekans": "40kHz",
                    "ağırlık": "2.0 kg",
                    "batarya": "AA"
                },
                "variants": [],
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
                "id": 3,
                "name": "Nokta Makro Anfibio Multi",
                "slug": "nokta-makro-anfibio-multi",
                "description": "Nokta Makro Anfibio Multi gelişmiş dedektör teknolojisiyle üstün performans sunar.",
                "shortDescription": "Nokta Makro Anfibio Multi ile hazine avında fark yaratın.",
                "sku": "SKU-70619",
                "price": 46419,
                "originalPrice": 48739,
                "discountPercentage": 5,
                "stock": 61,
                "images": ["/images/nokta-makro-anfibio-multi.jpg"],
                "categories": ["nokta"],
                "brand": "Nokta",
                "specifications": {
                    "frekans": "10kHz",
                    "ağırlık": "2.4 kg",
                    "batarya": "Li-ion"
                },
                "variants": [],
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
    }
];

// Strapi API URL'leri
const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'your-api-token'; // Strapi admin panelinden alınacak

async function createBrand(brandName) {
    try {
        const response = await fetch(`${STRAPI_URL}/api/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({
                data: {
                    name: brandName,
                    slug: brandName.toLowerCase().replace(/\s+/g, '-'),
                    isActive: true
                }
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`Brand created: ${brandName}`);
            return result.data.id;
        } else {
            // Brand zaten varsa, mevcut olanı bul
            const existingResponse = await fetch(`${STRAPI_URL}/api/brands?filters[name][$eq]=${brandName}`, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (existingResponse.ok) {
                const existingResult = await existingResponse.json();
                if (existingResult.data.length > 0) {
                    console.log(`Brand already exists: ${brandName}`);
                    return existingResult.data[0].id;
                }
            }
        }
    } catch (error) {
        console.error(`Error creating brand ${brandName}:`, error);
    }
    return null;
}

async function createTag(tagName) {
    try {
        const response = await fetch(`${STRAPI_URL}/api/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({
                data: {
                    name: tagName,
                    slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                    isActive: true
                }
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`Tag created: ${tagName}`);
            return result.data.id;
        } else {
            // Tag zaten varsa, mevcut olanı bul
            const existingResponse = await fetch(`${STRAPI_URL}/api/tags?filters[name][$eq]=${tagName}`, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (existingResponse.ok) {
                const existingResult = await existingResponse.json();
                if (existingResult.data.length > 0) {
                    console.log(`Tag already exists: ${tagName}`);
                    return existingResult.data[0].id;
                }
            }
        }
    } catch (error) {
        console.error(`Error creating tag ${tagName}:`, error);
    }
    return null;
}

async function createCategory(categoryData) {
    try {
        const response = await fetch(`${STRAPI_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({
                data: {
                    name: categoryData.slug,
                    title: categoryData.title,
                    slug: categoryData.slug,
                    isActive: true,
                    publishedAt: new Date().toISOString()
                }
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`Category created: ${categoryData.title}`);
            return result.data.id;
        } else {
            // Category zaten varsa, mevcut olanı bul
            const existingResponse = await fetch(`${STRAPI_URL}/api/categories?filters[slug][$eq]=${categoryData.slug}`, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (existingResponse.ok) {
                const existingResult = await existingResponse.json();
                if (existingResult.data.length > 0) {
                    console.log(`Category already exists: ${categoryData.title}`);
                    return existingResult.data[0].id;
                }
            }
        }
    } catch (error) {
        console.error(`Error creating category ${categoryData.title}:`, error);
    }
    return null;
}

async function createProduct(productData, categoryId, brandId, tagIds) {
    try {
        const response = await fetch(`${STRAPI_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({
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
                    categories: [categoryId],
                    tags: tagIds,
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
                    publishedAt: new Date().toISOString()
                }
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`Product created: ${productData.name}`);
            return result.data.id;
        } else {
            const errorText = await response.text();
            console.error(`Error creating product ${productData.name}:`, errorText);
        }
    } catch (error) {
        console.error(`Error creating product ${productData.name}:`, error);
    }
    return null;
}

async function importData() {
    console.log('Starting data import...');

    for (const categoryData of categoriesData) {
        console.log(`\nProcessing category: ${categoryData.title}`);

        // Kategori oluştur
        const categoryId = await createCategory(categoryData);
        if (!categoryId) {
            console.error(`Failed to create category: ${categoryData.title}`);
            continue;
        }

        // Ürünleri işle
        for (const productData of categoryData.products) {
            console.log(`Processing product: ${productData.name}`);

            // Brand oluştur
            const brandId = await createBrand(productData.brand);
            if (!brandId) {
                console.error(`Failed to create brand: ${productData.brand}`);
                continue;
            }

            // Tag'leri oluştur
            const tagIds = [];
            for (const tagName of productData.tags) {
                const tagId = await createTag(tagName);
                if (tagId) {
                    tagIds.push(tagId);
                }
            }

            // Ürün oluştur
            await createProduct(productData, categoryId, brandId, tagIds);

            // API rate limiting için kısa bekleme
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log('\nData import completed!');
}

// Script'i çalıştır
if (require.main === module) {
    importData().catch(console.error);
}

module.exports = { importData };