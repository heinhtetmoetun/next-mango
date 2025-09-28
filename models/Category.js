import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, default: 0 }, // ✅ required by teacher for sorting
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);
