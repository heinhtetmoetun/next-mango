import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  code: String,
  name: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
