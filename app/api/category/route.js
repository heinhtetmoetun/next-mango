import dbConnect from "@/lib/db";
import Category from "@/models/Category";

export async function GET(request) {
  await dbConnect();

  const pno = request.nextUrl.searchParams.get("pno");
  const s   = request.nextUrl.searchParams.get("s");

  if (pno) {
    const size = 3;
    const startIndex = (Number(pno) - 1) * size;
    const categories = await Category.find()
      .sort({ order: -1 })
      .skip(startIndex)
      .limit(size);
    return Response.json(categories);
  }

  if (s) {
    const categories = await Category.find({
      name: { $regex: s, $options: "i" },
    }).sort({ order: -1 });
    return Response.json(categories);
  }

  const categories = await Category.find().sort({ order: -1 });
  return Response.json(categories);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const category = new Category(body);
  await category.save();
  return Response.json(category);
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const category = await Category.findByIdAndUpdate(body._id, body, { new: true });
  if (!category) return new Response("Category not found", { status: 404 });
  return Response.json(category);
}
