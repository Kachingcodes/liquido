"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // ─── Load theme on mount ──────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  // ─── Sync theme when changed ──────────────────
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // ─── Prevent scroll when sidebar open ────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <div className="flex min-h-screen bg-white md:bg-gray-100 dark:bg-neutral-900 transition-colors duration-300">

      {/* ─── Desktop Sidebar ─────────────────────── */}
      <div className="hidden md:flex fixed top-0 left-0 min-h-screen w-64 z-30">
        <AdminSidebar />
      </div>

      {/* ─── Mobile Sidebar Overlay ─────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 z-50 shadow-2xl"
            >
              <AdminSidebar
                  onSelect={() => setIsOpen(false)}
              />

              <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 rounded-lg"
              >
                  <X className="text-white" size={22} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <main className="flex-1 md:ml-64 relative">

        {/* Sticky Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#1C4672] shadow-md flex items-center justify-center">
          <div className="md:hidden flex items-center justify-center">

            <button
              onClick={() => setIsOpen(true)}
              className={`absolute left-4 transition ${
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <Menu size={24} className="text-white" />
            </button>

            <h1 className="text-lg font-semibold text-white">
              Liquido Admin
            </h1>

            <div className="absolute right-4 w-7" />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-2 mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>

      </main>
    </div>
  );
}
