/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "./../product/model";
import { randomNonce } from "./../../services/helpers";

const VendorSchema = new Schema({
  nonce: {
    type: Number,
    default: randomNonce(),
    required: [true, "Why no authentication nonce?"],
  },
  publicAddress: {
    type: String,
    unique: true,
    lowercase: true,
    max: 42,
    trim: true,
    required: [true, "Why no MetaMask address?"],
  },
  business_name: {
    type: String,
    unique: true,
    max: 200,
    trim: true,
  },
  domain_name: {
    type: String,
    unique: true,
    lowercase: true,
    max: 100,
    trim: true,
  },  
  currency_id: { type: String, max: 200, default: "" },
  language: { type: String, max: 200, default: "" },
  fullname: { type: String, max: 200, default: "" },
  email: {
    type: String,
    lowercase: true,
    max: 100,
    trim: true,
    unique: true,
    default: "",
  },
  password: { type: String, max: 200, default: "" },
  tagline: { type: String, max: 200, default: "" },
  address: { type: String, max: 200, default: "" },
  details: { type: [], default: [] },
  website: { type: String, max: 200, default: "" },
  facebook: { type: String, max: 200, default: "" },
  skype: { type: String, max: 200, default: "" },
  google_plus: { type: String, max: 200, default: "" },
  twitter: { type: String, max: 200, default: "" },
  youtube: { type: String, max: 200, default: "" },
  pinterest: { type: String, max: 200, default: "" },
  phone: { type: String, max: 200, default: "" },
  tag: { type: String, max: 200, default: "" },
  description: { type: String, max: 200, default: "" },
  lat_lang: { type: String, max: 200, default: "" },
  country: { type: String, max: 200, default: "" },
  city: { type: String, max: 200, default: "" },
  zip: { type: String, max: 200, default: "" },
  state: { type: String, max: 200, default: "" },
  theme: { type: String, max: 200, default: "" },
  logo: { type: String, default: "default-vendor-logo.png" },
  banner: { type: String, default: "default-vendor-banner.png" },
  home_page_style: { type: String, max: 200, default: "" },
  product_page_style: { type: String, max: 200, default: "" },
  product_detail_page_style: { type: String, max: 200, default: "" },
  profile_page_style: { type: String, max: 200, default: "" },
  blog_page_style: { type: String, max: 200, default: "" },
  mail_page_style: { type: String, max: 200, default: "" },
  invoice_page_style: { type: String, max: 200, default: "" },
  ticket_page_style: { type: String, max: 200, default: "" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  view_count: { type: Number, default: 1 },
  last_access: {
    type: Array,
    default: [{ accessDate: "", ipAddress: "" }],
  },
  account: {
    type: Array,
    default: { complete_profile: false, email_verified: false, domain_name_set: false, business_verified: false },
  },
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "unverified",
    required: [false, "Why no status?"],
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

    };

    return full ? {
      ...view,
      // add prpoerties for a full view
    } : view;
  },
};

// Virtual for Vendor's URL
VendorSchema
  .virtual("url")
  .get(function () {
    if (this.domain_name_set) return `/shop/${this.domain_name}`;
    return "/shop/default";
  });

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
