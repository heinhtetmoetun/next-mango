import Link from "next/link";

export default async function CustomerDetail({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/fin-customer/api";

  const res = await fetch(`${API_BASE}/customer/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="m-6 p-6 border rounded bg-red-50 text-red-600">
        Customer not found.
      </div>
    );
  }

  const customer = await res.json();

  return (
    <main className="m-6 p-6 border rounded bg-white shadow space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Customer Details</h1>

      <p>
        <span className="font-semibold">Name:</span> {customer.name}
      </p>
      <p>
        <span className="font-semibold">Date of Birth:</span>{" "}
        {new Date(customer.dateOfBirth).toLocaleDateString()}
      </p>
      <p>
        <span className="font-semibold">Member Number:</span>{" "}
        {customer.memberNumber}
      </p>
      <p>
        <span className="font-semibold">Interests:</span>{" "}
        {customer.interests || "—"}
      </p>

      <div className="flex gap-4 pt-4">
        <Link
          href={`/fin-customer/customer/${customer._id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ✏️ Edit
        </Link>

        <Link
          href="/fin-customer/customer"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ⬅ Back to Customers
        </Link>
      </div>
    </main>
  );
}
