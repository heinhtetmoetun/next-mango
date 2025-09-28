import dbConnect from "@/lib/db";
import Category from "@/models/Category";

// ✅ Get all categories
export async function GET() {
  await dbConnect();
  const categories = await Category.find().sort({ order: -1 });
  return Response.json(categories);
}

// ✅ Create category
export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const category = new Category(body);
  await category.save();
  return Response.json(category);
}

// ✅ Update category
export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const category = await Category.findByIdAndUpdate(body._id, body, { new: true });
  if (!category) return new Response("Category not found", { status: 404 });
  return Response.json(category);
}
