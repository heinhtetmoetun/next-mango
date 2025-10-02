"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditProduct({ params }) {
  // Use relative base just like Customer
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/fin-customer/api";
  const id = params.id;
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // ✅ Always prefix with window.location.origin if SSR tries
        const url =
          typeof window === "undefined"
            ? `http://localhost:3001${API_BASE}/product/${id}`
            : `${API_BASE}/product/${id}`;

        const res = await fetch(url, { cache: "no-store" });
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
          setMsg("Failed to load product");
        }
      } catch {
        setMsg("Error fetching data");
      }
    })();
  }, [API_BASE, id, reset]);

  const onSubmit = async (form) => {
    try {
      const url =
        typeof window === "undefined"
          ? `http://localhost:3001${API_BASE}/product`
          : `${API_BASE}/product`;

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, ...form }),
      });
      if (res.ok) {
        window.location.href = `/fin-customer/product/${id}`;
      } else {
        const error = await res.json();
        setMsg(error.error || "Update failed");
      }
    } catch {
      setMsg("Request failed");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Edit Product</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 border p-4 bg-white rounded shadow"
      >
        <input
          {...register("code", { required: true })}
          placeholder="Code"
          className="border p-2"
        />
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="border p-2"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2"
        />
        <input
          type="number"
          {...register("price", { required: true, valueAsNumber: true })}
          placeholder="Price"
          className="border p-2"
        />
        <input
          {...register("category")}
          placeholder="Category ID"
          className="border p-2"
        />

        {msg && <p className="text-red-600">{msg}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </main>
  );
}
