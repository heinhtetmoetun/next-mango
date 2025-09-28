import dbConnect from "@/lib/db";
import Category from "@/models/Category";

export async function GET(request) {
  await dbConnect(); // ✅ ensure DB connected

  // Example: /api/category?pno=2
  const pno = request.nextUrl.searchParams.get("pno");
  if (pno) {
    const size = 3; // TODO: move to env or config later
    const startIndex = (pno - 1) * size;

    const categories = await Category.find()
      .sort({ order: -1 })
      .skip(startIndex)
      .limit(size);

    return Response.json(categories);
  }

  // Example: /api/category?s=food
  const s = request.nextUrl.searchParams.get("s");
  if (s) {
    const categories = await Category.find({
      name: { $regex: s, $options: "i" },
    }).sort({ order: -1 });

    return Response.json(categories);
  }

  // Default: return all
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

// Update (replace fields) – V2
export async function PUT(request) {
  await dbConnect();
  const body = await request.json();

  const category = await Category.findByIdAndUpdate(body._id, body, {
    new: true, // ✅ return updated doc
  });

  if (!category) {
    return new Response("Category not found", { status: 404 });
  }

  return Response.json(category);
}
