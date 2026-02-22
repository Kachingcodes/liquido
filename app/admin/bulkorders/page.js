'use client';

import { useEffect, useState } from "react";
import { db } from "@/app/firebase"; 
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
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6">Bulk Orders</h1>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("paid")}
          className={`px-4 py-1 rounded ${filter === "paid" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Paid
        </button>

        <button
          onClick={() => setFilter("unpaid")}
          className={`px-4 py-1 rounded ${filter === "unpaid" ? "bg-red-600 text-white" : "bg-gray-200"}`}
        >
          Unpaid
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm">
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Event Type</th>
              <th className="p-3 border">Event Date</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Drinks</th>
              <th className="p-3 border">Chilled</th>
              <th className="p-3 border text-center">Price (₦)</th>
              <th className="p-3 border text-center">Paid</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No bulk orders found.
                </td>
              </tr>
            )}

            {filteredOrders.map((order) => (
              <tr key={order.id} className="border text-sm">
                <td className="p-3 border font-medium">{order.name}</td>
                <td className="p-3 border">{order.eventType}</td>
                <td className="p-3 border">{order.eventDate}</td>
                <td className="p-3 border">{order.location}</td>
                <td className="p-3 border whitespace-pre-wrap">{order.drinks}</td>
                <td className="p-3 border">
                  {order.chilledDrinks ? "Yes" : "No"}
                </td>

                {/* Price editable input */}
                <td className="p-3 border text-center">
                  <input
                    type="number"
                    value={order.price || ""}
                    onChange={(e) => updatePrice(order.id, Number(e.target.value))}
                    className="w-20 border rounded p-1 text-center"
                    placeholder="₦"
                  />
                </td>

                {/* PAID CHECKBOX */}
                <td className="p-3 border text-center">
                  <button
                    onClick={() => togglePaid(order.id, !order.paid)}
                    className="mx-auto"
                  >
                    {order.paid ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <Circle className="text-gray-400" size={20} />
                    )}
                  </button>
                </td>

                {/* DELETE BUTTON */}
                <td className="p-3 border text-center">
                  <button
                    onClick={() => setDeleteModal({ open: true, orderId: order.id })}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirm
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, orderId: null })}
        onConfirm={() => confirmDelete(deleteModal.orderId)}
      />
    </div>
  );
}