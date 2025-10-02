import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import mongoose from "mongoose";

// ✅ Get all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().populate("category");
    return Response.json(products);
  } catch (err) {
    console.error("Product GET all error:", err);
    return new Response("Server error", { status: 500 });
  }
}

// ✅ Create product
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const product = new Product(body);
    await product.save();

    // populate category before sending back
    await product.populate("category");

    return Response.json(product);
  } catch (err) {
    console.error("Product POST error:", err);
    return new Response("Server error", { status: 500 });
  }
}

// ✅ Update product
export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    const product = await Product.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    ).populate("category");

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return Response.json(product);
  } catch (err) {
    console.error("Product PUT error:", err);
    return new Response("Server error", { status: 500 });
  }
}
