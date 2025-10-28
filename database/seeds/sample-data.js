// Sample data for Strapi e-commerce

const sampleCategories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    icon: '🔌',
    isActive: true,
    sortOrder: 1,
    seoTitle: 'Electronics - Best Electronic Devices',
    seoDescription: 'Shop the latest electronic devices and gadgets at great prices'
  },
  {
    name: 'Clothing & Apparel',
    slug: 'clothing',
    description: 'Fashion and clothing items',
    icon: '👕',
    isActive: true,
    sortOrder: 2,
    seoTitle: 'Clothing & Fashion - Latest Trends',
    seoDescription: 'Discover the latest fashion trends and clothing styles'
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home improvement and garden supplies',
    icon: '🏠',
    isActive: true,
    sortOrder: 3,
    seoTitle: 'Home & Garden - Improve Your Living Space',
    seoDescription: 'Find everything you need for your home and garden'
  },
  {
    name: 'Health & Beauty',
    slug: 'health-beauty',
    description: 'Health and beauty products',
    icon: '💄',
    isActive: true,
    sortOrder: 4,
    seoTitle: 'Health & Beauty - Look and Feel Great',
    seoDescription: 'Premium health and beauty products for your wellness'
  }
];

const sampleBrands = [
  {
    name: 'Apple',
    slug: 'apple',
    description: 'Technology company known for innovative products',
    website: 'https://apple.com',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Samsung',
    slug: 'samsung',
    description: 'Global technology leader',
    website: 'https://samsung.com',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Sony',
    slug: 'sony',
    description: 'Entertainment and technology company',
    website: 'https://sony.com',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Canon',
    slug: 'canon',
    description: 'Imaging and optical products',
    website: 'https://canon.com',
    isActive: true,
    sortOrder: 4
  }
];

const sampleProducts = [
  {
    name: 'Amcreet Security Camera',
    slug: 'amcreet-security-camera',
    description: 'High-quality security camera with night vision and motion detection',
    shortDescription: 'Professional security camera for home and office',
    sku: 'ASC-001',
    price: 45.90,
    stock: 25,
    isActive: true,
    isFeatured: true,
    isNew: false,
    isOnSale: false,
    rating: 4.5,
    reviewCount: 3,
    weight: 0.5,
    seoTitle: 'Amcreet Security Camera - Professional Home Security',
    seoDescription: 'High-quality security camera with advanced features for home protection'
  },
  {
    name: 'Canon MX492 Wireless All-IN-One Small Printer',
    slug: 'canon-mx492-printer',
    description: 'Compact wireless printer with scanning and copying capabilities',
    shortDescription: 'All-in-one wireless printer for home and office',
    sku: 'CMX-492',
    price: 250.00,
    originalPrice: 300.00,
    discountPercentage: 17,
    stock: 15,
    isActive: true,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    rating: 4.5,
    reviewCount: 3,
    weight: 8.2,
    seoTitle: 'Canon MX492 Wireless Printer - All-in-One Solution',
    seoDescription: 'Compact wireless printer with scanning and copying features'
  },
  {
    name: 'Samsung 55-inch 4K Ultra HD Smart LED TV',
    slug: 'samsung-55-4k-tv',
    description: 'Premium 4K Ultra HD Smart TV with HDR and streaming capabilities',
    shortDescription: '55-inch 4K Smart TV with premium features',
    sku: 'SAM-55-4K',
    price: 350.00,
    originalPrice: 400.00,
    discountPercentage: 13,
    stock: 8,
    isActive: true,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    rating: 4.0,
    reviewCount: 2,
    weight: 15.5,
    seoTitle: 'Samsung 55" 4K Ultra HD Smart TV - Premium Entertainment',
    seoDescription: 'Experience stunning 4K visuals with this Samsung Smart TV'
  },
  {
    name: 'Sony HD 1080p, 13.5MP White Version',
    slug: 'sony-hd-camera-white',
    description: 'High-definition camera with 13.5MP resolution and advanced features',
    shortDescription: 'Professional HD camera in elegant white design',
    sku: 'SONY-HD-135',
    price: 386.90,
    stock: 12,
    isActive: true,
    isFeatured: false,
    isNew: true,
    isOnSale: false,
    rating: 4.0,
    reviewCount: 2,
    weight: 0.8,
    seoTitle: 'Sony HD Camera 13.5MP - Professional Photography',
    seoDescription: 'Capture stunning photos with this Sony HD camera'
  },
  {
    name: 'Socker Plant Pot with Holder',
    slug: 'socker-plant-pot-holder',
    description: 'You can hang the flower box and plant pot from a balcony rail and create a decorative garden, even in a small space.',
    shortDescription: 'Hanging plant pot perfect for balconies and small spaces',
    sku: 'SPP',
    price: 20.88,
    originalPrice: 24.99,
    discountPercentage: 16,
    stock: 50,
    isActive: true,
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    rating: 4.2,
    reviewCount: 8,
    weight: 0.5,
    seoTitle: 'Socker Plant Pot with Holder - Perfect for Small Spaces',
    seoDescription: 'Transform your balcony into a garden with this hanging plant pot system'
  }
];

const sampleBlogPosts = [
  {
    title: 'Aliquam tincidunt mauris eurisus Sed pretium, ligula sollicitudin',
    slug: 'aliquam-tincidunt-mauris',
    excerpt: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti.Sed egstas, ant at vulputate volutpat, uctus metus...',
    content: 'Full blog post content here...',
    isPublished: true,
    isFeatured: true,
    readTime: 5,
    views: 120,
    tags: ['Fashion', 'Lifestyle'],
    seoTitle: 'Latest Fashion Trends and Lifestyle Tips',
    seoDescription: 'Discover the latest fashion trends and lifestyle advice'
  },
  {
    title: 'Cras ornare tristique elit Morbi purus libero, faucibus',
    slug: 'cras-ornare-tristique-elit',
    excerpt: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti.Sed egstas, ant at vulputate volutpat, uctus metus...',
    content: 'Full blog post content here...',
    isPublished: true,
    isFeatured: false,
    readTime: 7,
    views: 85,
    tags: ['Fashion', 'Lifestyle'],
    seoTitle: 'Fashion and Lifestyle Guide',
    seoDescription: 'Your complete guide to fashion and lifestyle'
  }
];

const sampleBanners = [
  {
    title: 'Weekend Promotions',
    subtitle: 'HAPPY SUMMER',
    description: 'COMBO SUPER COOL',
    buttonText: 'Shop Now',
    buttonLink: '/category/electronics',
    backgroundColor: '#f3f4f6',
    textColor: '#1f2937',
    position: 'homepage-main',
    isActive: true,
    sortOrder: 1,
    discount: 'UP TO 40% OFF',
    brand: 'Electrolux'
  },
  {
    title: 'Special Deals',
    subtitle: 'WINTER COLLECTION',
    description: 'AMAZING DISCOUNTS',
    buttonText: 'Discover',
    buttonLink: '/category/clothing',
    backgroundColor: '#dbeafe',
    textColor: '#1e40af',
    position: 'homepage-secondary',
    isActive: true,
    sortOrder: 2,
    discount: 'UP TO 50% OFF',
    brand: 'Samsung'
  }
];

module.exports = {
  sampleCategories,
  sampleBrands,
  sampleProducts,
  sampleBlogPosts,
  sampleBanners
};