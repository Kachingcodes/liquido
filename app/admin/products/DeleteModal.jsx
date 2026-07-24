"use client";

import { X, Trash2 } from "lucide-react";

const DeleteModal = ({ product, onClose, onConfirm }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={20} />
        </button>

        <div className="p-6">

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
            <Trash2
              size={30}
              className="text-red-600"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center">
            Delete Product
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center mt-3">
            Are you sure you want to permanently delete
          </p>

          <p className="text-center font-semibold text-lg mt-2">
            {product.name}
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-between mt-8">

            <button
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;