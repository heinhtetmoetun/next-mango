"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

export default function CategoryPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/stock/api";
  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "order", headerName: "Order", width: 120, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) =>
        params?.row ? (
          <div className="space-x-2">
            <button
              onClick={() => startEditMode(params.row)}
              className="text-blue-700"
            >
              📝
            </button>
            <button
              onClick={() => deleteCategory(params.row)}
              className="text-red-600"
            >
              🗑️
            </button>
          </div>
        ) : null,
    },
  ];

  const fetchCategory = useCallback(async () => {
    const res = await fetch(`${API_BASE}/category`);
    const data = await res.json();
    // ✅ Ensure each row has `id`
    setCategoryList(data.map((c) => ({ ...c, id: c._id })));
  }, [API_BASE]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  function startEditMode(category) {
    reset(category); // fills the form with row data
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
    }).then(() => {
      reset({ name: "", order: "" });
      fetchCategory();
    });
  }

  return (
    <main className="p-6 space-y-6">
      <form onSubmit={handleSubmit(handleCategoryFormSubmit)}>
        <div className="grid grid-cols-2 gap-4 m-4 border p-4 rounded bg-white shadow">
          <label>Name:</label>
          <input
            {...register("name", { required: true })}
            className="border p-2 rounded"
          />

          <label>Order:</label>
          <input
            type="number"
            {...register("order", { required: true, valueAsNumber: true })}
            className="border p-2 rounded"
          />

          <div className="col-span-2 text-right">
            {editMode ? (
              <>
                <input
                  type="submit"
                  value="Update"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                />
                <button
                  type="button"
                  onClick={stopEditMode}
                  className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Add"
                className="bg-green-600 text-white px-4 py-2 rounded"
              />
            )}
          </div>
        </div>
      </form>

      <div className="m-4 bg-white p-2 rounded shadow">
        <DataGrid
          rows={categoryList}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
        />
      </div>
    </main>
  );
}
