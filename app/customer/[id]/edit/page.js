"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditCustomer({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/fin-customer/api";
  const id = params.id;
  const { register, handleSubmit, reset } = useForm();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/customer/${id}`);
        if (res.ok) {
          const data = await res.json();
          reset({
            name: data.name,
            dateOfBirth: data.dateOfBirth?.substring(0, 10),
            memberNumber: data.memberNumber,
            interests: data.interests,
          });
        } else {
          setMsg("Failed to load customer");
        }
      } catch (err) {
        setMsg("Error fetching data");
      }
    })();
  }, [API_BASE, id, reset]);

  const onSubmit = async (form) => {
    try {
      const res = await fetch(`${API_BASE}/customer/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        window.location.href = `/fin-customer/customer/${id}`;
      } else {
        const error = await res.json();
        setMsg(error.error || "Update failed");
      }
    } catch (err) {
      setMsg("Request failed");
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Edit Customer</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 border p-4 bg-white rounded shadow"
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
          {...register("memberNumber", {
            required: true,
            valueAsNumber: true,
          })}
          placeholder="Member Number"
          className="border p-2"
        />
        <input
          {...register("interests")}
          placeholder="Interests"
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
