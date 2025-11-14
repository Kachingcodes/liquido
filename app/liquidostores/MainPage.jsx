"use client";
import React from "react";
import { useStore } from "../context/StoreContext";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function MainPage() {
  const {
    filteredProducts,
    favourites,
    toggleFavourite,
    isFavourite,
    viewFavourites,
    addToCart,
    viewSearchResults,
    searchResults,
  } = useStore();

  // Track quantity per product
//   const [quantities, setQuantities] = React.useState({});

//   const increaseQty = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: (prev[id] || 1) + 1,
//     }));
//   };

//   const decreaseQty = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] && prev[id] > 1 ? prev[id] - 1 : 1,
//     }));
//   };

//   const handleAddToCart = (product) => {
//     const qty = quantities[product.id] || 1;
//     addToCart({ ...product, qty });
//     toast.success(`${product.name} added to cart (${qty})`);
//     setQuantities((prev) => ({ ...prev, [product.id]: 1 })); // reset after add
//   };

  // Priority: Search → Favourites → Normal
  const productsToDisplay = viewSearchResults
    ? searchResults
    : viewFavourites
    ? favourites
    : filteredProducts;


  if (!productsToDisplay.length) {
    return (
      <p className="p-6 text-gray-500">
        {viewFavourites ? "No favourites yet." : "No products available."}
      </p>
    );
  }

  return (
    <div className="md:p-6 p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
      <Toaster position="top-right" reverseOrder={false} />

      {viewSearchResults && (
        <h2 className="text-lg font-semibold mb-4">
          Is this what you are looking for?
        </h2>
      )}

      {/* Message if nothing found */}
      {!productsToDisplay.length && (
        <p className="text-gray-500">
          {viewSearchResults
            ? "No results found."
            : viewFavourites
            ? "No favourites yet."
            : "No products available."}
        </p>
      )}

      {productsToDisplay.map((product, index) => (
        <div
          key={`${product.id || product.name}-${index}`} // ✅ unique key
          className="relative bg-white rounded-2xl p-4 w-full h-auto border border-gray-500 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
        >
          {/* Product Image */}
          <div className="w-full h-30 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={product.image || "/products/placeholder.png"}
              alt={product.name}
              width={180}
              height={100}
              className="object-contain w-auto h-full mix-blend-multiply"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="mt-3 flex flex-col items-center justify-center">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {product.volume} &nbsp;—&nbsp; ₦{product.price}
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center justify-evenly w-full mt-4 flex-col md:flex-row gap-3">
            {/* Quantity Controls */}
            {/* <div className="flex items-center justify-center gap-3 border border-gray-300 bg-gray-50 rounded-lg px-3 py-1">
              <button
                onClick={() => decreaseQty(product.id)}
                className="p-1 text-gray-600 hover:text-gray-900 hover:scale-110 transition-transform"
              >
                <Minus size={18} />
              </button>
              <span className="font-semibold text-gray-800">
                {quantities[product.id] || 1}
              </span>
              <button
                onClick={() => increaseQty(product.id)}
                className="p-1 text-gray-600 hover:text-gray-900 hover:scale-110 transition-transform"
              >
                <Plus size={18} />
              </button>
            </div> */}

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product)}
              className="bg-[#1C4672] px-3 py-2 text-white text-sm md:text-md rounded-lg hover:bg-[#2d6ab0] hover:shadow-md transition-all"
            >
              Add to Cart
            </button>
          </div>

          {/* Favourite Toggle */}
          <button
            onClick={() => toggleFavourite(product)}
            className="absolute top-3 right-3 text-yellow-500 text-xl hover:scale-110 transition-transform"
          >
            {isFavourite(product.id) ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
}
