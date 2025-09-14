"use client";
import React, { useState } from "react";
import { Search, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from '@/public/assets';
import Image from "next/image";


const TopSide = ({ activeCategory, setActiveCategory, selectedOption, setSelectedOption, searchTerm, setSearchTerm}) => {
  
  const [showSearch, setShowSearch] = useState(false);
  const [drops, setDrops] = useState([]); 

  const toggleOption = (option) => {
  setSelectedOption((prev) => (prev === option ? null : option));
};
  
  const toggleCategory = (categoryName) => {
    setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const router = useRouter();

  const handleBackIntro = () => {
    // Add drop on click
    const newDrop = { id: Date.now() };
    setDrops((prev) => [...prev, newDrop]);

    // Remove drop after animation
    setTimeout(() => {
      setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
    }, 3000);

    // Redirect after short delay
    setTimeout(() => {
      router.push("/shop");
    }, 600);
  };

const handleAddToCart = (id) => {
  setCart((prev) => ({
    ...prev,
    [id]: 1,
  }));
};


  return (
    <div className="w-full flex flex-col items-center p-6 space-y-6 bg-white">

      {/* Top Search + Back - Desktop*/}
      <div className="hidden md:flex items-center justify-evenly w-full md:gap-12 gap-4">
        <div className="flex items-center w-full rounded-lg bg-white shadow-md px-3 py-2">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search liquids..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />
        </div>

        <div className="relative inline-block">
          <button
            onClick={handleBackIntro}
            className="bg-[#1C4672] px-4 md:py-3 py-2 flex items-center gap-2 text-white md:text-lg text-md rounded-lg shadow-md shadow-[#000000]/50 w-fit hover:bg-[#1C4672]/80 transition relative z-30"
          >
            Back <ArrowLeftIcon className="md:text-lg text-md" />
          </button>
        </div>
      </div>

      {/* Top Search + Back - Mobile */}
      <div className="md:hidden flex items-end justify-evenly w-auto ml-auto relative">
        {/* Back button fixed on right */}
        <div className="absolute right-2 top-0">
          <button
            onClick={handleBackIntro}
            className="bg-[#1C4672] px-3 py-2 flex items-center gap-2 text-white text-sm rounded-lg shadow-md shadow-[#000000]/50 w-fit hover:bg-[#1C4672]/80 transition"
          >
            Back <ArrowLeftIcon className="text-sm" />
          </button>
        </div>

        {/* Search button */}
        <div className="flex items-center mt-14"> 
          {!showSearch ? (
            // Show only the icon at first
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search size={20} className="text-gray-600" />
            </button>
          ) : (
            // Expand into input when clicked
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center bg-white rounded-lg shadow px-2 py-1 w-[220px]"
            >
              <input
                type="text"
                placeholder="Search liquids..."
                autoFocus
                className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* First Row of Buttons */}
      <div className="grid grid-cols-6 gap-3 w-full">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => toggleCategory(cat.name)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition 
              ${
                activeCategory === cat.name
                  ? "bg-[#1C4672] text-white shadow-md shadow-[#000000]/40 border-0"
                  : "bg-gray-100 text-gray-800 hover:bg-[#8FC0F4]/40"
              }`}
          >
            {cat.icon}
            <span className="text-xs text-center mt-1">{cat.name}</span>
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center gap-2 min-w-max px-1 py-2">
            {categories.find(c => c.name === activeCategory).options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`px-4 py-2 border rounded-md text-sm cursor-pointer whitespace-nowrap
                  ${selectedOption === option 
                    ? "bg-[#3d72ab] text-white border-0" 
                    : "bg-gray-100 text-gray-700 hover:bg-[#8FC0F4]/40"}`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drops animation */}
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.img
            key={drop.id}
            src="/drop.png"
            alt="drop"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 100, opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute top-20 right-10 w-10 -translate-x-1/2"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TopSide;
