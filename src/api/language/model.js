/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const LanguageSchema = new Schema({
  word_id: { type: Number, required: [true, "Why no word id?"] },
  word: { type: String, required: [true, "Why no word key?"] },
  english: { type: String, required: [true, "Why no english?"] },
  french: { type: String, required: [true, "Why no french?"] },
  spanish: { type: String, required: [true, "Why no spanish?"] },
  bangla: { type: String, required: [true, "Why no bangla?"] },
  arabic: { type: String, required: [true, "Why no arabic?"] },
  chinese: { type: String, required: [true, "Why no chinese?"] },
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

LanguageSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      word_id: this.word_id,
      word: this.word,
      english: this.english,
      french: this.french,
      spanish: this.spanish,
      bangla: this.bangla,
      arabic: this.arabic,
      chinese: this.chinese,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };

    return full ? {
      ...view,
      updated: this.updated,
      standing: this.standing,
    } : view;
  },
};

const Language = mongoose.model("Language", LanguageSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Language;
