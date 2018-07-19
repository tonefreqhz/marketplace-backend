/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import Product from "../vendor/model";
import { randomNonce } from "./../../services/helpers";

const { Schema } = mongoose.Schema;

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
    required: [true, "What is your unique Shop name?"],
    default: "",
  },
  currency_id: { type: String, required: [true, "Why no Company?"], default: "" },
  language: { type: String, default: "" },
  fullname: { type: String, default: "" },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Why no email?"],
    default: "",
  },
  password: { type: String, required: [true, "Why no Password?"] },
  tagline: { type: String, default: "" },
  address: { type: String, required: [true, "Why no Address?"] },
  details: { type: [], default: [] },
  facebook: { type: String, default: "" },
  skype: { type: String, default: "" },
  google_plus: { type: String, default: "" },
  twitter: { type: String, default: "" },
  youtube: { type: String, default: "" },
  pinterest: { type: String, default: "" },
  phone: { type: String, required: [true, "Why no Phone?"], default: "" },
  tag: { type: String, required: [true, "Why no Tag?"], default: "" },
  description: { type: String, required: [true, "Why no Description?"], default: "" },
  lat_lang: { type: String, required: [true, "Why no Lat_lang?"], default: "" },
  country: { type: String, required: [true, "Why no Country?"], default: "" },
  city: { type: String, required: [true, "Why no City?"], default: "" },
  zip: { type: String, required: [true, "Why no Zip?"], default: "" },
  state: { type: String, required: [true, "Why no State?"], default: "" },
  theme: { type: String, default: "" },
  logo: { type: String, default: "default-vendor-logo.png" },
  banner: { type: String, default: "default-vendor-banner.png" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  home_page_style: { type: String, default: "" },
  product_page_style: { type: String, default: "" },
  product_detail_page_style: { type: String, default: "" },
  profile_page_style: { type: String, default: "" },
  blog_page_style: { type: String, default: "" },
  mail_page_style: { type: String, default: "" },
  invoice_page_style: { type: String, default: "" },
  ticket_page_style: { type: String, default: "" },
  view_count: { type: Number, default: 1 },
  last_access: {
    type: Array,
    default: [{ accessDate: "", ipAddress: "" }],
  },
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "unverified",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
