"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag, Package, MessageSquare, HomeIcon } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";


export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C4672] text-white flex flex-col justify-between overflow-hidden">
        <div>
          <div className="p-6 text-2xl font-semibold border-b border-blue-400">
            Liquido Admin
          </div>
          <nav className="p-4 space-y-4">
            
            <Link 
              href="/"               
              className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
            >
              <div className="flex items-center gap-2">
                <HomeIcon size={18}/> Home
              </div>
            </Link>
      
            <Link
              href="/admin/dashboard"
              className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
            >
              <div className="flex items-center gap-2">
                <LuLayoutDashboard size={18}/> Dashboard
              </div>
            </Link>

            <Link
              href="/admin/dashboard/products"
              className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
            >
              <div className="flex items-center gap-2">
                <Package size={18}/> Products
              </div>
            </Link>

            <Link
              href="/admin/dashboard/orders"
              className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18}/> Orders
              </div>
            </Link>

            <Link
              href="/admin/dashboard/messages"
              className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={18}/> Messages
              </div>
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-2 bg-white text-[#1C4672] px-4 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          <LogOut size={18}/> Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
