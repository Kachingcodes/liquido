"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import FilterBar from "./FilterBar";
import { X } from "lucide-react";

const ProductsPage = () => {
  const prodOptions = {
      "Water & Drinks": ["Bottled Water", "Dispenser Refills", "Energy Drinks", "Soda", "Fruit Juices", "Wine & Alcoholic Beverages"],
      "Hygiene & Cleaning": ["Detergents",  "Disinfectants", "Soaps"],
      "Cooking & Edible Liquids": ["Cooking Oil", "Vinegar", "Liquid Seasoning", "Syrup"],
      "Personal Care": ["Shampoos", "Conditioners", "Body Oils", "Lotions"],
      "Luxury & Lifestyle": ["Perfumes", "Essential Oils", "Fragrance Diffusers"],
      "Automobile": ["Engine Oil", "Transmission Fluid", "Coolant", "Gear Oil"],
  };

  const optionOptions = [];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    option: "",
    volume: "",
    price: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  // Filter handler
  const handleFilterChange = ({ searchTerm, minPrice, maxPrice }) => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (minPrice !== "") {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== "") {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }
    setFilteredProducts(filtered);
  };

  // Modal form change
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewProduct({ ...newProduct, imageFile: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Add or Edit product
  const handleSaveProduct = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // const imageUrl = newProduct.image || (editProduct ? editProduct.image : "");

    if (editProduct) {
      // Update existing product
      const docRef = doc(db, "products", editProduct.id);
      await updateDoc(docRef, {
        name: newProduct.name,
        category: newProduct.category,
        option: newProduct.option,
        volume: newProduct.volume,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id ? { ...p, ...newProduct } : p
        )
      );
    } else {
      // Add new product
      const docRef = await addDoc(collection(db, "products"), {
        name: newProduct.name,
        category: newProduct.category,
        option: newProduct.option,
        volume: newProduct.volume,
        price: parseFloat(newProduct.price),
        image: newProduct.image,
      });

      setProducts((prev) => [
        ...prev,
        { id: docRef.id, ...newProduct},
      ]);
    }

    setFilteredProducts(products);
    setModalOpen(false);
    setEditProduct(null);
    setNewProduct({
      name: "",
      category: "",
      option: "",
      volume: "",
      price: "",
      image: "",
    });
  } catch (err) {
    console.error("Error saving product:", err);
    alert("Failed to save product.");
  } finally {
    setLoading(false);
  }
};

  // Delete product
  const handleConfirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "products", deleteProduct.id));
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setFilteredProducts(filteredProducts.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  // const filteredOptions = prodOptions[newProduct.category] || [];

  const filteredOptions = newProduct.category
  ? prodOptions[newProduct.category] || []
  : [];

  return (
    <div className="p-4">
      {/* Filter Bar */}
      <FilterBar
        onFilterChange={handleFilterChange}
        onAddClick={() => setModalOpen(true)}
      />

      {/* Products List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border rounded-lg p-3 flex flex-col items-center shadow-sm">
            {p.image && <img src={p.image} alt={p.name} className="w-32 h-30 object-contain mb-2" />}
            <h3 className="font-semibold">{p.name}</h3>
            <p>{p.category}</p>
            <p>{p.option}</p>
            <p>{p.volume}</p>
            <p>₦{p.price}</p>
            <p>{p.image}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setEditProduct(p);
                  setNewProduct({
                    name: p.name,
                    category: p.category,
                    option: p.option,
                    volume: p.volume,
                    price: p.price,
                    image: p.image,
                  });
                  setModalOpen(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteProduct(p)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setEditProduct(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">{editProduct ? "Edit Product" : "Add Product"}</h2>
            <form className="space-y-3" onSubmit={handleSaveProduct}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newProduct.name}
                onChange={handleFormChange}
                className="w-full border px-2 py-1 rounded-md"
                required
              />

              <select
                name="category"
                value={newProduct.category}
                onChange={handleFormChange}
                className="w-full border px-2 py-2 rounded-md"
              >
                <option value="">Select Category</option>
                {Object.keys(prodOptions).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                name="option"
                value={newProduct.option}
                onChange={handleFormChange}
                className="w-full border px-2 py-2 rounded-md"
                disabled={!newProduct.category}
              >
                <option value="">
                  {newProduct.category ? "Select Option" : "Select Category First"}
                </option>

                {filteredOptions.map((optionValue) => (
                  <option key={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="volume"
                placeholder="Volume"
                value={newProduct.volume}
                onChange={handleFormChange}
                className="w-full border px-2 py-1 rounded-md"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newProduct.price}
                onChange={handleFormChange}
                className="w-full border px-2 py-1 rounded-md"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="ImagePath"
                value={newProduct.image}
                onChange={handleFormChange}
                className="w-full border px-2 py-1 rounded-md"
                required
              />
              {/* <input
                type="file"
                name="imageFile"
                onChange={handleFormChange}
                className="w-full"
              /> */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                {loading ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete {deleteProduct.name}?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteProduct(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
