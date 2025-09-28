"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

export default function ProductPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/stock/api";
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const columns = [
    { field: "code", headerName: "Code", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      renderCell: (params) => params.row?.category?.name || "—",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) =>
        params?.row ? (
          <div className="space-x-2">
            <button
              onClick={() => deleteProduct(params.row._id)}
              className="text-red-600"
            >
              🗑️
            </button>
            <a href={`/product/${params.row._id}`} className="text-blue-600">
              ✏️
            </a>
          </div>
        ) : null,
    },
  ];

  // ✅ Fetch products with populated categories
  const fetchProducts = useCallback(async () => {
    const res = await fetch(`${API_BASE}/product`);
    const data = await res.json();
    setProductList(data.map((p) => ({ ...p, id: p._id })));
  }, [API_BASE]);

  // ✅ Fetch categories for dropdown
  const fetchCategories = useCallback(async () => {
    const res = await fetch(`${API_BASE}/category`);
    const data = await res.json();
    setCategories(data);
  }, [API_BASE]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

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
    <main className="p-6 space-y-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit(createProduct)}
        className="grid grid-cols-2 gap-4 border p-4 bg-white rounded shadow"
      >
        <input {...register("code")} placeholder="Code" className="border p-2" />
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="border p-2"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="border p-2 col-span-2"
        />
        <input
          type="number"
          {...register("price", { required: true, valueAsNumber: true })}
          placeholder="Price"
          className="border p-2"
        />
        
        {/* ✅ Dropdown for categories */}
        <select {...register("category", { required: true })} className="border p-2">
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* DataGrid */}
      <div className="m-4 bg-white p-2 rounded shadow">
        <DataGrid
          rows={productList}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
        />
      </div>
    </main>
  );
}
