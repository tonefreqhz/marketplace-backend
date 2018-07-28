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
    names: { type: String, unique: true, trim: true, max: 100, min: [2, "Too short name"] },
    carts: [{
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
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

CustomerSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      nonce: this.nonce,
      publicAddress: this.publicAddress,
      wallet: this.wallet,
      cart: this.cart,
      wishlist: this.wishlist,
      fullname: this.fullname,
      username: this.username,
      gender: this.gender,
      phone: this.phone,
      password: this.password,
      email: this.email,
      recoveryCode: this.recoveryCode,
      profile: this.profile,
      preferences: this.preferences,
      shipping: this.shipping,
      notifications: this.notifications,
      lastAccess: this.lastAccess,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      updated: this.updated,
      standing: this.standing,
    } : view;
  },
};

const Customer = mongoose.model("Customer", CustomerSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Customer;
