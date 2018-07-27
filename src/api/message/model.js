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
});

const Message = mongoose.model("Message", MessageSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Message;
