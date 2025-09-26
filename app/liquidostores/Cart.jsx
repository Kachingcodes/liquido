"use client";
import React from "react";

export default function Cart({ cart, total, setShowCart }) {
  return (
    <div className="text-black p-6 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.volume}</p>
                <p className="text-sm text-gray-700">₦{item.price}</p>
              </div>
            </div>
            <span className="font-medium">x{item.quantity}</span>
          </div>
        ))
      )}

      {/* Total */}
      <div className="flex justify-between text-lg font-semibold mt-4">
        <span>Total:</span>
        <span>₦{total}</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={() => setShowCart(false)}
          className="w-1/2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Continue Shopping
        </button>
        <button className="w-1/2 px-4 py-2 bg-[#1C4672] text-white rounded-lg hover:bg-[#4C86C4] transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
