/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Admin from "../vendor/model";

const MailSchema = new Schema({
  createdType: { type: String, enum: ["vendor", "admin"], required: [true, "Why no created type?"] },
  createdBy: { type: String, required: [true, "Why no created by?"] },
  name: { type: String, required: [true, "Why no name?"] },
  kind: { type: String, enum: ["notification", "newsletter", "advert"], required: [true, "Why no mail type?"] },
  language: { type: String, required: [true, "Why no mail language?"] },
  mailSubject: { type: String, required: [true, "Why no mail subject?"] },
  mailBody: { type: String, required: [true, "Why no mail body?"] },
  recipient: { type: String, enum: ["vendor", "customer", "subscriber"], required: [true, "Why no recipient type?"] },
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
    transfrom: (obj, ret) => { delete ret._id; },
  },
});

MailSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      name: this.name,
      kind: this.kind,
      language: this.language,
      mailSubject: this.mailSubject,
      mailBody: this.mailBody,
      recipient: this.recipient,
      createdType: this.createdType,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      standing: this.standing,
      updated: this.updated,
    } : view;
  },
};

const Mail = mongoose.model("Mail", MailSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Mail;
