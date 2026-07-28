"use client";

import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function ProductActionMenu({
  product,
  onView,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative inline-block text-left"
    >
      {/* Three-dot button */}
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
      >
        <MoreVertical size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border bg-white shadow-xl z-50 overflow-hidden">

          <button
            onClick={() => {
              onView(product);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
          >
            <Eye size={18} />
            View Product
          </button>

          <button
            onClick={() => {
              onEdit(product);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
          >
            <Pencil size={18} />
            Edit Product
          </button>

          <div className="border-t" />

          <button
            onClick={() => {
              onDelete(product);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition text-left"
          >
            <Trash2 size={18} />
            Delete Product
          </button>

        </div>
      )}
    </div>
  );
}