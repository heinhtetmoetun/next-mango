import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  await dbConnect();
  const product = await Product.findById(params.id).populate("category");
  if (!product) return new Response("Not found", { status: 404 });
  return Response.json(product);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) return new Response("Not found", { status: 404 });
  return Response.json(deleted);
}
