"use client";

import ProductActionMenu from "./ProductActionMenu";
import VisibilityToggle from "./VisibilityToggle";


export default function ProductMobileCard({
  loading,
  products,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="md:hidden mt-6">
        <div className="bg-white rounded-2xl border py-10 text-center">
          Loading...
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="md:hidden mt-6">
        <div className="bg-white rounded-2xl border py-10 text-center">
          No products found.
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden mt-6 space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl border shadow-sm p-4"
        >
          {/* Header */}
          <div className="flex justify-between items-start">

            <div className="flex gap-4 flex-1">

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

              </div>

            </div>

            <ProductActionMenu
              product={product}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between">

            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
              {product.variants?.length || 0} Variants
            </span>

            <div className="flex items-center gap-3">

              <span className="text-sm text-gray-600">
                Display
              </span>

              <VisibilityToggle
                isVisible={product.isVisible !== false}
                onToggle={() =>
                  onVisibilityChange(
                    product.id,
                    !(product.isVisible !== false)
                  )
                }
              />

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}