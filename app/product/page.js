"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  async function fetchProducts() {
    const res = await fetch(`${API_BASE}/product`);
    setProducts(await res.json());
  }

  async function fetchCategories() {
    const res = await fetch(`${API_BASE}/category`);
    setCategories(await res.json());
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const createProduct = (data) => {
    fetch(`${API_BASE}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      reset();
      fetchProducts();
    });
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API_BASE}/product/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="flex gap-6 p-6">
      {/* Product Form */}
      <form
        onSubmit={handleSubmit(createProduct)}
        className="w-1/3 border p-4 rounded bg-white shadow"
      >
        <h2 className="font-bold text-lg mb-4">Add Product</h2>
        <div className="mb-3">
          <label className="block text-sm">Code:</label>
          <input {...register("code")} className="border p-2 w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Name:</label>
          <input {...register("name", { required: true })} className="border p-2 w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Description:</label>
          <textarea {...register("description")} className="border p-2 w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Price:</label>
          <input type="number" {...register("price", { required: true })} className="border p-2 w-full" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Category:</label>
          <select {...register("category", { required: true })} className="border p-2 w-full">
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Add Product
        </button>
      </form>

      {/* Product Table */}
      <div className="w-2/3 border p-4 bg-gray-50 rounded shadow">
        <h2 className="font-bold text-lg mb-4">Products ({products.length})</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-100">
                <td className="border p-2">{p.code}</td>
                <td className="border p-2 font-bold text-blue-700">
                  <Link href={`/product/${p._id}`}>{p.name}</Link>
                </td>
                <td className="border p-2">{p.description}</td>
                <td className="border p-2">{p.price.toLocaleString()}</td>
                <td className="border p-2">{p.category?.name || "—"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 mr-2"
                  >
                    🗑️
                  </button>
                  <Link href={`/product/${p._id}`} className="text-blue-600">
                    ✏️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
