"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

export default function CategoryPage() {
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "order", headerName: "Order", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => startEditMode(params.row)}>📝</button>
          <button onClick={() => deleteCategory(params.row)}>🗑️</button>
        </div>
      ),
    },
  ];

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  async function fetchCategory() {
    const res = await fetch(`${API_BASE}/category`);
    const data = await res.json();
    setCategoryList(data.map((c) => ({ ...c, id: c._id })));
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  function handleCategoryFormSubmit(data) {
    if (editMode) {
      fetch(`${API_BASE}/category`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(() => {
        stopEditMode();
        fetchCategory();
      });
      return;
    }

    fetch(`${API_BASE}/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => fetchCategory());
  }

  function startEditMode(category) {
    reset(category);
    setEditMode(true);
  }

  function stopEditMode() {
    reset({ name: "", order: "" });
    setEditMode(false);
  }

  async function deleteCategory(category) {
    if (!confirm(`Delete [${category.name}]?`)) return;
    await fetch(`${API_BASE}/category/${category._id}`, { method: "DELETE" });
    fetchCategory();
  }

  return (
    <main>
      {/* Form */}
      <form onSubmit={handleSubmit(handleCategoryFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 m-4 border p-2">
          <label>Name:</label>
          <input {...register("name", { required: true })} className="border p-1" />

          <label>Order:</label>
          <input type="number" {...register("order", { required: true })} className="border p-1" />

          <div className="col-span-2 text-right">
            {editMode ? (
              <>
                <input type="submit" value="Update" className="bg-blue-600 text-white px-4 py-2 rounded" />
                <button type="button" onClick={stopEditMode} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <input type="submit" value="Add" className="bg-green-600 text-white px-4 py-2 rounded" />
            )}
          </div>
        </div>
      </form>

      {/* Table */}
      <div className="m-4">
        <DataGrid rows={categoryList} columns={columns} autoHeight />
      </div>
    </main>
  );
}
