/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  name: { type: String, required: [true, "Why no template name"] },
  page: {
    type: String,
    enum: ["theme", "home", "profile", "product", "details", "invoice", "ticket", "newsletter", "mail"],
    required: [true, "Why no page type?"],
  },
  icon: { type: String, required: [false, "Why no template image"] },
  style: { type: String, required: [true, "Why no stylesheet"] },
  placeholders: [{
    attribute: { type: String, required: [false, "Why no property name"] },
    value: { type: String, required: [false, "Why no value name"] },
  }],
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

TemplateSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      admin: this.admin,
      name: this.name,
      page: this.page,
      icon: this.icon,
      style: this.style,
      placeholders: this.placeholders,
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

const Template = mongoose.model("Template", TemplateSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Template;
