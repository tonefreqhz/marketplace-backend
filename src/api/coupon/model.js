/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";

const CouponSchema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  title: { type: String, required: [true, "Why no title of coupon?"] },
  code: { type: String, required: [true, "Why no code of code?"] },
  amount: { type: Number, required: [true, "Why no dollar amount waiver of coupon?"] },
  specArray: [{
    name: { type: String, max: 100 },
    value: { type: String, max: 500 },
  }],
  till: { type: Date, required: [true, "Why no expiry date of coupon?"] },
  standing: {
    type: String,
    enum: ["active", "expired", "trashed"],
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

CouponSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      vendor: this.vendor,
      title: this.title,
      code: this.code,
      amount: this.amount,
      specArray: this.specArray,
      till: this.till,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      standing: this.standing,
    };

    return full ? {
      ...view,
      updated: this.updated,
    } : view;
  },
};

const Coupon = mongoose.model("Coupon", CouponSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Coupon;
