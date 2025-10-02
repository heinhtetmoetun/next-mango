import Link from "next/link";

export default async function ProductDetail({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/fin-customer/api";

  const res = await fetch(`${API_BASE}/product/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="m-6 p-6 border rounded bg-red-50 text-red-600">
        Product not found.
      </div>
    );
  }

  const product = await res.json();

  return (
    <main className="m-6 p-6 border rounded bg-white shadow space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Product Details</h1>

      <p>
        <span className="font-semibold">Code:</span> {product.code}
      </p>
      <p>
        <span className="font-semibold">Name:</span> {product.name}
      </p>
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {product.description}
      </p>
      <p>
        <span className="font-semibold">Price:</span>{" "}
        {product.price?.toLocaleString()} Baht
      </p>
      <p>
        <span className="font-semibold">Category:</span>{" "}
        {product.category ? product.category.name : "—"}
      </p>

      <div className="flex gap-4 pt-4">
        <Link
          href={`/fin-customer/product/${product._id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ✏️ Edit
        </Link>

        <Link
          href="/fin-customer/product"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ⬅ Back to Products
        </Link>
      </div>
    </main>
  );
}
