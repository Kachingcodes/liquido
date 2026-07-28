"use client";
import ProductRow from "./ProductRow";

export default function ProductTable({
  loading,
  products,
  onVisibilityChange,
  onView,
  onEdit,
  onDelete,
}) {
  return (
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
                Display
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
                  colSpan={7}
                  className="py-12 text-center text-gray-500"
                >
                  Loading products...
                </td>
              </tr>

            ) : products.length === 0 ? (

              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>

            ) : (

              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onVisibilityChange={onVisibilityChange}
                />
              ))

            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}