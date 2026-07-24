"use client";

import { X } from "lucide-react";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">
            Product Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-8">

          {/* Product Information */}
          <div className="grid md:grid-cols-2 gap-8">

            <div className="flex justify-center">
              <div className="border rounded-xl p-6 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-gray-500">
                  Product Name
                </p>

                <h3 className="text-2xl font-semibold">
                  {product.name}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="text-lg">
                  {product.category}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Option
                </p>

                <p className="text-lg">
                  {product.option}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Number of Variants
                </p>

                <p className="text-lg font-medium">
                  {product.variants?.length || 0}
                </p>
              </div>

            </div>

          </div>

          {/* Variants */}
          <div>

            <h3 className="text-xl font-semibold mb-4">
              Product Variants
            </h3>

            <div className="overflow-x-auto rounded-xl border">

              <table className="min-w-full">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="px-4 py-3 text-left">
                      Volume
                    </th>

                    <th className="px-4 py-3 text-left">
                      Pack Size
                    </th>

                    <th className="px-4 py-3 text-left">
                      Price
                    </th>

                    <th className="px-4 py-3 text-left">
                      Stock
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {product.variants?.map((variant, index) => (

                    <tr
                      key={index}
                      className="border-t"
                    >

                      <td className="px-4 py-3">
                        {variant.volume}
                      </td>

                      <td className="px-4 py-3">
                        Pack of {variant.packSize}
                      </td>

                      <td className="px-4 py-3 font-medium">
                        ₦{Number(variant.price).toLocaleString()}
                      </td>

                      <td className="px-4 py-3">
                        {variant.stock}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;