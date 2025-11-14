"use client"
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { HomeIcon } from 'lucide-react';


const AdminLogin = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmails = [
      process.env.NEXT_PUBLIC_ADMIN_EMAIL_1,
      process.env.NEXT_PUBLIC_ADMIN_EMAIL_2
    ];

    const passwords = [
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD_1,
        process.env.NEXT_PUBLIC_ADMIN_PASSWORD_2
    ];

    const userIndex = validEmails.indexOf(formData.email);

    if (userIndex !== -1 && formData.password === passwords[userIndex]) {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-[#1C4672]">
          Admin Login
        </h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 bg-gray-100 focus:border-[#1C4672] focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 bg-gray-100 focus:border-[#1C4672] focus:outline-none"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#1C4672] text-white py-2 rounded-lg hover:bg-[#153A59] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
