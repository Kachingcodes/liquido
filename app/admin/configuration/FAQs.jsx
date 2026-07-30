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
        <div className="max-w-7xl mx-auto px-2 md:px-6 py-4 md:py-5">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1C4672]">
                FAQs
              </h1>

              <p className="text-sm md:text-base text-gray-500 mt-1">
                Manage frequently asked questions shown across the website.
              </p>
            </div>

            <div className="flex flex-row gap-3 w-full md:w-auto">

              <div className="flex-1 bg-white border rounded-xl px-5 py-3 shadow-sm text-center">
                <p className="text-xs uppercase text-gray-500">
                  FAQs
                </p>

                <h2 className="text-xl md:text-2xl font-bold text-[#1C4672]">
                  {faqs.length}
                </h2>
              </div>

              <button
                onClick={openAddDrawer}
                className="flex-1 md:flex-none bg-[#1C4672] hover:bg-[#16395d] text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                + Add FAQ
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
              placeholder="Search FAQs..."
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

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4 mt-6">

          {filteredFaqs.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl border p-4 shadow-sm"
            >

              <div className="flex justify-between items-start gap-3">

                <div className="flex-1 min-w-0">

                  <h3 className="font-semibold text-lg break-words">
                    {item.question}
                  </h3>

                  <p className="text-sm text-gray-500 mt-3 break-words">
                    {item.answer}
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
                  className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
                >
                  <MoreVertical size={18} />
                </button>

              </div>

            </div>

          ))}

          {filteredFaqs.length === 0 && (

            <div className="bg-white rounded-2xl border py-10 text-center text-gray-500">
              No FAQs found.
            </div>

          )}

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
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
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

              <div className="sticky top-0 z-10 flex items-start justify-between border-b bg-white px-5 md:px-7 py-5">

                <div>

                  <h2 className="text-2xl font-bold text-[#1C4672]">
                    {editingFaq ? "Edit FAQ" : "Add FAQ"}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Questions displayed across the website.
                  </p>

                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20}/>
                </button>

              </div>

              {/* Scrollable Body */}

              <div className="overflow-y-auto flex-1 no-scrollbar">

                <div className="p-5 md:p-7 space-y-6">

                  {/* Question */}

                  <div>

                    <label className="block font-semibold mb-2">
                      Question
                    </label>

                    <input
                      value={form.question}
                      onChange={(e)=>
                        setForm({
                          ...form,
                          question:e.target.value
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
                      onChange={(e)=>
                        setForm({
                          ...form,
                          answer:e.target.value
                        })
                      }
                      placeholder="Enter FAQ Answer"
                      className="w-full rounded-xl border px-4 py-2 resize-none"
                    />

                  </div>

                  {/* Active */}

                  <div className="flex items-center justify-between rounded-xl border p-4">

                    <div>

                      <h3 className="font-semibold">
                        Active
                      </h3>

                      <p className="text-sm text-gray-500">
                        Display this FAQ on the website.
                      </p>

                    </div>

                    <button
                      onClick={()=>
                        setForm({
                          ...form,
                          active:!form.active
                        })
                      }
                      className={`w-12 h-6 rounded-full transition relative ${
                        form.active
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >

                      <div
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                          form.active
                            ? "left-7"
                            : "left-1"
                        }`}
                      />

                    </button>

                  </div>

                </div>

              </div>

              {/* Footer */}

              <div className="sticky bottom-0 bg-white border-t p-5">

                <div className="flex flex-col-reverse sm:flex-row gap-3">

                  {editingFaq && (

                    <button
                      onClick={()=>setDeleteModal(true)}
                      className="flex-1 h-12 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  )}

                  <button
                    onClick={handleSave}
                    className="flex-1 h-12 py-2 rounded-xl bg-[#1C4672] text-white hover:bg-[#16395d]"
                  >
                    {editingFaq
                      ? "Save Changes"
                      : "Add FAQ"}
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