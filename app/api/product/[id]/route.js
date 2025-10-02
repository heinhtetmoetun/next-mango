import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

// ✅ Get one product by id
export async function GET(request, { params }) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    const product = await Product.findById(params.id).populate("category");
    if (!product) {
      return new Response("Not found", { status: 404 });
    }

    return Response.json(product);
  } catch (err) {
    console.error("Product GET by id error:", err);
    return new Response("Server error", { status: 500 });
  }
}

// ✅ Delete product by id
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(params.id);
    if (!deleted) {
      return new Response("Not found", { status: 404 });
    }

    return Response.json(deleted);
  } catch (err) {
    console.error("Product DELETE error:", err);
    return new Response("Server error", { status: 500 });
  }
}
