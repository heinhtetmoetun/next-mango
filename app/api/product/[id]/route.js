import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// GET one product by id
export async function GET(request, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id).populate("category");
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}

// DELETE one product by id
export async function DELETE(request, { params }) {
  await dbConnect();
  const product = await Product.findByIdAndDelete(params.id);
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json({ success: true });
}

