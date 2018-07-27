/**
 * @author 4Dcoder
 * @description Currency is infered from the vendor currency preferences for all vendor products
 * Products with the same parent names are siblings or varaity options
 */

import mongoose, { Schema } from "mongoose";
import Category from "../category/model";
import Vendor from "../vendor/model";
import Brand from "../brand/model";

const ProductSchema = new Schema({
  code: { type: String, unique: true, required: [false, "Why no Code?"], max: 50 },
  sku: { type: String, required: [false, "Why no Sku?"], max: 50 },
  upc: { type: String, required: [false, "Why no Upc?"], max: 50 },
  name: { type: String, required: [true, "Why no Product name?"], max: 200 },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  category: {
    main: { type: Schema.Types.ObjectId, ref: "Category" },
    sub: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  description: {
    color: { type: Array, default: [] },
    unit: { type: String, default: "" },
    long: { type: String, required: [true, "Why no Description?"], max: 5000 },
    short: { type: String, required: [true, "Why no Short description?"], max: 500 },
    tag: { type: Array, default: [] },
  },
  variety: {
    options: { type: Boolean, required: [false, "Why no Deal?"], default: false },
    parent: { type: String, default: "" },
  },
  price: {
    deal: { type: Boolean, required: [false, "Why no Deal?"], default: false },
    valuation: { type: String, enum: ["FIFO", "LIFO", "AVCO"], default: "LIFO", required: [true, "Why no valuation?"] },
    unit_price: { type: Number, required: [true, "Why no Unit price?"] },
    cost_price: { type: Number, required: [false, "Why no cost price?"] },
    slash_price: { type: Number },
    discount: { type: Number, required: [false, "Why no Discount?"], default: 0.0 },
    discount_type: { type: String, enum: ["fixed", "percent"], default: "percent" },
    tax: { type: Number, required: [false, "Why no Tax?"], default: 0.0 },
    tax_type: { type: String, enum: ["fixed", "percent"], default: "percent" },
  },
  images: {
    image_sm: { type: String, default: "default-product-sm-image.jpg" },
    image_md: { type: String, default: "default-product-md-image.jpg" },
    image_lg: { type: String, default: "default-product-lg-image.jpg" },
    image_front: { type: String, default: "default-product-front-image.jpg" },
    image_back: { type: String, default: "default-product-back-image.jpg" },
    image_top: { type: String, default: "default-product-top-image.jpg" },
    image_bottom: { type: String, default: "default-product-bottom-image.jpg" },
    image_right: { type: String, default: "default-product-right-image.jpg" },
    image_left: { type: String, default: "default-product-left-image.jpg" },
    icon: { type: String, default: "default-product-icon.jpg" },
  },
  shipping_details: {
    cost: { type: Number, default: 0.0 },
    weight: { type: String, max: 20 },
    length: { type: String, max: 20 },
    width: { type: String, max: 20 },
    height: { type: String, max: 20 },
  },
  manufacture_details: {
    make: { type: String, max: 100 },
    model_number: { type: String, max: 100 },
    release_date: { type: Date },
  },
  download: {
    downloadable: { type: Boolean, required: [false, "Why no Download?"], default: false },
    download_name: { type: String, default: "Bezop-Product-Download" },
  },
  extra_fields: [{
    name: { type: String, max: 20 },
    value: { type: String, max: 100 },
  }],
  analytics: {
    featured: { type: Boolean, default: false },
    view_date: { type: Date, default: Date.now },
    view_count: { type: Number, default: 1 },
  },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [false, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform :(obj, ret) => { delete ret._id; },
  }
});


ProductSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      code: this.code,
      sku: this.sku,
      upc: this.upc,
      name: this.name,
      vendor: this.vendor,
      category: this.category,
      brand: this.brand,
      description: this.description,
      variety: this.variety,
      price: this.price,
      images: this.images,
      shipping_details: this.shipping_details,
      manufacture_details: this.manufacture_details,
      download: this.download,
      extra_fields: this.extra_fields,
      analytics: this.analytics,
    };

    return full ? {
      ...view,
      standing: this.standing,
      updated: this.updated,
    } : view;
  }
};

const Product = mongoose.model("Product", ProductSchema);
export default Product;
