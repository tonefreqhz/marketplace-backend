/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const MailSchema = new Schema({
  name: { type: String, required: [true, "Why no name?"] },
  kind: { type: String, enum: ["notification", "newsletter", "advert"], required: [true, "Why no mail type?"] },
  language: { type: String, required: [true, "Why no mail language?"] },
  mail_subject: { type: String, required: [true, "Why no mail subject?"] },
  mail_body: { type: String, required: [true, "Why no mail body?"] },
  recipient: { type: String, enum: ["vendor", "customer", "subscriber"], required: [true, "Why no recipient type?"] },
  created_type: { type: String, enum: ["vendor", "admin"], required: [true, "Why no created type?"] },
  created_by: { type: String, required: [true, "Why no created by?"] },
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

const Mail = mongoose.model("Mail", MailSchema);
export default Mail;
