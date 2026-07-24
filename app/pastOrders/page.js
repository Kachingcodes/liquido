"use client";
import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { MoreVertical, Package } from "lucide-react";



const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
});

export default function PastOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
                  className="mt-4 bg-[#1C4672] hover:bg-[#8FC0F4] text-white hover:text-black w-full py-3 px-4 rounded-lg"
                    >
                      Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

  {/* Header */}

  <div className="bg-white border-b sticky top-0 z-10">

    <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

      <h1 className={`${quick.className} text-3xl text-[#1C4672]`}>
        Your Past Orders
      </h1>

      <button
        onClick={() => router.push("/liquidostores")}
        className="bg-[#1C4672] hover:bg-[#16395d] text-white px-5 py-2 rounded-xl transition"
      >
        Back to Store
      </button>

    </div>

  </div>

  <div className="max-w-7xl mx-auto p-6">

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

      <AnimatePresence>

        {orders.map((order) => (

          <motion.div
            key={order.id}
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .95 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition overflow-hidden"
          >

            <div className="bg-[#1C4672] text-white p-4 flex justify-between items-start">

              <Package size={28} />

              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setShowModal(true);
                }}
                className="hover:bg-white/20 rounded-lg p-1 transition"
              >
                <MoreVertical size={18}/>
              </button>

            </div>

            <div className="p-4">

              <h3 className="font-bold text-lg truncate">
                #{order.id}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.date.seconds * 1000).toLocaleDateString()}
              </p>

              <div className="mt-4 space-y-2">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Items
                  </span>

                  <span className="font-semibold">
                    {order.items.length}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Total
                  </span>

                  <span className="font-bold text-[#1C4672]">
                    ₦{Number(order.total).toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </AnimatePresence>

    </div>

  </div>

  {/* Modal */}

  <AnimatePresence>

    {showModal && selectedOrder && (

      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        exit={{ opacity:0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
        onClick={() => setShowModal(false)}
      >

        <motion.div
          initial={{ scale:.9 }}
          animate={{ scale:1 }}
          exit={{ scale:.9 }}
          onClick={(e)=>e.stopPropagation()}
          className="bg-white rounded-3xl w-full max-w-lg p-7"
        >

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Order #{selectedOrder.id}
            </h2>

            <button
              onClick={() => setShowModal(false)}
              className="text-2xl"
            >
              ×
            </button>

          </div>

          <div className="space-y-3">

            <p><strong>Date:</strong> {new Date(selectedOrder.date.seconds * 1000).toLocaleString()}</p>

            <p><strong>Location:</strong> {selectedOrder.location}</p>

            <p><strong>Delivery:</strong> {new Date(selectedOrder.time).toLocaleString()}</p>

            <p><strong>Payment:</strong> {selectedOrder.payment}</p>

          </div>

          <div className="border-t my-6"></div>

          <div className="space-y-3">

            {selectedOrder.items.map(item => (

              <div
                key={item.id}
                className="flex justify-between"
              >

                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty {item.qty}
                  </p>

                </div>

                <span className="font-semibold">
                  ₦{(item.price * item.qty).toLocaleString()}
                </span>

              </div>

            ))}

          </div>

          <div className="border-t mt-6 pt-5 flex justify-between font-bold text-xl">

            <span>Total</span>

            <span className="text-[#1C4672]">
              ₦{Number(selectedOrder.total).toLocaleString()}
            </span>

          </div>

        </motion.div>

      </motion.div>

    )}

  </AnimatePresence>

</div>
  );
}