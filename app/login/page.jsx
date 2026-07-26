"use client";
import { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import {Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";


export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
  auth,
  email,
  password
);

// Get the Firebase ID token
const idToken = await userCredential.user.getIdToken(true);

// Exchange it for a secure session cookie
const response = await fetch("/api/sessionLogin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    idToken,
  }),
});

if (!response.ok) {
  throw new Error("Failed to create session.");
}

// Refresh the router so the server sees the new cookie
router.refresh();

// Go to dashboard
router.push("/admin/dashboard");
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50 to-primary/5 p-6">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-[#1C4672] p-8 shadow-2xl">

        {/* Logo */}

        <div className="mb-8 text-center">
          <div className="mx-auto flex h-30 w-60 items-center justify-center">
            <Image
              src="/logo.png"
              alt="Icon"
              width={280}
              height={280}
            />
          </div>

          {/* <h1 className="text-3xl font-semibold">
            LIQUIDO
          </h1> */}

          <p className="text-gray-200">
            Admin Portal
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}

          <div>
            <label className="mb-2 block text-white text-sm font-medium">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl text-white border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-white"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-white text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl text-white border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-white"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 hover:text-primary"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-gray-200 py-3 font-medium text-gray-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="mr-2 animate-spin"
                />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}




























//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // Sync browser auto-filled values on mount
//   useEffect(() => {
//     const emailInput = document.querySelector('input[name="email"]');
//     const passwordInput = document.querySelector('input[name="password"]');
//     if (emailInput && passwordInput) {
//       setForm({
//         email: emailInput.value,
//         password: passwordInput.value,
//       });
//     }
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// async function handleLogin(e) {
//   e.preventDefault();
//   setError("");

//   console.log("Attempting login...");
//   console.log(form.email);

//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       form.email.trim(),
//       form.password
//     );

//     console.log("Firebase login successful");

//     const adminEmails =
//       process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",");

//     console.log(adminEmails);

//     if (!adminEmails.includes(userCredential.user.email)) {
//       setError("You are not authorized.");
//       return;
//     }

//     console.log("Admin verified");

//     const idToken =
//       await userCredential.user.getIdToken(true);

//     console.log("Token created");

//     const response = await fetch("/api/sessionLogin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ idToken }),
//     });

//     console.log("sessionLogin status", response.status);

//     const data = await response.json();

//     console.log(data);

//     router.refresh();

//     window.location.assign("/admin/dashboard");

//   } catch (err) {
//     console.log(err);
//   }
// }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
//       >
//         <h1 className="text-xl mb-4 font-semibold">Admin Login</h1>

//         <label className="block mb-2">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           autoComplete="username"
//           className="w-full border px-3 py-2 rounded"
//           required
//         />

//         <label className="block mt-4 mb-2">Password</label>
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             autoComplete="current-password"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

//         <button 
//         type="submit"
//         className="w-full bg-black text-white py-2 mt-5 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
