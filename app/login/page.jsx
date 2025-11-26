"use client";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sync browser auto-filled values on mount
  useEffect(() => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    if (emailInput && passwordInput) {
      setForm({
        email: emailInput.value,
        password: passwordInput.value,
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",");

      if (!adminEmails.includes(userCred.user.email)) {
        setError("You are not authorized.");
        return;
      }

      // Set cookie so middleware allows access
      document.cookie = "adminToken=1; path=/; max-age=86400";

      // Store admin email for dashboard display
      localStorage.setItem("adminEmail", userCred.user.email);

      router.push("/admin");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
      >
        <h1 className="text-xl mb-4 font-semibold">Admin Login</h1>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="username"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <label className="block mt-4 mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button className="w-full bg-black text-white py-2 mt-5 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
