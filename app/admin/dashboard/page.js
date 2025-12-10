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

  const adminEmail = typeof window !== "undefined" ? localStorage.getItem("adminEmail") : "";

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
    <div className={darkMode ? "dark" : ""}>
  <div className="min-h-screen p-0 md:p-2 w-full text-black dark:text-white">

    {/* ─── TOP BAR ────────────────────────────── */}
    <header className="sticky top-0 z-50 bg-gray-100 dark:bg-neutral-900 w-full flex items-center justify-between p-2 md:p-4">
      <div className="flex flex-col px-8 md:px-0">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm opacity-70 mt-1">Signed in as {adminEmail}</p>
      </div>
    </header>

    {/* Add padding-top to main content to avoid overlap */}
    <div className="pt-12 md:pt-12">

      {/* ─── SUMMARY WIDGETS ──────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-14">
        {[
          { title: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}` },
          { title: "Total Orders", value: totalOrders },
          { title: "Most Used Payment", value: mostUsedPayment }
        ].map((card, i) => (
          <motion.div
            key={i}
            layout
            className="rounded-2xl bg-[#4C86C4]/8 dark:bg-[#1C4672] p-4 md:p-6"
          >
            <div className="text-sm opacity-70 mb-1">{card.title}</div>
            <div className="md:text-3xl text-2xl font-semibold tracking-tight">{card.value}</div>
          </motion.div>
        ))}
      </section>

      {/* ─── FILTERS ─────────────────────────── */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
        <div className="flex items-center gap-6">
          <div>
            <label className="text-xs opacity-70 block mb-1">From</label>
            <input
              type="date"
              className="px-3 py-2 rounded-lg border border-[#4C86C4] dark:border-[#1C4672] 
                         bg-[#4C86C4]/20 dark:bg-[#1C4672] w-40"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs opacity-70 block mb-1">To</label>
            <input
              type="date"
              className="px-3 py-2 rounded-lg border border-[#4C86C4] dark:border-[#1C4672] 
                         bg-[#4C86C4]/20 dark:bg-[#1C4672] w-40"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            />
          </div>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2.5 text-md rounded-lg bg-[#1C4672] text-white dark:bg-[#4C86C4] dark:text-black font-medium shadow hover:opacity-80 transition"
        >
          Export CSV
        </button>
      </section>

      {/* ─── CHARTS ROW 1 ────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-14">
        {/* PIE CHART */}
        <motion.div 
          layout
          className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-6 shadow-sm"
        >
          <h3 className="md:text-lg text-md font-medium mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#1C4672","#4C86C4","#2E6FA3","#6FA8DC"][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* DAILY ORDERS */}
        <motion.div 
          layout
          className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-3 md:p-6"
        >
          <h3 className="md:text-lg text-md font-medium mb-4">Daily Orders</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ordersByDay}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1C4672"/>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* ─── CHARTS ROW 2 ────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-14">
        <motion.div 
          layout
          className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-6 shadow-sm"
        >
          <h3 className="md:text-lg text-md font-medium mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyRevenue}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#1C4672" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          layout
          className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-4 md:p-6 shadow-sm"
        >
          <h3 className="md:text-lg text-md font-medium mb-4">Orders by Location</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ordersByLocation}>
              <XAxis dataKey="loc" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4C86C4" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section>

      {/* ─── ACTIVE ORDERS ────────────────────── */}
      <motion.div 
        layout
        className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-4 md:p-6 shadow-sm"
      >
        <h3 className="md:text-lg text-md font-medium mb-4">Active Orders</h3>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {activeOrders.map(o => (
            <div 
              key={o.id} 
              className="flex justify-between items-center py-2 border-b border-[#4C86C4] dark:border-[#1C4672] last:border-none"
            >
              <span className="opacity-80">{o.clientName || "Unknown Client"}</span>
              <span className="font-semibold">₦{(o.total || 0).toLocaleString()}</span>
              <span 
                className={`px-3 py-1 rounded-lg text-sm ${
                  o.paymentStatus === "paid"
                    ? "bg-[#4C86C4] dark:bg-[#1C4672]"
                    : "bg-[#A6C8E0] dark:bg-[#2E6FA3]"
                }`}
              >
                {o.paymentStatus || "unpaid"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

    </div> {/* pt wrapper */}
  </div>
</div>

  );
}