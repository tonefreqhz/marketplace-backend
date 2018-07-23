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
    required: [true, "Why no MetaMask address?"],
    default: "",
  },
  business_name: {
    type: String,
    unique: true,
    required: [false, "What is your unique Shop name?"],
    default: "",
  },
  domain_name: {
    type: String,
    unique: true,
    required: [false, "What is your unique Domain?"],
    default: "",
  },  
  currency_id: { type: String, default: "" },
  language: { type: String, default: "" },
  fullname: { type: String, default: "" },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    default: "",
  },
  password: { type: String, default: "" },
  tagline: { type: String, default: "" },
  address: { type: String, default: "" },
  details: { type: [], default: [] },
  facebook: { type: String, default: "" },
  skype: { type: String, default: "" },
  google_plus: { type: String, default: "" },
  twitter: { type: String, default: "" },
  youtube: { type: String, default: "" },
  pinterest: { type: String, default: "" },
  phone: { type: String, default: "" },
  tag: { type: String, default: "" },
  description: { type: String, default: "" },
  lat_lang: { type: String, default: "" },
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  zip: { type: String, default: "" },
  state: { type: String, default: "" },
  theme: { type: String, default: "" },
  logo: { type: String, default: "default-vendor-logo.png" },
  banner: { type: String, default: "default-vendor-banner.png" },
  home_page_style: { type: String, default: "" },
  product_page_style: { type: String, default: "" },
  product_detail_page_style: { type: String, default: "" },
  profile_page_style: { type: String, default: "" },
  blog_page_style: { type: String, default: "" },
  mail_page_style: { type: String, default: "" },
  invoice_page_style: { type: String, default: "" },
  ticket_page_style: { type: String, default: "" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  view_count: { type: Number, default: 1 },
  last_access: {
    type: Array,
    default: [{ accessDate: "", ipAddress: "" }],
  },
  account: {
    type: Array,
    default: { complete_profile: false, email_verified: false, domain_name_set: false, business_verified: false },
    required: [false, "Why no status?"],
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

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
