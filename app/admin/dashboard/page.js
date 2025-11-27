"use client";
import React, { useEffect, useMemo, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Quicksand } from "next/font/google";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { BsSun, BsMoon } from "react-icons/bs";

const quick = Quicksand({ subsets: ["latin"], weight: ["700"] });
const COLORS = ["#4caf50", "#f44336", "#2196f3"]; // green, red, blue for payment methods

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // -------------------- FIREBASE LIVE UPDATE --------------------
  useEffect(() => {
    const q = query(collection(db, "storesorders"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -------------------- FILTER BY DATE RANGE --------------------
  const filteredOrders = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return orders;
    const fromDate = new Date(dateRange.from).getTime();
    const toDate = new Date(dateRange.to).getTime();
    return orders.filter((o) => {
      const orderTime = o.date?.seconds ? o.date.seconds * 1000 : new Date(o.date || 0).getTime();
      return orderTime >= fromDate && orderTime <= toDate;
    });
  }, [orders, dateRange]);

  // -------------------- SUMMARY WIDGETS --------------------
  const totalRevenue = useMemo(() => filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0), [filteredOrders]);
  const totalOrders = filteredOrders.length;

  const paymentMethodCounts = useMemo(() => {
    const counts = { Cash: 0, Transfer: 0, POS: 0 };
    filteredOrders.forEach((o) => {
      const method = o.payment || "Cash";
      counts[method] = (counts[method] || 0) + 1;
    });
    return counts;
  }, [filteredOrders]);

  const mostUsedPayment = useMemo(() => {
    let max = 0, method = "";
    Object.entries(paymentMethodCounts).forEach(([k, v]) => {
      if (v > max) {
        max = v;
        method = k;
      }
    });
    return method;
  }, [paymentMethodCounts]);

  // -------------------- PIE CHART DATA --------------------
  const pieData = useMemo(() => [
    { name: "Cash", value: paymentMethodCounts.Cash },
    { name: "Transfer", value: paymentMethodCounts.Transfer },
    { name: "POS", value: paymentMethodCounts.POS }
  ], [paymentMethodCounts]);

  // -------------------- BAR CHART (Orders per day) --------------------
  const ordersByDay = useMemo(() => {
    const map = {};
    filteredOrders.forEach(o => {
      const day = format(o.date?.seconds ? new Date(o.date.seconds * 1000) : new Date(o.date), "yyyy-MM-dd");
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).map(([day, count]) => ({ day, count })).sort((a,b) => new Date(a.day) - new Date(b.day));
  }, [filteredOrders]);

  // -------------------- MONTHLY REVENUE --------------------
  const monthlyRevenue = useMemo(() => {
    const map = {};
    filteredOrders.forEach(o => {
      const month = format(o.date?.seconds ? new Date(o.date.seconds*1000) : new Date(o.date), "yyyy-MM");
      map[month] = (map[month] || 0) + (o.total || 0);
    });
    return Object.entries(map).map(([month, total]) => ({ month, total })).sort((a,b) => new Date(a.month) - new Date(b.month));
  }, [filteredOrders]);

  // -------------------- ORDERS BY LOCATION --------------------
  const ordersByLocation = useMemo(() => {
    const map = {};
    filteredOrders.forEach(o => {
      const loc = o.location || "Unknown";
      map[loc] = (map[loc] || 0) + 1;
    });
    return Object.entries(map).map(([loc, count]) => ({ loc, count }));
  }, [filteredOrders]);

  // -------------------- ACTIVE ORDERS --------------------
  const activeOrders = useMemo(() => filteredOrders.filter(o => !o.paymentStatus || o.paymentStatus === "unpaid"), [filteredOrders]);

  // -------------------- EXPORT CSV --------------------
  const exportCSV = () => {
    const header = ["Order ID", "Client Name", "Total", "Payment", "Payment Status", "Location", "Date"];
    const rows = filteredOrders.map(o => [
      o.id, o.clientName || "", o.total || 0, o.payment || "", o.paymentStatus || "", o.location || "", o.date?.seconds ? new Date(o.date.seconds*1000).toLocaleString() : ""
    ]);
    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "orders.csv");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading dashboard...</div>;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      {/* DARK MODE TOGGLE */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded bg-gray-300 dark:bg-gray-800">
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>
      </div>

      {/* SUMMARY WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <div className="text-sm font-medium">Total Revenue</div>
          <div className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</div>
        </motion.div>
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <div className="text-sm font-medium">Total Orders</div>
          <div className="text-2xl font-bold">{totalOrders}</div>
        </motion.div>
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <div className="text-sm font-medium">Most Used Payment</div>
          <div className="text-2xl font-bold">{mostUsedPayment}</div>
        </motion.div>
      </div>

      {/* FILTER + EXPORT */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 items-center">
          <label>From:</label>
          <input type="date" className="border rounded px-2 py-1" value={dateRange.from} onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}/>
          <label>To:</label>
          <input type="date" className="border rounded px-2 py-1" value={dateRange.to} onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}/>
        </div>
        <button onClick={exportCSV} className="px-4 py-2 bg-green-600 text-white rounded">Export CSV</button>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart - Payment Methods */}
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <h3 className="font-semibold mb-2">Orders by Payment Method</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart - Orders per Day */}
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <h3 className="font-semibold mb-2">Daily Order Volume</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersByDay}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Revenue + Orders by Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <h3 className="font-semibold mb-2">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
          <h3 className="font-semibold mb-2">Orders by Location</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersByLocation}>
              <XAxis dataKey="loc" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Active Orders List */}
      <motion.div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow" layout>
        <h3 className="font-semibold mb-2">Active Orders (Unpaid / In Progress)</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {activeOrders.map(o => (
            <motion.div key={o.id} className="flex justify-between border-b py-1 px-2" layout>
              <span>{o.clientName || "Unknown Client"}</span>
              <span>₦{(o.total || 0).toLocaleString()}</span>
              <span className={`px-2 py-0.5 rounded text-sm font-semibold ${o.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {o.paymentStatus || "unpaid"}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}