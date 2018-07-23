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
    max: 42,
    trim: true,
    required: [true, "Why no MetaMask address?"],
  },
  wallet: { type: String, default: "" },
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
  fullname: { type: String, default: "" },
  username: { type: String, unique: true },
  gender: { type: String, enum: ["m", "f"] },
  phone: { type: String, default: "" },
  password: { type: String, default: "" },
  email: { type: String, unique: true, default: "" },
  recoveryCode: {
    type: String,
    trim: true,
    default: "",
  },
  preferences: {
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
    language: { type: Schema.Types.ObjectId, ref: "LanguageList" },
    notifications: {
      daily: { type: Boolean, default: false },
      weekly: { type: Boolean, default: true },
      follows: { type: Boolean, default: false },
    },
  },
  shipping: {
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    Building: { type: String, default: "" },
    zip: { type: Number, default: "" },
  },
  last_access: [{
    accessDate: { type: Date },
    ipAddress: { type: String },
  }],
  standing: {
    type: String,
    enum: ["active", "unverified", "suspended", "trashed"],
    default: "unverified",
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
