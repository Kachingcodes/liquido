"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag, Package, MessageSquare, HomeIcon, StoreIcon, TruckIcon } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import AdminSidebar from "./dashboard/AdminSidebar";

export default function AdminLayout({ children }) {
 

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 min-h-screen w-64 z-30">
          <AdminSidebar/>
        </div>

      {/* Main content */}
      <main className="flex-1 md:ml-60 lg:ml-64">
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
