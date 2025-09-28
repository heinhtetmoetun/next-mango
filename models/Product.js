import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  code: String,
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
