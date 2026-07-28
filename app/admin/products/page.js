"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs,
  deleteDoc, updateDoc,
  doc, query, orderBy,
} from "firebase/firestore";

import { Quicksand } from "next/font/google";
import FilterBar from "./FilterBar";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import DeleteModal from "./DeleteModal";
import ProductTable from "./ProductTable";
import ProductMobileCard from "./ProductMobileCard";
import toast, { Toaster } from "react-hot-toast";



const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
});

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formMode, setFormMode] = useState("add");

  const [deleteProduct, setDeleteProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  // ================= FETCH PRODUCTS =================

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

  // ================= FILTER =================

  const handleFilterChange = ({ searchTerm }) => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // ================= ACTIONS =================

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
      await deleteDoc(
        doc(db, "products", deleteProduct.id)
      );

      setDeleteProduct(null);

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

const handleVisibilityChange = async (
  id,
  visible
) => {
  try {
    await updateDoc(doc(db, "products", id), {
      isVisible: visible,
    });

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              isVisible: visible,
            }
          : product
      )
    );

    setFilteredProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              isVisible: visible,
            }
          : product
      )
    );

    toast.success(
      visible
        ? "Product is now visible."
        : "Product hidden from website."
    );
  } catch (err) {
    console.error(err);
    toast.error("Failed to update visibility.");
  }
};

return (
  <div className="bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      
       <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {/* Header */}
      <div>
        <h1
          className={`${quick.className} text-2xl md:text-3xl text-[#1C4672]`}
        >
          Products
        </h1>

        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Add, view and manage all products.
        </p>
      </div>

      {/* Filter */}
      <FilterBar
        onFilterChange={handleFilterChange}
        onAddClick={handleAddProduct}
      />

      {/* Mobile */}
      <ProductMobileCard
        loading={loading}
        products={filteredProducts}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={setDeleteProduct}
        onVisibilityChange={handleVisibilityChange}
      />

      {/* Desktop */}
      <ProductTable
        loading={loading}
        products={filteredProducts}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={setDeleteProduct}
        onVisibilityChange={handleVisibilityChange}
      />
    </div>

    {/* ================= MODALS ================= */}

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
}