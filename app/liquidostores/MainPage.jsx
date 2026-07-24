"use client";

import React from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { FaSadTear } from "react-icons/fa";
import { GiMeltingIceCube } from "react-icons/gi";

import { useStore } from "../context/StoreContext";
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
    topCartRef,
  } = useStore();

  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [selectedVolume, setSelectedVolume] =
    React.useState("");

  const [selectedVariant, setSelectedVariant] =
    React.useState(null);

  const modalImageRef = React.useRef(null);

  const productsToDisplay = viewSearchResults
    ? searchResults
    : viewFavourites
    ? favourites
    : filteredProducts;

  const openProduct = (product) => {
    if (!product?.variants?.length) {
      toast.error("This product has no variants.");
      return;
    }

    const firstVariant = product.variants[0];

    setSelectedProduct(product);

    setSelectedVolume(firstVariant.volume);

    setSelectedVariant(firstVariant);
  };

  const handleVolumeChange = (volume) => {
    setSelectedVolume(volume);

    const variants =
      selectedProduct.variants.filter(
        (v) => v.volume === volume
      );

    setSelectedVariant(variants[0]);
  };

  const handlePackChange = (packSize) => {
    const variant =
      selectedProduct.variants.find(
        (v) =>
          v.volume === selectedVolume &&
          Number(v.packSize) === Number(packSize)
      );

    if (variant) {
      setSelectedVariant(variant);
    }
  };

  return (
    <div className="md:p-6 p-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {!productsToDisplay.length && (

        <div className="text-gray-500">

          {viewSearchResults ? (

            <div className="flex gap-2">
              No results found.
              <FaSadTear
                size={18}
                className="mt-1"
              />
            </div>

          ) : viewFavourites ? (

            "No favourites yet."

          ) : (

            <div className="flex flex-col md:flex-row gap-2">
              No products available.
              <GiMeltingIceCube
                size={18}
                className="mt-1"
              />
            </div>

          )}

        </div>

      )}

      {productsToDisplay.map((product, index) => {

        const lowestPrice =
          product.variants?.length
            ? Math.min(
                ...product.variants.map(
                  (v) => Number(v.price)
                )
              )
            : 0;

        return (

          <div
            key={`${product.id}-${index}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm w-full max-w-[250px] mx-auto"
          >

            <div className="w-full h-[220px] flex items-center justify-center">

              <Image
                src={
                  product.image ||
                  "/products/placeholder.png"
                }
                alt={product.name}
                width={200}
                height={200}
                priority
                className="object-contain h-full w-auto"
              />

            </div>

            <div className="p-4 flex flex-col gap-2">

              <div className="flex justify-between items-center">

                <h3 className="font-medium text-gray-800 text-sm md:text-base">
                  {product.name}
                </h3>

                <button
                  onClick={() =>
                    toggleFavourite(product)
                  }
                  className="text-yellow-500 text-lg hover:scale-110 transition"
                >
                  {isFavourite(product.id)
                    ? "★"
                    : "☆"}
                </button>

              </div>

              <p className="text-[#1C4672] font-semibold">

                From ₦
                {lowestPrice.toLocaleString()}

              </p>

              <p className="text-xs text-gray-500">

                {product.variants?.length || 0} Variant
                {(product.variants?.length || 0) !== 1 &&
                  "s"}

              </p>

              <button
                onClick={() =>
                  openProduct(product)
                }
                className="mt-2 w-full bg-[#1C4672] text-white py-2 rounded-md hover:opacity-90 transition"
              >
                Shop Now
              </button>

            </div>

          </div>

        );
      })}

      {selectedProduct && (

        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative"
          >

            <button
              onClick={() =>
                setSelectedProduct(null)
              }
              className="absolute top-3 right-3 text-xl text-gray-500"
            >
              ✕
            </button>

            <div
              ref={modalImageRef}
              className="w-full h-44 flex justify-center items-center"
            >

              <Image
                src={
                  selectedProduct.image ||
                  "/products/placeholder.png"
                }
                alt={selectedProduct.name}
                width={220}
                height={180}
                className="object-contain h-full"
              />

            </div>

            <h2 className="text-xl font-semibold text-center mt-4">

              {selectedProduct.name}

            </h2>

            <div className="mt-6">
              <h4 className="font-medium mb-2">
                Select Volume
              </h4>

              <div className="flex flex-wrap gap-2">

                {[
                  ...new Set(
                    selectedProduct.variants.map(
                      (v) => v.volume
                    )
                  ),
                ].map((volume) => (
                  <button
                    key={volume}
                    onClick={() =>
                      handleVolumeChange(volume)
                    }
                    className={`px-4 py-2 rounded-lg border transition ${
                      selectedVolume === volume
                        ? "bg-[#1C4672] text-white border-[#1C4672]"
                        : "border-gray-300"
                    }`}
                  >
                    {volume}
                  </button>
                ))}

              </div>

            </div>
                        <div className="mt-6">
              <h4 className="font-medium mb-2">
                Select Pack Size
              </h4>

              <div className="flex flex-wrap gap-2">

                {selectedProduct.variants
                  .filter(
                    (variant) =>
                      variant.volume === selectedVolume
                  )
                  .map((variant) => (
                    <button
                      key={`${variant.volume}-${variant.packSize}`}
                      onClick={() =>
                        handlePackChange(variant.packSize)
                      }
                      className={`px-4 py-2 rounded-lg border transition ${
                        selectedVariant?.packSize ===
                        variant.packSize
                          ? "bg-[#1C4672] text-white border-[#1C4672]"
                          : "border-gray-300"
                      }`}
                    >
                      Pack of {variant.packSize}
                    </button>
                  ))}

              </div>
            </div>

            {selectedVariant && (

              <div className="mt-6 border-t pt-5 space-y-3">

                <div className="flex justify-between">
                  <span className="font-medium">
                    Volume
                  </span>

                  <span>
                    {selectedVariant.volume}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">
                    Pack Size
                  </span>

                  <span>
                    {selectedVariant.packSize}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">
                    Price
                  </span>

                  <span className="font-semibold text-[#1C4672]">
                    ₦
                    {Number(
                      selectedVariant.price
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">
                    Stock
                  </span>

                  <span>
                    {selectedVariant.stock} Available
                  </span>
                </div>

              </div>

            )}

            <button
              onClick={() => {

                if (!selectedVariant) {
                  toast.error(
                    "Please select a product variant."
                  );
                  return;
                }

                const imageEl = modalImageRef.current;

                if (imageEl) {
                  flyToCartAnimation(
                    imageEl,
                    leftCartRef,
                    topCartRef
                  );
                }

                addToCart({
                  id: `${selectedProduct.id}-${selectedVariant.volume}-${selectedVariant.packSize}`,

                  productId: selectedProduct.id,

                  name: selectedProduct.name,

                  category:
                    selectedProduct.category,

                  option:
                    selectedProduct.option,

                  image: selectedProduct.image,

                  volume:
                    selectedVariant.volume,

                  packSize:
                    selectedVariant.packSize,

                  price:
                    Number(
                      selectedVariant.price
                    ),

                  stock:
                    Number(
                      selectedVariant.stock
                    ),

                  quantity: 1,
                });

                setTimeout(() => {
                  setSelectedProduct(null);
                }, 500);

              }}
              className="mt-8 w-full bg-[#1C4672] text-white py-3 rounded-lg hover:bg-[#2d6ab0] transition"
            >
              Add to Cart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}