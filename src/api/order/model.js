/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";
import Customer from "../customer/model";
import Coupon from "../coupon/model";

const OrderSchema = new Schema({
  order_num: { type: String, required: [true, "Why no Order Number?"] },
  kind: { type: String, enum: ["digital", "physical"], required: [true, "Why no Product type?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1, required: true },
    sku: { type: String },
    name: { type: String, required: true },
    unit_cost: { type: Number, required: true },
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
    vat: { type: Number, required: [true, "Why no Value added tax?"] },
  }],
  payment_details: {
    amount: { type: Number, required: [true, "Why no amount payable?"] },
    method: { type: String, enum: ["paypal", "metamask"], required: [true, "Why no Payment method?"] },
    transaction_id: { type: String, required: [true, "Why no transaction id?"] },
  },
  shipment_details: {
    recipient: { type: String, required: [true, "Why no Shipment details?"] },
    country: { type: String, max: 50 },
    state: { type: String, max: 50 },
    city: { type: String, max: 50 },
    street: { type: String, max: 50 },
    Building: { type: String, max: 50 },
    zip: { type: Number, min: 5, max: 5 },
    phone: { type: String },
    email: { type: String },
    delivery_note: { type: String, default: "Leave it at house", max: 200 },
  },
  tracking_details: {
    company: { type: String, required: [true, "Why no Tracking Number?"] },
    code: { type: String, required: [true, "Why no Tracking Number?"] },
    standing: { type: String, enum: ["pending", "dispatched", "arrived", "delivered"] },
    estimated_delivery: { type: Date },
  },

  order_status: {
    type: String,
    num: ["paid", "delivered", "closed"],
    required: [true, "Why no Order status?"],
  },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
