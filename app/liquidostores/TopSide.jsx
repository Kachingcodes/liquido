"use client";
import React, { useState } from "react";
import { Search, ArrowLeftIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from '@/public/assets';
import DeskAdvert from '../shop/DeskAdvert';
import PhoneAdvert from '../shop/PhoneAdvert';

const TopSide = ({ activeCategory, setActiveCategory, selectedOption, setSelectedOption, searchTerm, setSearchTerm }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [drops, setDrops] = useState([]);

  const toggleOption = (option) => setSelectedOption(prev => (prev === option ? null : option));
  const toggleCategory = (categoryName) => setActiveCategory(prev => (prev === categoryName ? null : categoryName));

  const router = useRouter();
  const handleBackIntro = () => {
    const newDrop = { id: Date.now() };
    setDrops(prev => [...prev, newDrop]);
    setTimeout(() => setDrops(prev => prev.filter(d => d.id !== newDrop.id)), 3000);
    setTimeout(() => router.push("/shop"), 600);
  };

  const activeCat = categories.find(c => c.name === activeCategory) || { options: [] };
  const options = activeCat.options || [];

  return (
    <div className="w-full flex flex-col items-center p-3 md:p-6 space-y-6 bg-white">
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
            className="bg-[#1C4672] p-2 flex items-center gap-2 text-white md:text-md text-md rounded-lg shadow-md shadow-[#000000]/50 w-fit hover:bg-[#1C4672]/80 transition relative z-30"
          >
            Back <ArrowLeftIcon size={20}/>
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl hidden md:flex">
        <DeskAdvert/>
      </div>

      <div className="w-full md:hidden">
        <PhoneAdvert/>
      </div>

      {/* Top Search - Mobile */}
      <div className="md:hidden flex items-end w-auto ml-auto relative">
        <div className="flex items-center mt-2"> 
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Search size={20} className="text-gray-600" />
            </button>
          ) : (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center bg-white rounded-lg shadow px-2 w-[220px]"
            >
              <input
                type="text"
                placeholder="Search liquids..."
                autoFocus
                className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20}/>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* First Row of Buttons */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => toggleCategory(cat.name)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition
              ${
                activeCategory === cat.name
                  ? "bg-[#1C4672] text-white shadow-md border-transparent"
                  : "bg-gray-200 text-gray-800 hover:bg-[#8FC0F4]/40 border-gray-200"
              }`}
          >
            {cat.icon}
            <span className="text-xs text-center mt-1">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* RESERVED strip for the options row (prevents layout shift) */}
      <div className="w-full relative h-16"> 
        {/* absolutely-positioned, horizontally-scrollable content inside the reserved strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={activeCategory ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className={`absolute inset-0 flex items-center px-2 ${activeCategory ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div className="flex gap-2 w-full overflow-x-auto no-scrollbar">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex-shrink-0 min-w-max px-4 py-2 rounded-md text-sm cursor-pointer select-none transition
                  ${selectedOption === option
                    ? "bg-[#67a1e3] text-white"
                    : "bg-[#1C4672] text-gray-100 hover:bg-[#8FC0F4]/40"
                  }`}
              >
                {option}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default TopSide;