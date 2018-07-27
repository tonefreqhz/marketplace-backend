/*
* @author 4Dcoder
* @co author Odewale Ifeoluwa
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";
import Customer from "../customer/model";
import Order from "../order/model";

const ArbitrationSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  amount: { type: Number, required: [true, "Why no Amount?"] },
  customerComplaint: { type: String, required: [true, "Why no Customer complaint?"] },
  vendorComplaint: { type: String, required: [true, "Why no Vendor complaint?"] },
  arbitrationStatus: { type: String, required: [true, "Why no Arbitration status?"] },
  arbiter: { type: String },
  verdict: { type: String },
  standing: {
    type: String,
    enum: ["pending", "resolved", "trashed"],
    default: "pending",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

ArbitrationSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      order: this.order,
      vendor: this.vendor,
      customer: this.customer,
      amount: this.amount,
      customerComplaint: this.customerComplaint,
      vendorComplaint: this.vendorComplaint,
      arbitrationStatus: this.arbitrationStatus,
      arbiter: this.arbiter,
      verdict: this.verdict,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };

    return full ? {
      ...view,
      standing: this.standing,
      updated: this.updated,
    } : view;
  },
};

const Arbitration = mongoose.model("Arbitration", ArbitrationSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Arbitration;
