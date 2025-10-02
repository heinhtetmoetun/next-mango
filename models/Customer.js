import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    memberNumber: { type: Number, required: true, unique: true },
    interests: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
