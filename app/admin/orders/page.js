"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // adjust path if necessary
import { motion, AnimatePresence } from "framer-motion";
import { Quicksand } from "next/font/google";
import { Search, CheckCircle, XCircle, MoreVertical, X } from "lucide-react";

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
});

const formatDate = (fDate) => {
  if (!fDate) return "Unknown date";
  if (fDate.seconds) return new Date(fDate.seconds * 1000).toLocaleString();
  return new Date(fDate).toLocaleString();
};

export default function AdminOrdersPage() {
  // data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI controls
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | paid | unpaid
  const [sortOrder, setSortOrder] = useState("desc"); // desc | asc
  const [expandedId, setExpandedId] = useState(null); // expand order details
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // subscribe to firestore orders (real-time)
  useEffect(() => {
    const q = query(collection(db, "storesorders"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders
      (snapshot.docs.map((d) => ({ 
        firestoreId: d.id, 
        ...d.data(),
       }))
      );
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // optimistic local update helper
  const updateLocalOrderField = (firestoreId, field, value) => {
  setOrders((prev) =>
    prev.map((o) =>
      o.firestoreId === firestoreId
        ? { ...o, [field]: value }
        : o
    )
  );
};

  // persist clientName on blur
  const handleClientNameBlur = async (firestoreId, value) => {
  try {
    await updateDoc(
      doc(db, "storesorders", firestoreId),
      {
        clientName: value,
      }
    );
  } catch (err) {
    console.error(err);
  }
};

  // change payment status
  const handlePaymentStatusChange = async (firestoreId, isPaid) => {
    try {
      await updateDoc(
        doc(db, "storesorders", firestoreId),
        {
          paymentStatus: isPaid,
        }
      );
    } catch (err) {
      console.error("Failed to update payment status:", err);
    }
  };


  // search + filter + sort
  const processedOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    let filtered = orders.filter((o) => {
      const status = o.paymentStatus === true;

      if (filter === "paid" && !status) return false;
      if (filter === "unpaid" && status) return false;
      return true;
    });

    if (q) {
      filtered = filtered.filter((o) => {
        const inId = (o.id || "").toLowerCase().includes(q);
        const inClient = (o.clientName || "").toLowerCase().includes(q);
        const inLocation = (o.location || "").toLowerCase().includes(q);
        const inPayment = ((o.paymentStatus || o.paid || "") + "").toLowerCase().includes(q);
        const inItems =
          Array.isArray(o.items) && o.items.some((it) => (it.name || "").toLowerCase().includes(q));

        return inId || inClient || inLocation || inPayment || inItems;
      });
    }

    // sort by date
    filtered.sort((a, b) => {
      const da = a.date?.seconds ? a.date.seconds * 1000 : new Date(a.date || 0).getTime();
      const dbt = b.date?.seconds ? b.date.seconds * 1000 : new Date(b.date || 0).getTime();
      return sortOrder === "desc" ? dbt - da : da - dbt;
    });

    return filtered;
  }, [orders, search, filter, sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className={`${quick.className} text-3xl mb-4`}>All Orders</h1>
        <p className="text-gray-500">No orders have been placed yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

  {/* ================= HEADER ================= */}

  <div className="bg-white border-b sticky top-0 z-20">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className={`${quick.className} text-2xl md:text-3xl text-[#1C4672]`}>
            Orders Management
          </h1>

          <p className="text-gray-500 mt-1 text-sm md:text-base">
            View and manage all customer orders.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">

          <div className="bg-white border rounded-xl px-4 py-3 shadow-sm text-center">
            <p className="text-xs uppercase text-gray-500">
              Orders
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-[#1C4672]">
              {processedOrders.length}
            </h2>
          </div>

          <div className="bg-white border rounded-xl px-4 py-3 shadow-sm text-center">
            <p className="text-xs uppercase text-gray-500">
              Revenue
            </p>

            <h2 className="text-lg md:text-xl font-bold text-green-600">
              ₦
              {processedOrders
                .reduce((sum, o) => sum + Number(o.total || 0), 0)
                .toLocaleString()}
            </h2>
          </div>

        </div>

      </div>

    </div>
  </div>

  {/* ================= SEARCH ================= */}

  <div className="max-w-7xl mx-auto px-4 md:px-6 mt-5 md:mt-6">

    <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-5">

      <div className="flex flex-col md:flex-row gap-3">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order ID, customer..."
            className="w-full h-12 rounded-xl border pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#1C4672]"
          />

        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-12 rounded-xl border px-4 md:w-44"
        >
          <option value="all">All Orders</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="h-12 rounded-xl border px-4 md:w-40"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>

      </div>

    </div>

    {/* ================= MOBILE CARDS ================= */}

    <div className="md:hidden mt-6 space-y-4">

      <AnimatePresence>

        {processedOrders.map((order) => {

          const paymentStatus = order.paymentStatus === true;

          return (

            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-2xl border shadow-sm p-5"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="font-bold text-lg">
                    #{order.id}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {formatDate(order.date)}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    paymentStatus
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {paymentStatus ? "PAID" : "UNPAID"}
                </span>

              </div>

              <div className="mt-4 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Customer</span>
                  <span>{order.clientName || "Not Assigned"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span>{order.location}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold">
                    ₦{Number(order.total).toLocaleString()}
                  </span>
                </div>

              </div>

              <button
                onClick={() => {
                  setSelectedOrder(order);
                  setDrawerOpen(true);
                }}
                className="mt-5 w-full h-11 rounded-xl bg-[#1C4672] text-white font-semibold hover:bg-[#16395d]"
              >
                View Order
              </button>

            </motion.div>

          );

        })}

      </AnimatePresence>

    </div>

    {/* ================= DESKTOP TABLE ================= */}

    <div className="hidden md:block bg-white rounded-2xl shadow border border-gray-100 mt-6 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gray-50 border-b">

            <tr>

              <th className="px-6 py-4 text-left font-semibold">
                Order ID
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Date
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Location
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Total
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Payment
              </th>

              <th className="px-6 py-4 text-right"></th>

            </tr>

          </thead>

          <tbody>

            <AnimatePresence>

              {processedOrders.map((order) => {

                const paymentStatus = order.paymentStatus === true;

                return (

                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-6 py-5 font-semibold">
                      #{order.id}
                    </td>

                    <td className="px-6 py-5">
                      {formatDate(order.date)}
                    </td>

                    <td className="px-6 py-5">
                      {order.clientName || "Not Assigned"}
                    </td>

                    <td className="px-6 py-5">
                      {order.location}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      ₦{Number(order.total).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          paymentStatus
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {paymentStatus ? "PAID" : "UNPAID"}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-right">

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setDrawerOpen(true);
                        }}
                        className="p-2 rounded-lg hover:bg-gray-100"
                      >
                        <MoreVertical size={18} />
                      </button>

                    </td>

                  </motion.tr>

                );

              })}

            </AnimatePresence>

          </tbody>

        </table>

      </div>

    </div>

  </div>

        <AnimatePresence>
          {drawerOpen && selectedOrder && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ type: "spring", damping: 28 }}
                className="fixed right-0 top-0 h-screen w-full md:w-[430px] bg-white shadow-2xl z-50 overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{selectedOrder.id}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {formatDate(selectedOrder.date)}
                    </p>
                  </div>

                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-6">

                  {/* Customer */}
                  <div>
                    <h3 className="font-semibold mb-3">Customer</h3>

                    <input
                      type="text"
                      value={selectedOrder.clientName ?? ""}
                      onChange={(e) => {
                        updateLocalOrderField(
                          selectedOrder.firestoreId,
                          "clientName",
                          e.target.value
                        );

                        setSelectedOrder({
                          ...selectedOrder,
                          clientName: e.target.value,
                        });
                      }}
                      onBlur={(e) =>
                        handleClientNameBlur(
                          selectedOrder.firestoreId,
                          e.target.value
                        )
                      }
                      placeholder="Client Name"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* Payment */}
                  <div>
                    <h3 className="font-semibold mb-3">
                      Payment Status
                    </h3>

                    <select
                      value={selectedOrder.paymentStatus ? "paid" : "unpaid"}
                      onChange={(e) => {
                        const isPaid = e.target.value === "paid";

                        // Update the table
                        updateLocalOrderField(selectedOrder.firestoreId, "paymentStatus", isPaid);

                        // Update the drawer immediately
                        setSelectedOrder((prev) => ({
                          ...prev,
                          paymentStatus: isPaid,
                        }));

                        // Save to Firestore
                        handlePaymentStatusChange(selectedOrder.firestoreId, isPaid);
                      }}
                      className="w-full mt-1 border rounded px-3 py-2"
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  {/* Information */}
                  <div className="space-y-3 rounded-2xl bg-gray-50 p-5">

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Total
                      </span>

                      <span className="font-bold">
                        ₦{Number(selectedOrder.total).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Location
                      </span>

                      <span>{selectedOrder.location}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Payment
                      </span>

                      <span>{selectedOrder.payment}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Delivery
                      </span>

                      <span className="text-right">
                        {selectedOrder.time
                          ? new Date(selectedOrder.time).toLocaleString()
                          : "--"}
                      </span>
                    </div>

                  </div>

                  {/* Items */}
                  <div>

                    <h3 className="font-semibold mb-4">
                      Ordered Items
                    </h3>

                    <div className="space-y-3">

                      {selectedOrder.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between border rounded-xl p-4"
                        >
                          <div>

                            <p className="font-medium">
                              {item.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              Qty {item.qty}
                            </p>

                          </div>

                          <div className="font-semibold">
                            ₦
                            {(
                              Number(item.price) *
                              item.qty
                            ).toLocaleString()}
                          </div>

                        </div>
                      ))}

                    </div>

                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

  </div>
  );
}