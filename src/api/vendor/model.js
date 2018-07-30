/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "./../product/model";
import Currency from "./../currency/model";
import LanguageList from "./../languageList/model";
import Template from "./../template/model";
import { randomNonce } from "./../../services/helpers";

const VendorSchema = new Schema({
  nonce: { type: Number, default: randomNonce(), required: [true, "Why no authentication nonce?"] },
  publicAddress: { type: String, unique: true, max: 42, required: [true, "Why no MetaMask address?"] },
  businessName: { type: String, max: 200, trim: true },
  domainName: { type: String, unique: true, lowercase: true, max: 100, trim: true },
  email: { type: String, lowercase: true, max: 100, trim: true, unique: true },
  password: { type: String, lowercase: true, trim: true },
  recoveryCode: { type: String, max: 200, default: "" },
  fullname: { type: String, max: 200, default: "" },
  phone: { type: String, max: 200, default: "" },
  profile: {
    website: { type: String, max: 200, default: "" },
    facebook: { type: String, max: 200, default: "" },
    linkedin: { type: String, max: 200, default: "" },
    instagram: { type: String, max: 200, default: "" },
    skype: { type: String, max: 200, default: "" },
    googlePlus: { type: String, max: 200, default: "" },
    twitter: { type: String, max: 200, default: "" },
    youtube: { type: String, max: 200, default: "" },
    pinterest: { type: String, max: 200, default: "" },
  },

  address: {
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    building: { type: String, default: "" },
    zip: { type: Number, default: "" },
  },
  preferences: {
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
    language: { type: Schema.Types.ObjectId, ref: "LanguageList" },
    frontend: {
      logo: { type: String, default: "default-vendor-logo.png" },
      banner: { type: String, default: "default-vendor-banner.png" },
      slogan: { type: String, max: 200, default: "" },
      description: { type: String, max: 200, default: "" },
      tag: { type: String, max: 200, default: "" },
      theme: { type: String, max: 200, default: "" },
    },
    template: {
      home: { type: Schema.Types.ObjectId, ref: "Template" },
      product: { type: Schema.Types.ObjectId, ref: "Template" },
      productDetail: { type: Schema.Types.ObjectId, ref: "Template" },
      profile: { type: Schema.Types.ObjectId, ref: "Template" },
      blog: { type: Schema.Types.ObjectId, ref: "Template" },
      mail: { type: Schema.Types.ObjectId, ref: "Template" },
      invoice: { type: Schema.Types.ObjectId, ref: "Template" },
      ticket: { type: Schema.Types.ObjectId, ref: "Template" },
    },
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  viewCount: { type: Number, default: 1 },
  lastAccess: [{
    accessDate: { type: Date },
    ipAddress: { type: String, min: 15, max: 45 },
  }],
  account: {
    completeProfile: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    domainNameSet: { type: Boolean, default: false },
    businessVerified: { type: Boolean, default: false },
  },
  notifications: [{
    date: { type: Date, default: Date.now },
    notice: { type: String, max: 2000 },
    standing: { type: String, enum: ["unread", "read", "trashed"], default: "unread" },
  }],
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "unverified",
  },
  updated: { type: Date, default: Date.now },
  approvedBy: { type: String },
  approvedAt: { type: Date },

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

VendorSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      // add prpoerties for a full view
      nonce: this.nonce,
      publicAddress: this.publicAddress,
      businessName: this.businessName,
      domainName: this.domainName,
      password: this.password,
      recoveryCode: this.recoveryCode,
      phone: this.phone,
      profile: this.profile,
      address: this.address,
      preferences: this.preferences,
      products: this.products,
      viewCount: this.viewCount,
      lastAccess: this.lastAccess,
      account: this.account,
      notifications: this.notifications,
      standing: this.standing,
      updated: this.updated,
      approvedBy: this.approvedBy,
      approvedAt: this.approvedAt,
    } : view;
  },
};

// Virtual for Vendor's URL
VendorSchema
  .virtual("url")
  .get(function () {
    if (this.domain_name_set) return `https://${this.domain_name}.bezop.com`;
    return "https://default-shop.bezop.com";
  });

const Vendor = mongoose.model("Vendor", VendorSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Vendor;
