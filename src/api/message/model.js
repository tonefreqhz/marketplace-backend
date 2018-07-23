/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  kind: {
    type: String,
    enum: ["arbitration", "chat", "contact", "ticket"],
    required: [true, "Why no communication type?"],
  },
  message_session: { type: String },
  message_between: {
    type: String,
    enum: ["visitor_vendor", "customer_vendor", "customer_admin", "vendor_admin"],
    required: [true, "Why no communication party?"],
  },
  visitor_name: { type: String },
  visitor_email: { type: String },
  subject: { type: String },
  message: { type: String },
  customer: { type: String },
  vendor: { type: String },
  sent_by: {
    type: String,
    enum: ["visitor", "customer", "vendor", "admin"],
    required: [true, "Why no sender?"],
  },
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
export default Message;
