/**
 * @author 4Dcoder
 * @description Currency is infered from the vendor currency preferences for all vendor products
 * Products with the same parent names are siblings or varaity options
 */

import mongoose, { Schema } from "mongoose";
import Category from "../category/model";
import Vendor from "../vendor/model";
import Brand from "../brand/model";
import { randomNonce } from "./../../services/helpers";

const ProductSchema = new Schema({
  code: { type: String, unique: true, required: [true, "Why no Code?"], default: randomNonce() },
  sku: { type: String, required: [false, "Why no Sku?"], max: 50 },
  upc: { type: String, required: [false, "Why no Upc?"], max: 50 },
  name: { type: String, required: [true, "Why no Product name?"], max: 200 },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: [true, "Why no vendor?"] },
  category: {
    main: { type: Schema.Types.ObjectId, ref: "Category", required: [true, "Why no category?"] },
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
    options: { type: Boolean, default: false },
    parent: { type: String, default: "" },
  },
  price: {
    deal: { type: Boolean, required: [false, "Why no Deal?"], default: false },
    valuation: { type: String, enum: ["FIFO", "LIFO", "AVCO"], default: "LIFO", required: [true, "Why no valuation?"] },
    unitPrice: { type: Number, required: [true, "Why no Unit price?"] },
    costPrice: { type: Number, required: [false, "Why no cost price?"] },
    slashPrice: { type: Number },
    discount: { type: Number, required: [false, "Why no Discount?"], default: 0.0 },
    discountType: { type: String, enum: ["fixed", "percent"], default: "percent" },
    tax: { type: Number, required: [false, "Why no Tax?"], default: 0.0 },
    taxType: { type: String, enum: ["fixed", "percent"], default: "percent" },
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
  shippingDetails: {
    cost: { type: Number, default: 0.0 },
    weight: { type: String, max: 20 },
    length: { type: String, max: 20 },
    width: { type: String, max: 20 },
    height: { type: String, max: 20 },
  },
  manufactureDetails: {
    make: { type: String, max: 100 },
    modelNumber: { type: String, max: 100 },
    releaseDate: { type: Date },
  },
  download: {
    downloadable: { type: Boolean, required: [false, "Why no Download?"], default: false },
    downloadName: { type: String, default: "Bezop-Product-Download" },
  },
  extraFields: [{
    name: { type: String, max: 200 },
    value: { type: String, max: 500 },
  }],
  analytics: {
    feature: { type: Boolean, default: false },
    viewDate: { type: Date, default: Date.now },
    viewCount: { type: Number, default: 1 },
  },
  standing: {
    type: String,
    enum: ["active", "pending", "remove", "restore", "trash"],
    default: "pending",
  },
  updated: { type: Date, default: Date.now },
  action: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
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
      shippingDetails: this.shippingDetails,
      manufactureDetails: this.manufactureDetails,
      download: this.download,
      extraFields: this.extraFields,
      analytics: this.analytics,
    };

    return full ? {
      ...view,
      standing: this.standing,
      updated: this.updated,
    } : view;
  },
};

const Product = mongoose.model("Product", ProductSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Product;
