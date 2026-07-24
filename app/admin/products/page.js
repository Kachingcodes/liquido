"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import FilterBar from "./FilterBar";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import DeleteModal from "./DeleteModal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formMode, setFormMode] = useState("add");

  const [deleteProduct, setDeleteProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const q = query(
        collection(db, "products"),
        orderBy("name", "asc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = ({ searchTerm }) => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormMode("add");
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;

    try {
      await deleteDoc(doc(db, "products", deleteProduct.id));

      setDeleteProduct(null);

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-2">

      <FilterBar
        onFilterChange={handleFilterChange}
        onAddClick={handleAddProduct}
      />

      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">Image</th>

              <th className="px-5 py-4 text-left">Product</th>

              <th className="px-5 py-4 text-left">Category</th>

              <th className="px-5 py-4 text-left">Option</th>

              <th className="px-5 py-4 text-center">Variants</th>

              <th className="px-5 py-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredProducts.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-10"
                >
                  No products found.
                </td>

              </tr>

            ) : (

              filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-3">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain"
                    />

                  </td>

                  <td className="px-5 py-3 font-medium">
                    {product.name}
                  </td>

                  <td className="px-5 py-3">
                    {product.category}
                  </td>

                  <td className="px-5 py-3">
                    {product.option}
                  </td>

                  <td className="px-5 py-3 text-center">
                    {product.variants?.length || 0}
                  </td>

                  <td className="px-5 py-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleViewProduct(product)}
                        className="px-3 py-1 rounded border hover:bg-gray-100"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEditProduct(product)}
                        className="px-3 py-1 rounded border border-black hover:bg-black hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {showDetails && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => {
            setShowDetails(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {showForm && (
        <ProductForm
          mode={formMode}
          product={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setSelectedProduct(null);
            fetchProducts();
          }}
        />
      )}

      {deleteProduct && (
        <DeleteModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onConfirm={handleDeleteProduct}
        />
      )}

    </div>
  );
};

export default ProductsPage;