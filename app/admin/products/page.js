"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs,
  deleteDoc, doc, query,
  orderBy } from "firebase/firestore";
import FilterBar from "./FilterBar";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import DeleteModal from "./DeleteModal";
import { Quicksand } from "next/font/google";

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
});


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
    <div className="bg-gray-50 min-h-screen">

  <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        <div>
          <h1 className={`${quick.className} text-2xl md:text-3xl text-[#1C4672]`}>
            Products
          </h1>

          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Add, view and manage all products.
          </p>
        </div>

    <FilterBar
      onFilterChange={handleFilterChange}
      onAddClick={handleAddProduct}
    />

    {/* ================= MOBILE ================= */}

    <div className="md:hidden mt-6 space-y-4">

      {loading ? (
        <div className="bg-white rounded-2xl border py-10 text-center">
          Loading...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border py-10 text-center">
          No products found.
        </div>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border shadow-sm p-4"
          >

            <div className="flex gap-4">

              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-contain border"
              />

              <div className="flex-1">

                <h2 className="font-semibold text-lg">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {product.category}
                </p>

                <p className="text-sm text-gray-500">
                  {product.option}
                </p>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {product.variants?.length || 0} Variants
                </span>

              </div>

            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">

              <button
                onClick={() => handleViewProduct(product)}
                className="h-11 rounded-xl border hover:bg-gray-100"
              >
                View
              </button>

              <button
                onClick={() => handleEditProduct(product)}
                className="h-11 rounded-xl bg-[#1C4672] text-white hover:bg-[#16395d]"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteProduct(product)}
                className="h-11 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>

    {/* ================= DESKTOP ================= */}

    <div className="hidden md:block mt-6 bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Image
              </th>

              <th className="px-5 py-4 text-left">
                Product
              </th>

              <th className="px-5 py-4 text-left">
                Category
              </th>

              <th className="px-5 py-4 text-left">
                Option
              </th>

              <th className="px-5 py-4 text-center">
                Variants
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

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
                        className="px-3 py-1 rounded-lg border hover:bg-gray-100"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEditProduct(product)}
                        className="px-3 py-1 rounded-lg bg-[#1C4672] text-white hover:bg-[#16395d]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
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

    </div>

  </div>

  {/* Modals */}

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