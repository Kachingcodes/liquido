"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, addDoc,
  updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { Search, MoreVertical, X } from "lucide-react";

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    active: true,
  });

  // ----------------------------
  // Firestore Listener
  // ----------------------------
  useEffect(() => {
    const q = query(collection(db, "faqs"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFaqs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  // ----------------------------
  // Search
  // ----------------------------
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) =>
      item.question?.toLowerCase().includes(search.toLowerCase())
    );
  }, [faqs, search]);

  // ----------------------------
  // Add
  // ----------------------------
  const openAddDrawer = () => {
    setEditingFaq(null);

    setForm({
      question: "",
      answer: "",
      active: true,
    });

    setDrawerOpen(true);
  };

  // ----------------------------
  // Edit
  // ----------------------------
  const openEditDrawer = (faq) => {
    setEditingFaq(faq);

    setForm({
      question: faq.question ?? "",
      answer: faq.answer ?? "",
      active: faq.active ?? true,
    });

    setDrawerOpen(true);
  };

  // ----------------------------
  // Save
  // ----------------------------
  const handleSave = async () => {
    try {
      if (!form.question.trim()) {
        alert("Question is required.");
        return;
      }

      if (!form.answer.trim()) {
        alert("Answer is required.");
        return;
      }

      if (editingFaq) {
        await updateDoc(doc(db, "faqs", editingFaq.id), {
          question: form.question,
          answer: form.answer,
          active: form.active,
        });
      } else {
        await addDoc(collection(db, "faqs"), {
          question: form.question,
          answer: form.answer,
          active: form.active,
        });
      }

      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------
  // Toggle Active
  // ----------------------------
  const toggleStatus = async (faq) => {
    try {
      await updateDoc(doc(db, "faqs", faq.id), {
        active: !faq.active,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------
  // Delete
  // ----------------------------
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "faqs", id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50">

    {/* Header */}
    <div className="bg-white border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1C4672]">
              FAQs
            </h1>

            <p className="text-sm md:text-base text-gray-500 mt-1">
              Manage frequently asked questions shown across the website.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="bg-white border rounded-xl px-5 py-3 shadow-sm text-center">
              <p className="text-xs uppercase text-gray-500">
                FAQs
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-[#1C4672]">
                {faqs.length}
              </h2>
            </div>

            <button
              onClick={openAddDrawer}
              className="bg-[#1C4672] hover:bg-[#16395d] text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              + Add FAQ
            </button>

          </div>

        </div>

      </div>
    </div>

    {/* Search */}

    <div className="max-w-7xl mx-auto px-4 md:px-6 mt-5 md:mt-6">

      <div className="bg-white rounded-2xl border shadow-sm p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1C4672]"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mt-6">

        <div className="overflow-x-auto">

          <table className="min-w-[700px] w-full">

            <thead className="bg-gray-50">

              <tr className="border-b">

                <th className="text-left px-6 py-4 font-semibold">
                  Question
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Answer
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

              {filteredFaqs.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-5 font-medium max-w-sm">
                    {item.question}
                  </td>

                  <td className="px-6 py-5 text-gray-600 max-w-md">
                    <p className="line-clamp-2">
                      {item.answer}
                    </p>
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
                      <MoreVertical size={18} />
                    </button>

                  </td>

                </tr>

              ))}

              {filteredFaqs.length === 0 && (

                <tr>

                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-500"
                  >
                    No FAQs found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

        </div>

        {/* ADD / EDIT FAQ MODAL */}

        <AnimatePresence>
        {drawerOpen && (
            <>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between border-b px-5 md:px-7 py-5">
                  <div>
                      <h2 className="text-2xl font-bold text-[#1C4672]">
                      {editingFaq ? "Edit FAQ" : "Add FAQ"}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                      Questions displayed across the website.
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
                <div className="p-5 md:p-7 space-y-6">

                  {/* Question */}

                  <div>
                    <label className="block font-semibold mb-2">
                    Question
                    </label>

                    <input
                    value={form.question}
                    onChange={(e) =>
                        setForm({
                        ...form,
                        question: e.target.value,
                        })
                    }
                    placeholder="Enter FAQ Question"
                    className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block font-semibold mb-2">
                    Answer
                    </label>

                    <textarea
                    rows={6}
                    value={form.answer}
                    onChange={(e) =>
                        setForm({
                        ...form,
                        answer: e.target.value,
                        })
                    }
                    placeholder="Enter FAQ Answer"
                    className="w-full rounded-xl border px-4 py-3 resize-none"
                    />
                  </div>

                  {/* Active */}
                  <div className="flex items-center justify-between rounded-xl border p-4">

                    <div>

                      <h3 className="font-semibold">
                          Active
                      </h3>

                      <p className="text-sm text-gray-500">
                          Display this FAQ on the website
                      </p>

                    </div>

                    <button
                    onClick={() =>
                        setForm({
                        ...form,
                        active: !form.active,
                        })
                    }
                    className={`w-16 h-9 rounded-full transition relative ${
                        form.active
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                    >
                    <div
                        className={`absolute top-1 h-7 w-7 rounded-full bg-white transition ${
                        form.active
                            ? "left-8"
                            : "left-1"
                        }`}
                    />
                    </button>

                </div>

                {/* Buttons */}

                <div className="flex gap-3 pt-4">

                    {editingFaq && (
                    <button
                        onClick={() => setDeleteModal(true)}
                        className="flex-1 h-12 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                    )}

                    <button
                    onClick={handleSave}
                    className="flex-1 h-12 rounded-xl bg-[#1C4672] text-white hover:bg-[#16395d]"
                    >
                    {editingFaq ? "Save Changes" : "Add FAQ"}
                    </button>

                </div>

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
            />

            <motion.div
                initial={{ opacity: 0, scale: .9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .9 }}
                className="fixed left-1/2 top-1/2 z-[61] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
            >
                <div className="p-5 md:p-7">

                  <h2 className="text-xl md:text-2xl font-bold">
                      Delete FAQ?
                  </h2>

                  <p className="text-gray-500 mt-3">
                      This FAQ will be permanently deleted.
                  </p>

                  <div className="mt-8 flex gap-3">

                    <button
                    onClick={() => setDeleteModal(false)}
                    className="flex-1 h-11 rounded-xl border"
                    >
                    Cancel
                    </button>

                    <button
                    onClick={async () => {
                        await handleDelete(editingFaq.id);

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