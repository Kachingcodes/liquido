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
import { db } from "../../firebase"; // adjust path if necessary
import { motion, AnimatePresence } from "framer-motion";
import { Quicksand } from "next/font/google";
import { Search, CheckCircle, XCircle } from "lucide-react";

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

  // subscribe to firestore orders (real-time)
  useEffect(() => {
    const q = query(collection(db, "storesorders"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // optimistic local update helper
  const updateLocalOrderField = (orderId, field, value) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o)));
  };

  // persist clientName on blur
  const handleClientNameBlur = async (orderId, value) => {
    try {
      await updateDoc(doc(db, "storesorders", orderId), { clientName: value });
    } catch (err) {
      console.error("Failed to update clientName:", err);
      // optionally: revert local state or show inline error
    }
  };

  // change payment status
  const handlePaymentStatusChange = async (orderId, value) => {
    // optimistic UI
    updateLocalOrderField(orderId, "paymentStatus", value);
    try {
      await updateDoc(doc(db, "storesorders", orderId), { paymentStatus: value });
    } catch (err) {
      console.error("Failed to update paymentStatus:", err);
      // optionally: revert local state
    }
  };

  // search + filter + sort
  const processedOrders = useMemo(() => {
    const q = search.trim().toLowerCase();

    let filtered = orders.filter((o) => {
      const status = o.paymentStatus ?? (o.paid ? "paid" : "unpaid");

      if (filter === "paid" && status !== "paid") return false;
      if (filter === "unpaid" && status === "paid") return false;
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
    <div className="min-h-screen p-2 md:p-6 max-w-7xl mx-auto dark:bg-gray-900">

      <div className="fixed left-0 md:hidden text-center bg-gray-100 z-50 top-0 w-full py-3">
        <h1 className={`${quick.className} text-2xl md:text-3xl mt-1`}>Admin — Orders</h1>
      </div>

  <h1 className={`${quick.className} hidden md:flex text-2xl md:text-3xl mb-6 text-left`}>Admin — Orders</h1>

  {/* Controls */}
  <div className="md:mt-0 mt-14 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-6">
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-1/2">
      <div className="relative flex-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID, client, location, payment, or item..."
          className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <div className="flex flex-1 md:flex-none items-center gap-2">
        <label className="text-sm">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-auto border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="paid">Paid only</option>
          <option value="unpaid">Unpaid only</option>
        </select>
      </div>

      <div className="flex flex-1 md:flex-none items-center gap-2">
        <label className="text-sm">Sort:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-auto border rounded px-3 py-2"
        >
          <option value="desc">Newest → Oldest</option>
          <option value="asc">Oldest → Newest</option>
        </select>
      </div>
    </div>
  </div>

  {/* List */}
  <div className="space-y-4">
    <AnimatePresence>
      {processedOrders.map((order) => {
        const paymentStatus = order.paymentStatus ?? (order.paid ? "paid" : "unpaid");
        const isPaid = paymentStatus === "paid";
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            {/* header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <div className="text-sm text-gray-600">Order ID:</div>
                <div className="font-medium">{order.id}</div>
                <div className="text-sm text-gray-500">• {formatDate(order.date)}</div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* badge */}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                    isPaid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {isPaid ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  <span>{isPaid ? "Paid" : "Unpaid"}</span>
                </div>

                {/* total */}
                <div className="text-sm md:text-base font-semibold">
                  ₦{(order.total || 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* main grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* client name */}
              <div>
                <label className="text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  value={order.clientName ?? ""}
                  onChange={(e) => updateLocalOrderField(order.id, "clientName", e.target.value)}
                  onBlur={(e) => handleClientNameBlur(order.id, e.target.value)}
                  placeholder="Enter client's name"
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>

              {/* payment status */}
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                  className="w-full mt-1 border rounded px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* info */}
              <div>
                <label className="text-sm font-medium text-gray-700">Info</label>
                <div className="mt-1 text-sm text-gray-600 space-y-1">
                  <div>
                    <span className="font-medium">Location:</span> {order.location || "—"}
                  </div>
                  <div>
                    <span className="font-medium">Delivery:</span> {order.time ? new Date(order.time).toLocaleString() : "—"}
                  </div>
                  <div>
                    <span className="font-medium">Method:</span> {order.payment || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* items list */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Items</h4>

                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="text-sm text-gray-500 underline"
                >
                  {expandedId === order.id ? "Hide" : "Show"}
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: expandedId === order.id ? 1 : 0, height: expandedId === order.id ? "auto" : 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <ul className="divide-y mt-3">
                  {Array.isArray(order.items) &&
                    order.items.map((it) => (
                      <li key={it.id} className="py-2 flex flex-col sm:flex-row justify-between text-sm gap-1 sm:gap-0">
                        <div className="flex flex-col">
                          <span className="font-medium">{it.name}</span>
                          <span className="text-xs text-gray-500">qty: {it.qty}</span>
                        </div>
                        <div>₦{(it.price * it.qty).toLocaleString()}</div>
                      </li>
                    ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  </div>
</div>

  );
}