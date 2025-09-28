import dbConnect from "@/lib/db";
import Category from "@/models/Category";

export async function GET(request, { params }) {
  await dbConnect();
  const category = await Category.findById(params.id);
  if (!category) return new Response("Not found", { status: 404 });
  return Response.json(category);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const deleted = await Category.findByIdAndDelete(params.id);
  if (!deleted) return new Response("Not found", { status: 404 });
  return Response.json(deleted);
}
