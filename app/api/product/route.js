import dbConnect from "@/lib/db";
import Product from "@/models/Product";

// ✅ Get all products
export async function GET() {
  await dbConnect();
  const products = await Product.find().populate("category"); // <-- populate category
  return Response.json(products);
}

// ✅ Create product
export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const product = new Product(body);
  await product.save();
  return Response.json(await product.populate("category")); // return with category populated
}

// ✅ Update product
export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const { _id, ...updateData } = body;

  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true }).populate("category");
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }

  return Response.json(product);
}
