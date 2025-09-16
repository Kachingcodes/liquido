import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { StarIcon, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";



const Store = ({ activeCategory, selectedOption, searchTerm, favorites, setFavorites }) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!activeCategory || !selectedOption) {
        setProductsList([]);
        return;
      }

      setLoading(true);
      try {
        let q = query(
          productsCollectionRef,
          where("category", "==", activeCategory),
          where("option", "==", selectedOption)
        );

        const snapshot = await getDocs(q);
        const formatted = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductsList(formatted);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [activeCategory, selectedOption]);

  const filteredProducts = productsList.filter((p) =>
    searchTerm
      ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const toggleFavorite = (product) => {
  const isFavorite = favorites.some((p) => p.id === product.id);

  if (isFavorite) {
    setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    toast.error(`${product.name} removed from favorites`);
  } else {
    setFavorites((prev) => [...prev, product]);
    toast.success(`${product.name} added to favorites`);
  }
};


  return (
    <section className="w-full py-10 overflow-hidden">
      {/* Loader */}
      {loading && (
      <div className="flex flex-col items-center justify-center mt-16 space-y-2">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <p className="text-center text-gray-400">Loading products...</p>
      </div>
      )}

      <Toaster position="top-center" />

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 p-4 scrollbar-hide">
        {!loading && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className=" bg-white shadow-md hover:shadow-[#000000]/20 rounded-xl overflow-hidden"
            >
              <div className="p-2 flex justify-end">
                <StarIcon size={20} 
                onClick={() => toggleFavorite(product)} 
                className={`cursor-pointer ${
                  favorites.some((p) => p.id === product.id)
                    ? "text-amber-600"
                    : "text-gray-400"
                }`}
              />
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-30 md:h-40 p-2 object-contain"
              />
              <div className="p-3 md:p-4">
                <h3 className="text-center text-black text-lg md:text-2xl font-medium">
                  {product.name}
                </h3>
                <p className="text-center text-black text-sm md:font-medium">
                  ₦{product.price}
                </p>

                <div className="flex items-center justify-center">
                  <button 
                    className="bg-[#1C4672] px-4 py-2 flex items-center gap-2 text-white text-sm md:text-md mt-2 rounded-lg shadow-md shadow-[#000000]/50 w-fit hover:bg-[#8FC0F4]/40 transition relative z-30"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading &&
          selectedOption && (
            <p className="col-span-full text-center text-gray-400 mt-10 p-8">
              No products found for this option.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default Store;
