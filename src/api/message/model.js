/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Admin from "../admin/model";
import Vendor from "../vendor/model";
import Customer from "../customer/model";

const MessageSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  visitorName: { type: String },
  visitorEmail: { type: String },
  sentBy: {
    type: String,
    enum: ["visitor", "customer", "vendor", "admin"],
    required: [true, "Why no sender?"],
  },
  kind: {
    type: String,
    enum: ["arbitration", "chat", "contact", "ticket"],
    required: [true, "Why no communication type?"],
  },
  messageSession: { type: String },
  messageBetween: {
    type: String,
    enum: ["visitor_vendor", "customer_vendor", "customer_admin", "vendor_admin"],
    required: [true, "Why no communication party?"],
  },
  subject: { type: String },
  message: { type: String },
  standing: {
    type: String,
    enum: ["read", "unread", "trashed"],
    default: "unread",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    toJSON: (obj, ret) => { delete ret._id; },
  },
});

MessageSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      kind: this.kind,
      messageSession: this.messageSession,
      messageBetween: this.messageBetween,
      visitorName: this.visitorName,
      visitorEmail: this.visitorEmail,
      subject: this.subject,
      message: this.message,
      customer: this.customer,
      vendor: this.vendor,
      sentBy: this.sentBy,
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

const Message = mongoose.model("Message", MessageSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Message;
