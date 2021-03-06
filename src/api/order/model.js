/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";
import Customer from "../customer/model";
import Coupon from "../coupon/model";
import Transaction from "../transaction/model";
import { randomNum } from "../../services/helpers";

const OrderSchema = new Schema({
  orderNum: { type: String },
  transaction: { type: Schema.Types.ObjectId, ref: "Transaction", required: [true, "Why no Transaction Id?"] },
  kind: { type: String, enum: ["digital", "physical"], required: [true, "Why no Product type?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: "Product", required: [true, "Why no Product(s)?"] },
    quantity: { type: Number, default: 1, required: [true, "Why no Quantity?"] },
    sku: { type: String },
    name: { type: String, required: true },
    unitCost: { type: Number, required: true },
    vat: { type: Number, required: [true, "Why no Value added tax?"] },
  }],
  paymentDetails: {
    amount: { type: Number, required: [true, "Why no amount payable?"] },
    currency: { type: Schema.Types.ObjectId, ref: "Currency" },
    transaction: { type: String, required: [true, "Why no transaction id?"] },
  },
  shipmentDetails: {
    recipient: { type: String, required: [true, "Why no Shipment details?"] },
    country: { type: String, max: 50 },
    state: { type: String, max: 50 },
    city: { type: String, max: 50 },
    street: { type: String, max: 50 },
    building: { type: String, max: 50 },
    zip: { type: Number, min: 1000, max: 7777777 },
    phone: { type: String },
    email: { type: String },
    deliveryNote: { type: String, default: "Leave it at house", max: 200 },
  },
  trackingDetails: {
    company: { type: String, required: [false, "Why no Tracking Number?"] },
    code: { type: String, required: [false, "Why no Tracking Number?"] },
    standing: { type: String, enum: ["pending", "dispatched", "arrived", "delivered"] },
    estimatedDelivery: { type: Date },
  },

  orderStatus: {
    type: String,
    enum: ["pending", "paid", "delivered", "cancel"],
    default: "pending",
  },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

OrderSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      orderNum: this.orderNum,
      kind: this.kind,
      vendor: this.vendor,
      customer: this.customer,
      coupon: this.coupon,
      products: this.products,
      paymentDetails: this.paymentDetails,
      shipmentDetails: this.shipmentDetails,
      trackingDetails: this.trackingDetails,
      orderStatus: this.orderStatus,
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

const Order = mongoose.model("Order", OrderSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Order;
