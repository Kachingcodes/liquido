"use client";
import { useAuth } from "../context/AuthContext";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    // const { user } = useAuth();
  // const router = useRouter();
const adminEmail = typeof window !== "undefined" ? localStorage.getItem("adminEmail") : "";




  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("adminAuth");
  //   if (!isAuthenticated) {
  //     router.push("/admin");
  //   }
  // }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
        
      <h1 className="text-3xl font-semibold mb-6">Admin Dash</h1>
<p className="mt-2">Logged in as: {adminEmail}</p>
     {/* <div className="space-y-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => router.push("/admin/dashboard/add-product")}
        >
          Add Product
        </button>

        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            localStorage.removeItem("adminAuth");
            router.push("/admin");
          }}
        >
          Logout
        </button>
      </div> */}
    </div>
  );
}
