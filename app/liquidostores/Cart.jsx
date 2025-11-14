"use client";

import { useStore } from '@/app/context/StoreContext';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2 } from "lucide-react";

export default function Cart() {
  const {
    cartOpen,
    toggleCart,
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
    <AnimatePresence>
      {/* Background Overlay */}
      {cartOpen && (
        <div
        //   onClick={toggleCart}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-100 bg-white shadow-xl z-50 transform transition-transform duration-300 
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={toggleCart}>
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 overflow-y-auto h-[70%]">
          {cart.length === 0 && (
            <p className="text-gray-500 mt-10 text-center">
              Your cart is empty.
            </p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b py-3"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">₦{item.price}</p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Total */}
        <div className="p-4 border-t font-semibold text-lg flex justify-between">
          <span>Total:</span>
          <span>₦{totalPrice.toLocaleString()}</span>
        </div>
      </div>
      </AnimatePresence>
    </>
  );
}
