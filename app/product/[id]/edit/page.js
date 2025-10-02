"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditProduct({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/fin-customer/api";
  const id = params.id;
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");

  // Load product data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/product/${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          reset({
            code: data.code,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category?._id || "",
          });
        } else {
          setMsg("Failed to load product data");
        }
      } catch (err) {
        setMsg("Error loading data");
      }
    })();
  }, [API_BASE, id, reset]);

  // Load categories for dropdown
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/category`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Error loading categories", err);
      }
    })();
  }, [API_BASE]);

  // Handle update
  const onSubmit = async (form) => {
    try {
      const res = await fetch(`${API_BASE}/product`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, ...form }),
      });

      if (res.ok) {
        // ✅ safer redirect back to product list
        window.location.href = `/fin-customer/product`;
      } else {
        const error = await res.json();
        setMsg(error.error || "Update failed");
      }
    } catch (err) {
      setMsg("Update failed due to server error");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Edit Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 border p-4 bg-white rounded shadow"
      >
        <input {...register("code")} placeholder="Code" className="border p-2" />
        <input {...register("name", { required: true })} placeholder="Name" className="border p-2" />
        <textarea {...register("description")} placeholder="Description" className="border p-2" />
        <input type="number" {...register("price", { required: true, valueAsNumber: true })} placeholder="Price" className="border p-2" />

        {/* Category dropdown */}
        <select {...register("category")} className="border p-2">
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {msg && <p className="text-red-600">{msg}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </main>
  );
}
