"use client";
// import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
    const adminEmail = typeof window !== "undefined" ? localStorage.getItem("adminEmail") : "";


  return (
    <div className="min-h-screen bg-gray-50 p-8">
        
        <h1 className="text-3xl font-semibold mb-6">Admin Dash</h1>
        <p className="mt-2">Logged in as: {adminEmail}</p>
     
    </div>
  );
}
