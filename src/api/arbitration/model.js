/*
* @author 4Dcoder
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
});

const Arbitration = mongoose.model("Arbitration", ArbitrationSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Arbitration;
