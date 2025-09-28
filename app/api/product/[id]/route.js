import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// GET one product by id
export async function GET(request, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id).populate("category");
<<<<<<< HEAD
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
=======
  if (!product) return new Response("Not found", { status: 404 });
>>>>>>> 5732ec9 (Update category/product with API_BASE env support)
  return Response.json(product);
}

// DELETE one product by id
export async function DELETE(request, { params }) {
  await dbConnect();
<<<<<<< HEAD
  const product = await Product.findByIdAndDelete(params.id);
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json({ success: true });
=======
  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) return new Response("Not found", { status: 404 });
  return Response.json(deleted);
>>>>>>> 5732ec9 (Update category/product with API_BASE env support)
}

