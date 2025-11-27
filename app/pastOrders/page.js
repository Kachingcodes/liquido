"use client";
import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';


const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
});

export default function PastOrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.reverse()); // show latest orders first
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className={`${quick.className} text-3xl mb-4`}>Past Orders</h1>
        <p className="text-gray-500">You have not placed any orders yet.</p>
        <div>
          <button                    
            onClick={() => {
                router.push("/liquidostores");
                }}
                    className="mt-6 bg-[#1C4672] text-white w-full py-3 rounded-lg"
                    >
                      Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-4xl mx-auto">
      <h1 className={`${quick.className} text-3xl mb-6 text-center`}>Your Past Orders</h1>

      <div className="space-y-6">
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID: {order.id}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(order.date.seconds * 1000).toLocaleString()}
                </span>
              </div>

              <div className="mb-2">
                <h3 className="font-semibold mb-1">Items:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.qty} - ₦{item.price * item.qty}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between mt-2 text-gray-800 font-semibold">
                <span>Total:</span>
                <span>₦{order.total}</span>
              </div>

              <div className="flex justify-between mt-1 text-gray-600 text-sm">
                <span>Location: {order.location}</span>
                <span>Delivery: {new Date(order.time).toLocaleString()}</span>
                <span>Payment: {order.payment}</span>
              </div>
            </motion.div>
          ))}

           <div>
                <button
                    onClick={() => {
                router.push("/liquidostores");
                }}
                    className="mt-6 bg-[#1C4672] text-white w-full py-3 rounded-lg"
                    >
                      Back to Store
                </button>
              </div>
        </AnimatePresence>
      </div>
    </div>
  );
}