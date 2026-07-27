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
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-900 transition-colors duration-300">

      {/* ─── Desktop Sidebar ─────────────────────── */}
      <div className="hidden md:flex fixed top-0 left-0 min-h-screen w-64 z-30">
        <AdminSidebar />
      </div>

      {/* ─── Mobile Hamburger Button ────────────── */}
      <button
        id="hamburger-btn"
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-5 left-2 z-[60]"
      >
        <Menu
          size={28}
          className={` ${
            isOpen
              ? "hidden"
              : "text-gray-800 dark:text-gray-100"
          }`}
        />
      </button>

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

      {/* ─── Main Content ───────────────────────── */}
      <main className="flex-1 md:ml-64 mt-4 p-2 relative">
        {/* 🌗 Dark Mode Toggle */}
        {/* <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="fixed top-3 right-2 md:right-4 p-2 z-100 rounded-full  shadow transition"
        >
          {theme === "light" ? (
            <Moon className="text-gray-900" size={22} />
          ) : (
            <Sun className="text-yellow-300" size={22} />
          )}
        </button> */}

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
