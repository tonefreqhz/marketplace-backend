/**
 * @author 4Dcoder
 * @description cart is an instance of whislist
 */

import mongoose, { Schema } from "mongoose";
import Currency from "../currency/model";
import LanguageList from "../languageList/model";
import { randomNonce } from "./../../services/helpers";

const CustomerSchema = new Schema({
  nonce: { type: Number, default: randomNonce(), required: [true, "Why no authentication nonce?"] },
  publicAddress: { type: String, unique: true, max: 42, required: [true, "Why no MetaMask address?"] },
  wallet: { type: String, default: "" },
  cart: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, required: true },
  }],
  wishlist: [{
    names: { type: String, trim: true, max: 100, min: [2, "Too short name"] },
    carts: [{
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, required: true },
    }],
  }],
  fullname: { type: String, default: "" },
  username: { type: String },
  gender: { type: String, enum: ["m", "f"] },
  phone: { type: String, default: "" },
  password: { type: String, default: "" },
  email: { type: String },
  recoveryCode: { type: String, trim: true, default: "" },
  profile: { type: String, default: "recommendation system" },
  preferences: {
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
    language: { type: Schema.Types.ObjectId, ref: "LanguageList" },
  },
  shipping: {
    country: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    building: { type: String, default: "" },
    zip: { type: Number, default: "" },
  },
  notifications: [{
    date: { type: Date, default: Date.now },
    notice: { type: String, max: 2000 },
    standing: { type: String, enum: ["unread", "read", "trashed"], default: "unread" },
  }],
  lastAccess: [{
    accessDate: { type: Date },
    ipAddress: { type: String, min: 15, max: 45 },
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
export const { ObjectId } = mongoose.Types.ObjectId;
export default Customer;
