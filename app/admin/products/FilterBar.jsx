"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const FilterBar = ({ onFilterChange, onAddClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = () => {
    onFilterChange({
      searchTerm,
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    onFilterChange({ searchTerm: "", minPrice: "", maxPrice: "" });
  };

  return (
    <div className="sticky top-0 z-20 backdrop-blur-md mt-10 md:mt-0 bg-gray-100 py-0 md:py-4">
      <div className="flex flex-wrap items-center gap-3 justify-evenly md:justify-between">

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
            className="pl-8 pr-3 py-2 border rounded-md w-50 sm:w-60 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-2 items-start justify-start">
          {/* Add Product */}
          <button
            onClick={onAddClick}
            className="border border-gray-900 text-black hover:text-white px-4 py-2 rounded-md hover:bg-black transition"
          >
            Add Product
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="bg-red-600 text-white mr-16 px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
