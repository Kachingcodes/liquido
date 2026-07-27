"use client";
import React, { useState } from "react";
import { Search, Bell } from "lucide-react";

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
    <div className="sticky top-0 z-20 py-4">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    {/* Search + Bell */}
    <div className="flex items-center gap-3 w-full md:flex-1">

      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleChange();
          }}
          className="w-full h-12 rounded-xl border pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#1C4672]"
        />
      </div>

      <button
        className="h-12 w-12 shrink-0 rounded-xl border bg-white hover:bg-gray-100 flex items-center justify-center transition"
      >
        <Bell size={20} />
      </button>

    </div>

    {/* Buttons */}
    <div className="flex justify-center md:justify-end gap-3 w-full md:w-auto">

      <button
        onClick={onAddClick}
        className="flex-1 md:flex-none md:w-40 h-12 rounded-xl bg-[#1C4672] text-white font-semibold hover:bg-[#16395d]"
      >
        Add Product
      </button>

      <button
        onClick={handleReset}
        className="flex-1 md:flex-none md:w-40 h-12 rounded-xl border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
      >
        Reset
      </button>

    </div>

  </div>

</div>
  );
};

export default FilterBar;
