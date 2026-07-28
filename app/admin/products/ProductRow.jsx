"use client";

import ProductActionMenu from "./ProductActionMenu";
import VisibilityToggle from "./VisibilityToggle";

export default function ProductRow({
  product,
  onView,
  onEdit,
  onDelete,
  onVisibilityChange,
}) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      {/* Image */}
      <td className="px-5 py-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-contain rounded-lg"
        />
      </td>

      {/* Product */}
      <td className="px-5 py-3">
        <p className="font-semibold text-gray-900">
          {product.name}
        </p>
      </td>

      {/* Category */}
      <td className="px-5 py-3">
        {product.category}
      </td>

      {/* Option */}
      <td className="px-5 py-3">
        {product.option}
      </td>

      {/* Variants */}
      <td className="px-5 py-3 text-center">
        <span className="inline-flex items-center justify-center min-w-[36px] rounded-full bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1">
          {product.variants?.length || 0}
        </span>
      </td>

      {/* Display */}
      <td className="px-5 py-3 text-center">
        <VisibilityToggle
          isVisible={product.isVisible !== false}
          onToggle={() =>
            onVisibilityChange(
              product.id,
              !(product.isVisible !== false)
            )
          }
        />
      </td>

      {/* Actions */}
      <td className="px-5 py-3 text-center">
        <ProductActionMenu
          product={product}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}