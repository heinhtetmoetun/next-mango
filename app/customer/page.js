"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomerPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/fin-customer/api";
  const [customerList, setCustomerList] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      width: 160,
      renderCell: (params) =>
        params.row.dateOfBirth
          ? new Date(params.row.dateOfBirth).toLocaleDateString()
          : "—",
    },
    { field: "memberNumber", headerName: "Member #", width: 140 },
    { field: "interests", headerName: "Interests", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) =>
        params?.row ? (
          <div className="space-x-2">
            <button
              onClick={() => deleteCustomer(params.row._id)}
              className="text-red-600"
            >
              🗑️
            </button>
            <a
              href={`/fin-customer/customer/${params.row._id}`}
              className="text-blue-600"
            >
              ✏️
            </a>
          </div>
        ) : null,
    },
  ];

  // ✅ Fetch customers
  const fetchCustomers = useCallback(async () => {
    const res = await fetch(`${API_BASE}/customer`);
    const data = await res.json();
    setCustomerList(data.map((c) => ({ ...c, id: c._id })));
  }, [API_BASE]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const createCustomer = (data) => {
    fetch(`${API_BASE}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      reset();
      fetchCustomers();
    });
  };

  const deleteCustomer = async (id) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`${API_BASE}/customer/${id}`, { method: "DELETE" });
    fetchCustomers();
  };

  return (
    <main className="p-6 space-y-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit(createCustomer)}
        className="grid grid-cols-2 gap-4 border p-4 bg-white rounded shadow"
      >
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="border p-2"
        />
        <input
          type="date"
          {...register("dateOfBirth", { required: true })}
          className="border p-2"
        />
        <input
          type="number"
          {...register("memberNumber", { required: true, valueAsNumber: true })}
          placeholder="Member Number"
          className="border p-2"
        />
        <input
          {...register("interests")}
          placeholder="Interests (comma separated)"
          className="border p-2 col-span-2"
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Add Customer
          </button>
        </div>
      </form>

      {/* DataGrid */}
      <div className="m-4 bg-white p-2 rounded shadow">
        <DataGrid
          rows={customerList}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
        />
      </div>
    </main>
  );
}
