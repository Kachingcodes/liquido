"use client";
import React from "react";
import { useStore } from "../context/StoreContext";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FaSadTear } from "react-icons/fa";
import { GiMeltingIceCube } from "react-icons/gi";
import { flyToCartAnimation } from "../utils/flyToCart";



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
    leftCartRef, 
    topCartRef
  } = useStore();

  // Priority: Search → Favourites → Normal
  const productsToDisplay = viewSearchResults
    ? searchResults
    : viewFavourites
    ? favourites
    : filteredProducts;

  return (
    <div className="md:p-6 p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
      <Toaster position="top-right" reverseOrder={false} />
      
      {!productsToDisplay.length && (
        <div className="text-gray-500">
          {viewSearchResults
            ? <div className="flex gap-2">  No results found. <FaSadTear size={18} className="mt-1"/> </div>
            : viewFavourites
            ? "No favourites yet."
            : <div className="flex flex-col md:flex-row gap-2"> No products available. <GiMeltingIceCube size={18} className="mt-1"/> </div>
            }
        </div>
      )}

      {productsToDisplay.map((product, index) => (
        <div
          key={`${product.id || product.name}-${index}`} // ✅ unique key
          className="product-card relative bg-white rounded-2xl p-4 w-full h-auto border border-gray-500 flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow"
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
            {/* Add to Cart */}
            <button
              onClick={(e) => {
                const imageEl = e.currentTarget
                .closest(".product-card")
                .querySelector("img");

                flyToCartAnimation(imageEl, leftCartRef, topCartRef);
                addToCart(product);
              }}
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
