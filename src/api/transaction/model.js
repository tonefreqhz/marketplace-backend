/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Customer from "../customer/model";

const TransactionSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

TransactionSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      customer: this.customer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
    } : view;
  },
};

const Transaction = mongoose.model("Transaction", TransactionSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Transaction;
