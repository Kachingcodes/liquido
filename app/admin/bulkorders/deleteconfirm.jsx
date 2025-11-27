import { useState } from "react";
import { X, Trash2 } from "lucide-react";

export default function DeleteConfirm({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-sm text-center relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <Trash2 size={40} className="text-red-600 mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">Delete Bulk Order</h2>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete this bulk order? This action cannot be undone.
        </p>

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
