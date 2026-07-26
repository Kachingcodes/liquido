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
    <div className=" bg-gray-50">

        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1C4672]">
                        Delivery Fees
                        </h1>

                        <p className="text-sm md:text-base text-gray-500 mt-1">
                        Manage delivery locations and their fees.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                        <div className="bg-white border rounded-xl px-4 py-3 shadow-sm text-center">
                            <p className="text-xs uppercase text-gray-500">
                                Locations
                            </p>

                            <h2 className="text-xl md:text-2xl font-bold text-[#1C4672]">
                                {deliveryFees.length}
                            </h2>
                        </div>

                        <button
                        onClick={openAddDrawer}
                        className="bg-[#1C4672] hover:bg-[#16395d] text-white px-5 py-3 rounded-xl font-semibold transition"
                        >
                        + Add Location
                        </button>

                    </div>

                </div>

            </div>
        </div>

        {/* Search */}

        <div className="max-w-7xl mx-auto px-6 mt-6">

            <div className="bg-white rounded-2xl border shadow-sm p-5">

                <div className="relative">

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search delivery location..."
                        className="w-full h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1C4672]"
                    />

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                </div>

            </div>

            {/* Table */}

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mt-6">

                <div className="overflow-x-auto">

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

                                <td className="px-6 py-5">
                                    <div className="flex justify-end">
                                        <button
                                        onClick={() => openEditDrawer(item)}
                                        className="h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center"
                                        >
                                        <MoreVertical size={18} />
                                        </button>
                                    </div>
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

            </div>
        </div>

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
                    initial={{ x: 450 }}
                    animate={{ x: 0 }}
                    exit={{ x: 450 }}
                    transition={{ type: "spring", damping: 26 }}
                    className="fixed right-0 top-0 h-screen w-full md:w-[420px] bg-white shadow-2xl z-50 overflow-y-auto"
                >
                    <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between">
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

                    <div className="p-6 space-y-5">

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
                        className="w-full border rounded-xl px-4 py-3"
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
                        className="w-full border rounded-xl px-4 py-3"
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
                            className={`flex-1 py-3 ${
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
                            className={`flex-1 py-3 ${
                            !form.active
                                ? "bg-red-600 text-white"
                                : "bg-white"
                            }`}
                        >
                            Inactive
                        </button>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4">

                        <button
                        onClick={handleSave}
                        className="w-full h-12 rounded-xl bg-[#1C4672] text-white font-semibold"
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

                    </div>
                </motion.div>
                </>
            )}
        </AnimatePresence>

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
                    initial={{ opacity: 0, scale: .9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: .9 }}
                    className="fixed left-1/2 top-1/2 z-[61] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl"
                >
                    <div className="p-7">

                    <h2 className="text-xl font-bold">
                        Delete Delivery Location?
                    </h2>

                    <p className="text-gray-500 mt-3">
                        This will permanently remove
                        <span className="font-semibold">
                        {" "}
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