module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/products/category/:categorySlug',
      handler: 'product.findByCategory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/products/featured',
      handler: 'product.findFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};