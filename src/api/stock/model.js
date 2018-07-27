/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";

const StockSchema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  orderNum: { type: String, required: [true, "Why no order number?"] },
  kind: { type: String, enum: ["add", "destroy"], required: [true, "Why no kind?"] },
  quantity: { type: Number, required: [true, "Why no quantity?"] },
  available: { type: Number, default: 0 },
  unitCost: { type: Number, required: [true, "Why no unit cost?"] },
  unitPrice: { type: Number, required: [true, "Why no unit price?"] },
  description: { type: String, required: [true, "Why no description?"] },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

StockSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      vendor: this.vendor,
      product: this.product,
      orderNum: this.orderNum,
      kind: this.kind,
      quantity: this.quantity,
      available: this.available,
      unitCost: this.unitCost,
      unitPrice: this.unitPrice,
      description: this.description,
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

const Stock = mongoose.model("Stock", StockSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Stock;
