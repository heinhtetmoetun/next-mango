export default async function ProductDetail({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  // fetch product by ID
  const res = await fetch(`${API_BASE}/product/${params.id}`, {
    cache: "no-store", // ✅ always fresh
  });
  const product = await res.json();

  if (!product || product.error) {
    return <div className="m-4 text-red-600">Product not found.</div>;
  }

  return (
    <div className="m-6 border p-6 rounded bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Product Details</h1>

      <p><span className="font-semibold">Name:</span> {product.name}</p>
      <p><span className="font-semibold">Code:</span> {product.code}</p>
      <p><span className="font-semibold">Description:</span> {product.description}</p>
      <p><span className="font-semibold">Price:</span> {product.price} Baht</p>

      <p>
        <span className="font-semibold">Category:</span>{" "}
        {product.category ? product.category.name : "—"}
      </p>
    </div>
  );
}
