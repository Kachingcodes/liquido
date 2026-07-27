'use client';

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; 
import { collection, onSnapshot, doc, updateDoc, deleteDoc, orderBy, query } from "firebase/firestore";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import DeleteConfirm from "./deleteconfirm";

export default function BulkOrdersPage() {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState({ open: false, orderId: null });

  // Fetch Bulk Orders
  useEffect(() => {
    const q = query(collection(db, "bulkOrders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBulkOrders(list);
    });

    return () => unsubscribe();
  }, []);

  // Filter Logic
  const filteredOrders = bulkOrders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "paid") return order.paid === true;
    if (filter === "unpaid") return order.paid === false;
  });

  // Update Paid Status
  const togglePaid = async (id, value) => {
    setBulkOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, paid: value } : order
      )
    );

    await updateDoc(doc(db, "bulkOrders", id), { paid: value });
  };

  // Update Price
  const updatePrice = async (id, value) => {
    setBulkOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, price: value } : order
      )
    );

    await updateDoc(doc(db, "bulkOrders", id), { price: value });
  };

  // Delete Order
  const confirmDelete = async (id) => {
    await deleteDoc(doc(db, "bulkOrders", id));
    setDeleteModal({ open: false, orderId: null });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1C4672]">
              Bulk Orders
            </h1>

            <p className="text-gray-500 mt-1">
              Manage customer bulk orders.
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`h-11 rounded-xl font-medium transition ${
                filter === "all"
                  ? "bg-[#1C4672] text-white"
                  : "bg-white border"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("paid")}
              className={`h-11 rounded-xl font-medium transition ${
                filter === "paid"
                  ? "bg-green-600 text-white"
                  : "bg-white border"
              }`}
            >
              Paid
            </button>

            <button
              onClick={() => setFilter("unpaid")}
              className={`h-11 rounded-xl font-medium transition ${
                filter === "unpaid"
                  ? "bg-red-600 text-white"
                  : "bg-white border"
              }`}
            >
              Unpaid
            </button>
          </div>
        </div>

        {/* ================= MOBILE ================= */}

        <div className="md:hidden space-y-4">

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-2xl border py-12 text-center text-gray-500">
              No bulk orders found.
            </div>
          )}

          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border shadow-sm p-4"
            >

              <div className="flex items-start justify-between">

                <div>
                  <h2 className="font-bold text-lg">
                    {order.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {order.eventType}
                  </p>
                </div>

                {order.paid ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    Paid
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                    Unpaid
                  </span>
                )}

              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

                <div>
                  <p className="text-gray-500">
                    Event Date
                  </p>

                  <p className="font-medium">
                    {order.eventDate}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Location
                  </p>

                  <p className="font-medium">
                    {order.location}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500">
                    Drinks
                  </p>

                  <p className="font-medium whitespace-pre-wrap">
                    {order.drinks}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Chilled
                  </p>

                  <p className="font-medium">
                    {order.chilledDrinks ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">
                    Price
                  </p>

                  <input
                    type="number"
                    value={order.price || ""}
                    onChange={(e) =>
                      updatePrice(order.id, Number(e.target.value))
                    }
                    placeholder="₦"
                    className="w-full border rounded-xl px-3 py-2"
                  />
                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    togglePaid(order.id, !order.paid)
                  }
                  className={`flex-1 h-11 rounded-xl font-medium ${
                    order.paid
                      ? "bg-green-600 text-white"
                      : "border"
                  }`}
                >
                  {order.paid ? "Paid" : "Mark Paid"}
                </button>

                <button
                  onClick={() =>
                    setDeleteModal({
                      open: true,
                      orderId: order.id,
                    })
                  }
                  className="w-12 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* ================= DESKTOP TABLE ================= */}

        <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-4 text-left">Client</th>
                  <th className="px-5 py-4 text-left">Event Type</th>
                  <th className="px-5 py-4 text-left">Event Date</th>
                  <th className="px-5 py-4 text-left">Location</th>
                  <th className="px-5 py-4 text-left">Drinks</th>
                  <th className="px-5 py-4 text-left">Chilled</th>
                  <th className="px-5 py-4 text-center">
                    Price
                  </th>
                  <th className="px-5 py-4 text-center">
                    Paid
                  </th>
                  <th className="px-5 py-4 text-center">
                    Delete
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-10 text-gray-500"
                    >
                      No bulk orders found.
                    </td>
                  </tr>
                )}

                {filteredOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-5 py-4 font-medium">
                      {order.name}
                    </td>

                    <td className="px-5 py-4">
                      {order.eventType}
                    </td>

                    <td className="px-5 py-4">
                      {order.eventDate}
                    </td>

                    <td className="px-5 py-4">
                      {order.location}
                    </td>

                    <td className="px-5 py-4 whitespace-pre-wrap">
                      {order.drinks}
                    </td>

                    <td className="px-5 py-4">
                      {order.chilledDrinks ? "Yes" : "No"}
                    </td>

                    <td className="px-5 py-4 text-center">

                      <input
                        type="number"
                        value={order.price || ""}
                        onChange={(e) =>
                          updatePrice(order.id, Number(e.target.value))
                        }
                        className="w-24 border rounded-lg p-2 text-center"
                      />

                    </td>

                    <td className="px-5 py-4 text-center">

                      <button
                        onClick={() =>
                          togglePaid(order.id, !order.paid)
                        }
                      >
                        {order.paid ? (
                          <CheckCircle
                            size={22}
                            className="text-green-600 mx-auto"
                          />
                        ) : (
                          <Circle
                            size={22}
                            className="text-gray-400 mx-auto"
                          />
                        )}
                      </button>

                    </td>

                    <td className="px-5 py-4 text-center">

                      <button
                        onClick={() =>
                          setDeleteModal({
                            open: true,
                            orderId: order.id,
                          })
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <DeleteConfirm
          open={deleteModal.open}
          onClose={() =>
            setDeleteModal({
              open: false,
              orderId: null,
            })
          }
          onConfirm={() =>
            confirmDelete(deleteModal.orderId)
          }
        />

      </div>
    </div>
  );
}