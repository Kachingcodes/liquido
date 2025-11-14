"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const FilterBar = ({ onFilterChange, onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleChange = () => {
    onFilterChange({
      searchTerm,
      minPrice: minPrice ? parseFloat(minPrice) : "",
      maxPrice: maxPrice ? parseFloat(maxPrice) : "",
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    onFilterChange({ searchTerm: "", minPrice: "", maxPrice: "" });
  };

  return (
    <div className="sticky top-0 z-20 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 p-3 justify-between">
        {/* Search */}
        <div className="relative flex items-center w-full sm:w-auto">
          <Search className="absolute left-2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleChange();
            }}
            className="pl-8 pr-3 py-2 border rounded-md w-full sm:w-60 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Price range */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min ₦"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              handleChange();
            }}
            className="border py-2 px-2 rounded-md w-24 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max ₦"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              handleChange();
            }}
            className="border py-2 px-2 rounded-md w-24 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Add Product */}
        <button
          onClick={onAddClick} // just trigger callback
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Add Product
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
