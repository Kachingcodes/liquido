"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, addDoc, updateDoc, 
    deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { Search, MoreVertical, X } from "lucide-react";


export default function DeliveryFees() {

const [deliveryFees, setDeliveryFees] = useState([]);
const [search, setSearch] = useState("");
const [drawerOpen, setDrawerOpen] = useState(false);
const [editingFee, setEditingFee] = useState(null);
const [deleteModal, setDeleteModal] = useState(false);

const [form, setForm] = useState({
  name: "",
  fees: "",
  active: true,
});

useEffect(() => {
  const q = query(collection(db, "deliveryFees"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setDeliveryFees(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });

  return () => unsubscribe();
}, []);

const filteredFees = useMemo(() => {
  return deliveryFees.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );
}, [deliveryFees, search]);

const openAddDrawer = () => {
  setEditingFee(null);

  setForm({
    name: "",
    fees: "",
    active: true,
  });

  setDrawerOpen(true);
};

const openEditDrawer = (fees) => {
  setEditingFee(fees);

  setForm({
    name: fees.name || "",
    fees: fees.fees || "",
    active: fees.active ?? true,
  });

  setDrawerOpen(true);
};

const handleSave = async () => {
  try {
    if (editingFee) {
      await updateDoc(doc(db, "deliveryFees", editingFee.id), {
        name: form.name,
        fees: Number(form.fees),
        active: form.active,
      });
    } else {
      await addDoc(collection(db, "deliveryFees"), {
        name: form.name,
        fees: Number(form.fees),
        active: form.active,
      });
    }

    setDrawerOpen(false);
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "deliveryFees", id));
  } catch (err) {
    console.error(err);
  }
};


return (
   <div className="min-h-screen bg-gray-50">

  {/* Header */}

  <div className="bg-white border-b sticky top-0 z-20">

    <div className="max-w-7xl mx-auto px-2 md:px-6 py-4 md:py-5">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-xl md:text-2xl font-bold text-[#1C4672]">
            Delivery Fees
          </h1>

          <p className="text-sm md:text-md text-gray-500 mt-1">
            Manage delivery locations and their fees.
          </p>

        </div>

        <div className="flex gap-3 w-full lg:w-auto">

          <div className="flex-1 bg-white border rounded-xl px-3 py-2 shadow-sm text-center">

            <p className="text-xs uppercase text-gray-500">
              Locations
            </p>

            <h2 className="text-lg md:text-xl font-bold text-[#1C4672]">
              {deliveryFees.length}
            </h2>

          </div>

          <button
            onClick={openAddDrawer}
            className="flex-1 bg-[#1C4672] hover:bg-[#16395d] text-white rounded-xl transition px-3 py-2"
          >
            + Add Location
          </button>

        </div>

      </div>

    </div>

  </div>

  {/* Search */}

  <div className="max-w-7xl mx-auto px-2 md:px-6 mt-4 md:mt-6">

    <div className="bg-white">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search delivery location..."
          className="w-full h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1C4672]"
        />

      </div>

    </div>

    {/* Desktop Table */}

    <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden mt-6">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="border-b">

            <th className="text-left px-6 py-4 font-semibold">
              Location
            </th>

            <th className="text-left px-6 py-4 font-semibold">
              Delivery Fee
            </th>

            <th className="text-left px-6 py-4 font-semibold">
              Status
            </th>

            <th className="text-right px-6 py-4 font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredFees.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-gray-50 transition"
            >

              <td className="px-6 py-5 font-medium">
                {item.name}
              </td>

              <td className="px-6 py-5">
                ₦{Number(item.fees).toLocaleString()}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.active ? "Active" : "Inactive"}
                </span>

              </td>

              <td className="px-6 py-5 text-right">

                <button
                  onClick={() => openEditDrawer(item)}
                  className="h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center ml-auto"
                >
                  <MoreVertical size={18}/>
                </button>

              </td>

            </tr>

          ))}

          {filteredFees.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="text-center py-10 text-gray-500"
              >
                No delivery locations found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

    {/* Mobile Cards */}

    <div className="md:hidden space-y-4 mt-6">

      {filteredFees.map((item) => (

        <div
          key={item.id}
          className="bg-white rounded-2xl border p-4 shadow-sm"
        >

          <div className="flex justify-between items-start">

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Delivery Fee
              </p>

              <p className="text-lg font-semibold text-[#1C4672]">
                ₦{Number(item.fees).toLocaleString()}
              </p>

              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.active ? "Active" : "Inactive"}
              </span>

            </div>

            <button
              onClick={() => openEditDrawer(item)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical size={18}/>
            </button>

          </div>

        </div>

      ))}

      {filteredFees.length === 0 && (

        <div className="bg-white rounded-2xl border py-10 text-center text-gray-500">
          No delivery locations found.
        </div>

      )}

    </div>

  </div>

  {/* ADD / EDIT DRAWER */}
    <AnimatePresence>
    {drawerOpen && (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
        />

        <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28 }}
            className="
            fixed z-50 bg-white shadow-2xl overflow-y-auto
            inset-x-0 bottom-0 h-[92vh] rounded-t-3xl
            md:inset-y-0 md:right-0 md:left-auto md:h-screen
            md:w-[430px] md:rounded-none scrollbar-hide
            "
        >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-5 md:px-6 py-5 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold text-[#1C4672]">
                {editingFee ? "Edit Delivery Fee" : "Add Delivery Fee"}
                </h2>

                <p className="text-sm text-gray-500">
                Manage delivery locations.
                </p>
            </div>

            <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
            >
                <X size={20} />
            </button>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 space-y-5 pb-12 md:pb-24">

            <div>
                <label className="block mb-2 font-medium">
                Location
                </label>

                <input
                value={form.name}
                onChange={(e) =>
                    setForm({
                    ...form,
                    name: e.target.value,
                    })
                }
                className="w-full border rounded-xl px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                Delivery Fee
                </label>

                <input
                type="number"
                value={form.fees}
                onChange={(e) =>
                    setForm({
                    ...form,
                    fees: e.target.value,
                    })
                }
                className="w-full border rounded-xl px-4 py-2"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                Status
                </label>

                <div className="flex rounded-xl border overflow-hidden">
                <button
                    type="button"
                    onClick={() =>
                    setForm({
                        ...form,
                        active: true,
                    })
                    }
                    className={`flex-1 py-2 transition ${
                    form.active
                        ? "bg-green-600 text-white"
                        : "bg-white"
                    }`}
                >
                    Active
                </button>

                <button
                    type="button"
                    onClick={() =>
                    setForm({
                        ...form,
                        active: false,
                    })
                    }
                    className={`flex-1 py-2 transition ${
                    !form.active
                        ? "bg-red-600 text-white"
                        : "bg-white"
                    }`}
                >
                    Inactive
                </button>
                </div>
            </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t p-5 space-y-3">

            <button
                onClick={handleSave}
                className="w-full h-12 rounded-xl bg-[#1C4672] text-white font-semibold hover:bg-[#16395d]"
            >
                {editingFee ? "Save Changes" : "Add Location"}
            </button>

            {editingFee && (
                <button
                onClick={() => setDeleteModal(true)}
                className="w-full h-12 rounded-xl border border-red-300 text-red-600 hover:bg-red-50"
                >
                Delete Location
                </button>
            )}

            </div>
        </motion.div>
        </>
    )}
    </AnimatePresence>

    {/* DELETE MODAL */}
    <AnimatePresence>
    {deleteModal && (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]"
            onClick={() => setDeleteModal(false)}
        />

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 z-[61] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
        >
            <div className="p-6 md:p-7">

            <h2 className="text-xl md:text-2xl font-bold">
                Delete Delivery Location?
            </h2>

            <p className="text-gray-500 mt-3">
                This will permanently remove{" "}
                <span className="font-semibold">
                {editingFee?.name}
                </span>.
            </p>

            <p className="text-red-500 text-sm mt-2">
                This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-8">

                <button
                onClick={() => setDeleteModal(false)}
                className="flex-1 h-11 rounded-xl border"
                >
                Cancel
                </button>

                <button
                onClick={async () => {
                    await handleDelete(editingFee.id);
                    setDeleteModal(false);
                    setDrawerOpen(false);
                }}
                className="flex-1 h-11 rounded-xl bg-red-600 text-white hover:bg-red-700"
                >
                Delete
                </button>

            </div>

            </div>
        </motion.div>
        </>
    )}
    </AnimatePresence>
  </div>

);
}