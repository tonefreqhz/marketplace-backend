/**
 * @author 4Dcoder
 * @description cart is an instance of whislist
 */

import mongoose, { Schema } from "mongoose";
import Currency from "../currency/model";
import LanguageList from "../languageList/model";
import { randomNonce } from "./../../services/helpers";

const CustomerSchema = new Schema({
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
  },
  username: { type: String, default: "" },
  wallet: { type: String, default: "" },
  currency: { type: Schema.Types.ObjectId, ref: "Currency" },
  cart: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, required: true },
  }],
  wishlist: [{
    name: { type: String, unique: true, trim: true, max: 100, min: [2, "Too short name"] },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, required: true },
    }],
  }],
  languageList: { type: Schema.Types.ObjectId, ref: "LanguageList" },
  gender: { type: String, enum: ["m", "f"] },
  password: { type: String, default: "" },
  photo: { type: String, default: "" },
  profile: { type: String, default: "" },
  fullname: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  zip: { type: String, default: "" },
  state: { type: String, default: "" },
  country: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, unique: true, default: "" },
  last_access: {
    type: Array,
    default: [{ accessDate: "", ipAddress: "" }],
  },
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "active",
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
