import Link from "next/link";

export default function Home() {
  return (
    <main className="m-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">
        Welcome to Stock App
      </h1>
      <p className="text-gray-700">Choose a section:</p>

      <div className="flex gap-4">
        {/* ✅ Next.js automatically adds /stock prefix because of basePath */}
        <Link
          href="/category"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Manage Categories
        </Link>

        <Link
          href="/product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Manage Products
        </Link>
      </div>
    </main>
  );
}

