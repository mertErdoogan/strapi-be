import type { Schema, Struct } from '@strapi/strapi';

export interface CartCartItem extends Struct.ComponentSchema {
  collectionName: 'components_cart_cart_item';
  info: {
    displayName: 'Cart Item';
  };
  attributes: {
    lineTotal: Schema.Attribute.Decimal & Schema.Attribute.Required;
    productId: Schema.Attribute.Integer & Schema.Attribute.Required;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    sku: Schema.Attribute.String;
    unitPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    variantOptions: Schema.Attribute.JSON;
  };
}

export interface CommonAddress extends Struct.ComponentSchema {
  collectionName: 'components_common_address';
  info: {
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String & Schema.Attribute.Required;
    country: Schema.Attribute.String & Schema.Attribute.Required;
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    line1: Schema.Attribute.String & Schema.Attribute.Required;
    line2: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String;
  };
}

export interface OrderOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_order_order_item';
  info: {
    displayName: 'Order Item';
  };
  attributes: {
    discount: Schema.Attribute.Decimal;
    lineTotal: Schema.Attribute.Decimal & Schema.Attribute.Required;
    productId: Schema.Attribute.Integer & Schema.Attribute.Required;
    qty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    sku: Schema.Attribute.String;
    taxRate: Schema.Attribute.Decimal;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    unitPrice: Schema.Attribute.Decimal & Schema.Attribute.Required;
    variantOptions: Schema.Attribute.JSON;
  };
}

export interface ProductAttribute extends Struct.ComponentSchema {
  collectionName: 'components_product_attribute';
  info: {
    displayName: 'Attribute';
  };
  attributes: {
    key: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variant';
  info: {
    displayName: 'Variant';
  };
  attributes: {
    barcode: Schema.Attribute.String;
    manageStock: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    options: Schema.Attribute.JSON;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    salePrice: Schema.Attribute.Decimal;
    sku: Schema.Attribute.String;
    stockQty: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cart.cart-item': CartCartItem;
      'common.address': CommonAddress;
      'order.order-item': OrderOrderItem;
      'product.attribute': ProductAttribute;
      'product.variant': ProductVariant;
    }
  }
}
