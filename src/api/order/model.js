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
  vendor_id: { type: String, required: [true, "Why no vendor id?"] },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  payment: { type: String, required: [true, "Why no Payment details?"] },
  shipment: { type: String, required: [true, "Why no Shipment details?"] },
  delivery: { type: String, required: [true, "Why no Delivery details?"] },
  tracking_num: { type: String, required: [true, "Why no Tracking Number?"] },
  vat: { type: Number, required: [true, "Why no Value added tax?"] },
  amount: { type: Number, required: [true, "Why no amount payable?"] },
  coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },
  order_status: {
    type: String,
    num: ["paid", "shipped", "delivered"],
    required: [true, "Why no Order status?"] },
  fullame: { type: String },
  zip: { type: String },
  address: { type: String },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { type: String },
  email: { type: String },
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
