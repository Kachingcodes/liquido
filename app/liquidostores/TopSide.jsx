"use client";
import React, { useState } from "react";
import { Search, ArrowLeftIcon, X, ArrowRight, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { categories } from '@/public/assets';
import DeskAdvert from '../shop/DeskAdvert';
import PhoneAdvert from '../shop/PhoneAdvert';



const TopSide = ({ activeCategory, setActiveCategory, selectedOption, setSelectedOption, searchTerm, setSearchTerm, setCart, setShowCart }) => {
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

  const activeCat = categories.find(c => c.name === activeCategory)?.options[0] || "";
  const options = activeCat.options || [];

  return (
    <div className="w-full flex flex-col items-center p-3 md:p-6 space-y-6 bg-white ">
      {/* Top Search + Back - Desktop*/}
      <div className="hidden md:flex items-center justify-evenly w-full gap-4">       
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
            className="bg-[#1C4672] p-2 flex items-center gap-2 text-white md:text-md text-md rounded-lg shadow-md shadow-[#000000]/40 w-fit hover:bg-[#4C86C4] transition relative"
          >
            Back <ArrowLeftIcon size={20}/>
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl hidden md:flex">
        <DeskAdvert/>
      </div>

      <div className="w-full md:hidden items-end justify-end flex">
        <PhoneAdvert/>
      </div>

      {/* Top Search - Mobile */}
      <div className="md:hidden flex items-end justify-end w-full relative">
        <div className="flex items-center mt-2 gap-1"> 
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full bg-gray-100 hover:bg-[#8FC0F4]/40"
            >
              <Search size={20} className="text-gray-700"/>
            </button>
          ) : (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center bg-white rounded-lg shadow px-2"
            >
              <input
                type="text"
                placeholder="Search liquids..."
                autoFocus
                className="flex-1 outline-none text-sm text-gray-700 bg-transparent max-w-3 w-full"
              />
              <button
                onClick={() => setShowSearch(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20}/>
              </button>
            </motion.div>
          )}

            <button 
            onClick={() => setShowCart(true)}
            className="p-2 rounded-full bg-gray-100 hover:bg-[#8FC0F4]/40">
            <ShoppingCart size={20} className="text-gray-700"/>
          </button>
        </div>
      </div>

      {/* First Row of Buttons */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => toggleCategory(cat.name)}
            className={`flex flex-col items-center justify-center px-3 py-4 text-md rounded-lg transition
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

      <div className="w-full relative h-16">
        {/* absolutely-positioned, horizontally-scrollable content inside the reserved strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={activeCategory ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className={`absolute inset-0 flex flex-col px-2 ${activeCategory ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {/* Second Row of buttons */}
          <div className="flex gap-2 w-full overflow-x-auto no-scrollbar">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex-shrink-0 min-w-max px-4 py-2 rounded-md text-sm cursor-pointer select-none transition
                  ${selectedOption === option
                    ? "bg-[#4C86C4] text-white"
                    : "bg-[#1C4672] text-gray-100 hover:bg-[#67a1e3] hover:text-gray-800"
                  }`}
              >
                {option}
              </div>
            ))}
          </div>

          {options.length > 1 && (
            <div className="flex justify-end w-full mt-1">
              <span className="md:hidden flex items-center gap-1 text-gray-700 text-xs md:text-sm">
                Scroll For More <ArrowRight size={16} />
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TopSide;