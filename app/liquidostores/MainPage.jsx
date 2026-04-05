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

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const modalImageRef = React.useRef(null);

  // Priority: Search → Favourites → Normal
  const productsToDisplay = viewSearchResults
    ? searchResults
    : viewFavourites
    ? favourites
    : filteredProducts;

  return (
    <div className="md:p-6 p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
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
        key={`${product.id || product.name}-${index}`}
        className="bg-white rounded-lg overflow-hidden shadow-sm w-full max-w-[250px] mx-auto"
      >
        {/* Product Image */}
        <div className="w-full h-[220px] flex items-center justify-center">
          <Image
            src={product.image || "/products/placeholder.png"}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain h-full w-auto"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col gap-2">
          {/* Name + Favourite */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800 text-sm md:text-base">
              {product.name}
            </h3>

            <button
              onClick={() => toggleFavourite(product)}
              className="text-yellow-500 text-lg hover:scale-110 transition"
            >
              {isFavourite(product.id) ? "★" : "☆"}
            </button>
          </div>

          {/* Price */}
          {/* <p className="text-gray-900 font-semibold text-base">
            ${product.price || "45.00"}
          </p> */}

          {/* Button */}
          <button
            onClick={() => setSelectedProduct(product)}
            className="mt-2 w-full bg-[#1C4672] text-white py-2 rounded-md text-sm hover:opacity-90 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    ))}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedProduct(null)}
        >
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative"
          onClick={(e) => e.stopPropagation()}>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            {/* Image */}
            <div
              ref={modalImageRef}
              className="w-full h-40 flex items-center justify-center"
            >
              <Image
                src={selectedProduct.image || "/products/placeholder.png"}
                alt={selectedProduct.name}
                width={200}
                height={150}
                className="object-contain h-full"
              />
            </div>

            {/* Name */}
            <h2 className="text-lg font-semibold text-center mt-4">
              {selectedProduct.name}
            </h2>

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                const imageEl = modalImageRef.current;
                if (!imageEl) return;
                flyToCartAnimation(imageEl, leftCartRef, topCartRef);
                addToCart(selectedProduct);
                setTimeout(() => {
                setSelectedProduct(null);
              }, 500);
              }}
              className="mt-6 w-full bg-[#1C4672] text-white py-2 rounded-lg hover:bg-[#2d6ab0]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
