/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const SubscriberSchema = new Schema({
  email: { type: String },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "weekly",
    required: [true, "Why no sender?"],
  },
  interest: { type: [] },
  standing: {
    type: String,
    enum: ["subscribed", "unsubscribed", "trashed"],
    default: "subscribed",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

SubscriberSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      email: this.email,
      frequency: this.frequency,
      interest: this.interest,
    };

    return full ? {
      ...view,
      standing: this.standing,
      updated: this.updated,
    } : view;
  },
};

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Subscriber;
