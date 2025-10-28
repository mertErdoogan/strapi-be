import type { Schema, Struct } from '@strapi/strapi';

export interface ProductDimensions extends Struct.ComponentSchema {
  collectionName: 'components_product_dimensions';
  info: {
    description: 'Product dimensions';
    displayName: 'Dimensions';
  };
  attributes: {
    height: Schema.Attribute.Decimal;
    length: Schema.Attribute.Decimal;
    unit: Schema.Attribute.Enumeration<['cm', 'm', 'mm', 'inch', 'ft']> &
      Schema.Attribute.DefaultTo<'cm'>;
    width: Schema.Attribute.Decimal;
  };
}

export interface ProductSpecification extends Struct.ComponentSchema {
  collectionName: 'components_product_specifications';
  info: {
    description: 'Product specifications';
    displayName: 'Specification';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    description: 'Product variants (color, size, etc.)';
    displayName: 'Variant';
  };
  attributes: {
    colorCode: Schema.Attribute.String;
    isAvailable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    priceModifier: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    stockModifier: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    type: Schema.Attribute.Enumeration<['color', 'size', 'material', 'style']> &
      Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.dimensions': ProductDimensions;
      'product.specification': ProductSpecification;
      'product.variant': ProductVariant;
    }
  }
}
