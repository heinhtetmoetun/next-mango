import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();
  const products = await Product.find().populate("category");
  return Response.json(products);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const product = new Product(body);
  await product.save();
  const withCat = await Product.findById(product._id).populate("category");
  return Response.json(withCat);
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true }).populate("category");
  if (!product) return new Response("Product not found", { status: 404 });
  return Response.json(product);
}
