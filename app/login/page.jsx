"use client";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
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

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",");

      if (!adminEmails.includes(userCredential.user.email)) {
        setError("You are not authorized.");
        return;
      }

    const idToken = await userCredential.user.getIdToken(true);

    const response = await fetch("/api/sessionLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      idToken,
  }),
});

const data = await response.json();

console.log(data);

if (!response.ok) {
  throw new Error(data.error || "Failed to create session.");
}

// Refresh the router so the server sees the new cookie
router.refresh();

// Go to dashboard
console.log("Before redirect");
window.location.assign("/admin/dashboard");
console.log("After redirect");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Incorrect email or password.");
          break;

        case "auth/too-many-requests":
          setError(
            "Too many failed attempts. Please try again later."
          );
          break;

        default:
          setError("Unable to sign in. Please try again.");
      }
    }
  }

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

        <button 
        type="submit"
        className="w-full bg-black text-white py-2 mt-5 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
