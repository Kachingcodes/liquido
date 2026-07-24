"use client";

import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { X, Plus, Trash2 } from "lucide-react";

const ProductForm = ({
  mode,
  product,
  onClose,
  onSuccess,
}) => {
  const prodOptions = {
    "Water & Drinks": [
      "Bottled Water",
      "Dispenser Refills",
      "Energy Drinks",
      "Soda",
      "Fruit Juices",
      "Diary",
      "Wine & Alcoholic Beverages",
    ],
    "Hygiene & Cleaning": [
      "Mouthwash",
      "Disinfectants",
      "Soaps",
    ],
    "Cooking & Edible Liquids": [
      "Cooking Oil",
      "Vinegar",
      "Liquid Seasoning",
      "Syrup",
    ],
    "Personal Care": [
      "Shampoos",
      "Conditioners",
      "Body Oils",
      "Lotions",
    ],
    "Luxury & Lifestyle": [
      "Perfumes",
      "Essential Oils",
      "Fragrance Diffusers",
    ],
    Automobile: [
      "Engine Oil",
      "Transmission Fluid",
      "Coolant",
      "Gear Oil",
    ],
  };

  const emptyVariant = {
    volume: "",
    packSize: "",
    price: "",
    stock: "",
  };

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    option: "",
    image: "",
    variants: [emptyVariant],
  });

  useEffect(() => {
    if (mode === "edit" && product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        option: product.option || "",
        image: product.image || "",
        variants:
          product.variants?.length > 0
            ? product.variants
            : [emptyVariant],
      });
    }
  }, [mode, product]);

  const filteredOptions =
    prodOptions[formData.category] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        option: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (
    index,
    field,
    value
  ) => {
    const updatedVariants = [...formData.variants];

    updatedVariants[index][field] =
      field === "price" || field === "stock"
        ? Number(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          volume: "",
          packSize: "",
          price: "",
          stock: "",
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (formData.variants.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (mode === "add") {
        await addDoc(collection(db, "products"), {
          ...formData,
        });
      } else {
        await updateDoc(
          doc(db, "products", product.id),
          {
            ...formData,
          }
        );
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          {mode === "add"
            ? "Add Product"
            : "Edit Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">
                  Select Category
                </option>

                {Object.keys(prodOptions).map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>

            </div>

            <div>
              <label className="block mb-2 font-medium">
                Option
              </label>

              <select
                name="option"
                value={formData.option}
                onChange={handleChange}
                required
                disabled={!formData.category}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">
                  {formData.category
                    ? "Select Option"
                    : "Select Category First"}
                </option>

                {filteredOptions.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>

            </div>

            <div>
              <label className="block mb-2 font-medium">
                Image Path
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          <div className="border rounded-xl p-5">

            <div className="flex items-center justify-between mb-4">

              <h3 className="font-semibold text-lg">
                Variants
              </h3>

              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg"
              >
                <Plus size={18} />
                Add Variant
              </button>

            </div>

              <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2 text-left">Volume</th>
                    <th className="border px-3 py-2 text-left">Pack Size</th>
                    <th className="border px-3 py-2 text-left">Price (₦)</th>
                    <th className="border px-3 py-2 text-left">Stock</th>
                    <th className="border px-3 py-2 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {formData.variants.map((variant, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        <input
                          type="text"
                          placeholder="e.g. 33cl"
                          value={variant.volume}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "volume",
                              e.target.value
                            )
                          }
                          required
                          className="w-full border rounded-md px-2 py-2"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="number"
                          placeholder="12"
                          value={variant.packSize}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "packSize",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-md px-2 py-2"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="number"
                          placeholder="3500"
                          value={variant.price}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                          required
                          className="w-full border rounded-md px-2 py-2"
                        />
                      </td>

                      <td className="border p-2">
                        <input
                          type="number"
                          placeholder="20"
                          value={variant.stock}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "stock",
                              e.target.value
                            )
                          }
                          required
                          className="w-full border rounded-md px-2 py-2"
                        />
                      </td>

                      <td className="border p-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          disabled={formData.variants.length === 1}
                          className={`p-2 rounded-md transition ${
                            formData.variants.length === 1
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : mode === "add"
                ? "Add Product"
                : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;