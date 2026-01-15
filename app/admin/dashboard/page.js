"use client";
import React, { useEffect, useMemo, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import { Quicksand } from "next/font/google";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import ProtectedRoute from '../ProtectedRoute';



const quick = Quicksand({ subsets: ["latin"], weight: ["700"] });

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
);

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const adminEmail = typeof window !== "undefined" ? localStorage.getItem("adminEmail") : "";

  useEffect(() => {
    const q = query(collection(db, "storesorders"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return orders;
    const fromDate = new Date(dateRange.from).getTime();
    const toDate = new Date(dateRange.to).getTime();
    return orders.filter((o) => {
      const orderTime = o.date?.seconds ? o.date.seconds * 1000 : new Date(o.date || 0).getTime();
      return orderTime >= fromDate && orderTime <= toDate;
    });
  }, [orders, dateRange]);

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

const doughnutData = useMemo(() => ({
  labels: ["Cash", "Transfer", "POS"],
  datasets: [{
    data: [paymentMethodCounts.Cash, paymentMethodCounts.Transfer, paymentMethodCounts.POS],
    backgroundColor: ["#1C4672", "#4C86C4", "#2E6FA3"],
    borderColor: "#ffffff",
    borderWidth: 1,
    hoverOffset: 10,
    borderRadius: 6
  }]
}), [paymentMethodCounts]);

const doughnutOptions = useMemo(() => ({
  cutout: "60%", // hollow effect
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: { color: darkMode ? "#fff" : "#000", font: { size: 10 } }
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function(context) {
          const label = context.label || "";
          const value = context.raw || 0;
          return `${label}: ${value} orders`;
        }
      }
    }
  },
  animation: { animateRotate: true, animateScale: true }
}), [darkMode]);

  // -------------------- DAILY ORDERS --------------------
  const ordersByDay = useMemo(() => {
    const map = {};
    filteredOrders.forEach(o => {
      const day = format(o.date?.seconds ? new Date(o.date.seconds * 1000) : new Date(o.date), "yyyy-MM-dd");
      map[day] = (map[day] || 0) + 1;
    });
    return Object.entries(map).map(([day, count]) => ({ day, count })).sort((a,b) => new Date(a.day) - new Date(b.day));
  }, [filteredOrders]);

  const dailyOrdersData = useMemo(() => ({
    labels: ordersByDay.map(d => d.day),
    datasets: [{
      label: "Orders",
      data: ordersByDay.map(d => d.count),
      backgroundColor: "#1C4672"
    }]
  }), [ordersByDay]);

  // -------------------- MONTHLY REVENUE BY LOCATION --------------------
  const monthlyRevenueByLocation = useMemo(() => {
    const map = {};
    filteredOrders.forEach(o => {
      const month = format(o.date?.seconds ? new Date(o.date.seconds*1000) : new Date(o.date), "yyyy-MM");
      if (!map[month]) map[month] = {};
      const loc = o.location || "Unknown";
      map[month][loc] = (map[month][loc] || 0) + (o.total || 0);
    });
    const months = Object.keys(map).sort((a,b) => new Date(a) - new Date(b));
    const locations = [...new Set(filteredOrders.map(o => o.location || "Unknown"))];
    const datasets = locations.map((loc, i) => ({
      label: loc,
      data: months.map(m => map[m][loc] || 0),
      backgroundColor: ["#1C4672","#4C86C4","#2E6FA3","#6FA8DC"][i % 4]
    }));
    return { labels: months, datasets };
  }, [filteredOrders]);

  const activeOrders = useMemo(() => filteredOrders.filter(o => !o.paymentStatus || o.paymentStatus === "unpaid"), [filteredOrders]);

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
    <ProtectedRoute>
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen p-0 md:p-2 w-full text-black dark:text-white">

        <header className="sticky top-0 z-50 bg-gray-100 dark:bg-neutral-900 w-full flex items-center justify-between p-2 md:p-4">
          <div className="flex flex-col px-8 md:px-0">
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm opacity-70 mt-1">Signed in as {adminEmail}</p>
          </div>
        </header>

        <div className="pt-12 md:pt-12">
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

          {/* Filters */}
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

          {/* Charts Row 1 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-14">
            <motion.div 
              layout
              className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-4"
            >
              <h3 className="md:text-lg text-md font-medium mb-4">Payment Methods</h3>
              
              <div className="w-70 h-70 md:w-100 md:h-100 mx-auto">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </motion.div>

            <motion.div 
              layout
              className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-3 md:p-6"
            >
              <h3 className="md:text-lg text-md font-medium mb-4">Daily Orders</h3>
              <Bar data={dailyOrdersData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </motion.div>
          </section>

          {/* Charts Row 2: Monthly Revenue by Location */}
          <section className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-10 mb-14">
            <motion.div 
              layout
              className="rounded-2xl bg-[#4C86C4]/20 dark:bg-[#1C4672] border border-[#4C86C4] dark:border-[#1C4672] p-6 shadow-sm"
            >
              <h3 className="md:text-lg text-md font-medium mb-4">Monthly Revenue (by Location)</h3>
              <Bar data={monthlyRevenueByLocation} options={{ responsive: true, plugins: { legend: { position: "top" } }, scales: { y: { beginAtZero: true } }, }} />
            </motion.div>
          </section>

          {/* Active Orders */}
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

        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
