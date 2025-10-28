'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  // Custom controller methods can be added here
  
  async findByCategory(ctx) {
    const { categorySlug } = ctx.params;
    
    try {
      const category = await strapi.entityService.findMany('api::category.category', {
        filters: { slug: categorySlug },
        populate: ['products']
      });
      
      if (!category || category.length === 0) {
        return ctx.notFound('Category not found');
      }
      
      const products = await strapi.entityService.findMany('api::product.product', {
        filters: {
          categories: {
            slug: categorySlug
          }
        },
        populate: ['images', 'categories', 'brand', 'tags']
      });
      
      return products;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  
  async findFeatured(ctx) {
    try {
      const products = await strapi.entityService.findMany('api::product.product', {
        filters: { isFeatured: true, isActive: true },
        populate: ['images', 'categories', 'brand'],
        sort: { createdAt: 'desc' },
        pagination: {
          limit: ctx.query.limit || 10
        }
      });
      
      return products;
    } catch (error) {
      ctx.throw(500, error);
    }
  }
}));