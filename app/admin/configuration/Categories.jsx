"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, getDocs,
  addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { Search, MoreVertical, X, Plus,
  Pencil, Trash2 } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [deleteOptionModal, setDeleteOptionModal] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    active: true,
  });

  const [optionForm, setOptionForm] = useState({
    name: "",
    active: true,
  });


  // LOAD OPTIONS

useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "categories"),
    async (snapshot) => {

      const categories = await Promise.all(

        snapshot.docs.map(async (categoryDoc) => {

          const optionsSnapshot = await getDocs(
            collection(
              db,
              "categories",
              categoryDoc.id,
              "options"
            )
          );

          return {
            id: categoryDoc.id,
            ...categoryDoc.data(),

            options: optionsSnapshot.docs.map(option => ({
              id: option.id,
              ...option.data(),
            })),
          };
        })

      );

      setCategories(categories);
    }
  );

  return () => unsubscribe();
}, []);

  
  // SEARCH

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  
  // CATEGORY HELPERS

  const openAddCategory = () => {
    setEditingCategory(null);

    setCategoryForm({
      name: "",
      active: true,
    });

    setCategoryModalOpen(true);
  };

  const openEditCategory = (category) => {
    setEditingCategory(category);

    setCategoryForm({
      name: category.name ?? "",
      active: category.active ?? true,
    });

    setCategoryModalOpen(true);
  };

  const saveCategory = async () => {
    if (!categoryForm.name.trim()) {
      alert("Category name is required.");
      return;
    }

    try {
      if (editingCategory) {
        await updateDoc(doc(db, "categories", editingCategory.id), {
          name: categoryForm.name.trim(),
          active: categoryForm.active,
        });
      } else {
        await updateDoc(
        doc(
            db,
            "categories",
            editingCategory.id,
            "options",
            editingOption.id
        ),
        {
            name: optionForm.name.trim(),
            active: optionForm.active,
        }
        );
      }

      setCategoryModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async () => {
    if (!editingCategory) return;

    try {
      await deleteDoc(doc(db, "categories", editingCategory.id));

      setDeleteCategoryModal(false);
      setCategoryModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  
  // OPTION HELPERS

  const openAddOption = () => {
    if (!editingCategory) return;

    setEditingOption(null);

    setOptionForm({
      name: "",
      active: true,
    });

    setOptionModalOpen(true);
  };

  const openEditOption = (option) => {
    setEditingOption(option);

    setOptionForm({
      name: option.name ?? "",
      active: option.active ?? true,
    });

    setOptionModalOpen(true);
  };

  const saveOption = async () => {
  if (!optionForm.name.trim()) {
    alert("Option name is required.");
    return;
  }

  try {
    if (editingOption) {
      await updateDoc(
        doc(
          db,
          "categories",
          editingCategory.id,
          "options",
          editingOption.id
        ),
        {
          name: optionForm.name.trim(),
          active: optionForm.active,
        }
      );
    } else {
      await addDoc(
        collection(
          db,
          "categories",
          editingCategory.id,
          "options"
        ),
        {
          name: optionForm.name.trim(),
          active: optionForm.active,
        }
      );
    }

    setOptionModalOpen(false);
  } catch (err) {
    console.error(err);
  }
};

  const deleteOption = async () => {
    if (!editingOption) return;

    try {
      await deleteDoc(
        doc(
            db,
            "categories",
            editingCategory.id,
            "options",
            editingOption.id
        )
        )

      setDeleteOptionModal(false);
      setOptionModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const currentCategory = categories.find(
  (c) => c.id === editingCategory?.id
);

const categoryOptions = currentCategory?.options || [];


  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}

      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold text-[#1C4672]">
                Categories
              </h1>

              <p className="text-gray-500 mt-1">
                Manage product categories and their options.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white border rounded-xl px-5 py-3 shadow-sm text-center">
                <p className="text-xs uppercase text-gray-500">
                  Categories
                </p>

                <h2 className="text-2xl font-bold text-[#1C4672]">
                  {categories.length}
                </h2>
              </div>

              <button
                onClick={openAddCategory}
                className="bg-[#1C4672] hover:bg-[#16395d] text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                + Add Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full h-12 border rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#1C4672]"
            />
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="text-left px-6 py-4 font-semibold">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 font-semibold">
                    Options
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
                {filteredCategories.map((category) => {
                  const optionCount = category.options?.length || 0;

                  return (
                    <tr
                      key={category.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5 font-medium">
                        {category.name}
                      </td>

                      <td className="px-6 py-5">
                        {optionCount} Option
                        {optionCount !== 1 ? "s" : ""}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            category.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => openEditCategory(category)}
                          className="h-10 w-10 rounded-xl hover:bg-gray-100 transition flex items-center justify-center ml-auto"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-10 text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CATEGORY MODAL */}
      <AnimatePresence>
        {categoryModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCategoryModalOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}

              <div className="sticky top-0 bg-white border-b px-7 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1C4672]">
                    {editingCategory ? "Edit Category" : "Add Category"}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Manage category details and options.
                  </p>
                </div>

                <button
                  onClick={() => setCategoryModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-7 space-y-8">
                {/* Category Fields */}

                <div className="space-y-5">
                  <div>
                    <label className="block font-semibold mb-2">
                      Category Name
                    </label>

                    <input
                      value={categoryForm.name}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g Water & Drinks"
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border p-4">
                    <div>
                      <h3 className="font-semibold">Active</h3>

                      <p className="text-sm text-gray-500">
                        Display this category on the website.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setCategoryForm({
                          ...categoryForm,
                          active: !categoryForm.active,
                        })
                      }
                      className={`w-16 h-9 rounded-full transition relative ${
                        categoryForm.active
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-1 h-7 w-7 rounded-full bg-white transition ${
                          categoryForm.active ? "left-8" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Options Section */}

                {editingCategory && (
                  <div className="border-t pt-7">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-xl font-bold">
                          Options
                        </h3>

                        <p className="text-sm text-gray-500">
                          Manage options under this category.
                        </p>
                      </div>

                      <button
                        onClick={openAddOption}
                        className="flex items-center gap-2 bg-[#1C4672] text-white px-4 py-2 rounded-xl"
                      >
                        <Plus size={16} />
                        Add Option
                      </button>
                    </div>

                    <div className="space-y-3">
                      {categoryOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center justify-between rounded-xl border p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-medium">
                                {option.name}
                              </h4>

                              <span
                                className={`text-xs font-semibold ${
                                  option.active
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {option.active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditOption(option)}
                              className="p-2 rounded-lg hover:bg-gray-100"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              onClick={() => {
                                setEditingOption(option);
                                setDeleteOptionModal(true);
                              }}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}

                      {categoryOptions.length === 0 && (
                        <div className="text-center py-8 text-gray-500 rounded-xl border border-dashed">
                          No options added yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}

                <div className="flex gap-3 pt-3 border-t">
                  {editingCategory && (
                    <button
                      onClick={() => setDeleteCategoryModal(true)}
                      className="flex-1 h-12 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete Category
                    </button>
                  )}

                  <button
                    onClick={saveCategory}
                    className="flex-1 h-12 rounded-xl bg-[#1C4672] text-white hover:bg-[#16395d]"
                  >
                    {editingCategory ? "Save Changes" : "Add Category"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* OPTION MODAL */}
      <AnimatePresence>
        {optionModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60]"
              onClick={() => setOptionModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-[61] w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-xl font-bold text-[#1C4672]">
                  {editingOption ? "Edit Option" : "Add Option"}
                </h2>

                <button
                  onClick={() => setOptionModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block font-semibold mb-2">
                    Option Name
                  </label>

                  <input
                    value={optionForm.name}
                    onChange={(e) =>
                      setOptionForm({
                        ...optionForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g Bottled Water"
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <h3 className="font-semibold">Active</h3>

                    <p className="text-sm text-gray-500">
                      Display this option on the website.
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setOptionForm({
                        ...optionForm,
                        active: !optionForm.active,
                      })
                    }
                    className={`w-16 h-9 rounded-full transition relative ${
                      optionForm.active ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 h-7 w-7 rounded-full bg-white transition ${
                        optionForm.active ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={saveOption}
                  className="w-full h-12 rounded-xl bg-[#1C4672] text-white hover:bg-[#16395d]"
                >
                  {editingOption ? "Save Changes" : "Add Option"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DELETE CATEGORY MODAL */}
      <AnimatePresence>
        {deleteCategoryModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[70]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-[71] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
            >
              <div className="p-7">
                <h2 className="text-2xl font-bold">
                  Delete Category?
                </h2>

                <p className="text-gray-500 mt-3">
                  This will permanently delete
                  <span className="font-semibold">
                    {" "}{editingCategory?.name}
                  </span>.
                </p>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setDeleteCategoryModal(false)}
                    className="flex-1 h-11 rounded-xl border"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deleteCategory}
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

      {/* DELETE OPTION MODAL */}
      <AnimatePresence>
        {deleteOptionModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[80]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-[81] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl"
            >
              <div className="p-7">
                <h2 className="text-2xl font-bold">
                  Delete Option?
                </h2>

                <p className="text-gray-500 mt-3">
                  This will permanently delete
                  <span className="font-semibold">
                    {" "}{editingOption?.name}
                  </span>.
                </p>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setDeleteOptionModal(false)}
                    className="flex-1 h-11 rounded-xl border"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deleteOption}
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