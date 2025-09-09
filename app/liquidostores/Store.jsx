import React from "react";
import { products } from "@/public/assets";

const Store = () => {
  return (
    <section className="w-full py-10 min-h-screen bg-gray-100">
      {/* <h2 className="text-2xl font-semibold text-center mb-6">Our Products</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-2 scrollbar-hide">
        {products.map((products) => (
          <div
            key={products.id}
            className="min-w-[100px] md:min-w-[250px] bg-white shadow-md shadow-[#000000]/40 rounded-full md:rounded-xl overflow-hidden"
          >
            <img
              src={products.image}
              alt={products.text}
              className="w-5 md:w-full h-10 md:h-40 p-2 object-contain"
            />
            <div className="p-4">
              <p className="text-center text-black font-medium">{products.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Store;
