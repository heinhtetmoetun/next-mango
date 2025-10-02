import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

// ✅ Get one customer by id
export async function GET(request, { params }) {
  await dbConnect();
  const customer = await Customer.findById(params.id);
  if (!customer) return new Response("Not found", { status: 404 });
  return Response.json(customer);
}

// ✅ Delete customer by id
export async function DELETE(request, { params }) {
  await dbConnect();
  const deleted = await Customer.findByIdAndDelete(params.id);
  if (!deleted) return new Response("Not found", { status: 404 });
  return Response.json(deleted);
}
