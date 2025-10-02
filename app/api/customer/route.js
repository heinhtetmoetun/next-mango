import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

// ✅ Get all customers
export async function GET() {
  await dbConnect();
  const customers = await Customer.find().sort({ createdAt: -1 });
  return Response.json(customers);
}

// ✅ Create customer
export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const customer = new Customer(body);
  await customer.save();
  return Response.json(customer);
}

// ✅ Update customer
export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const { _id, ...updateData } = body;

  const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
  if (!customer) {
    return new Response("Customer not found", { status: 404 });
  }

  return Response.json(customer);
}
