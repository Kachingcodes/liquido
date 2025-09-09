"use client";
import React, { useState } from "react";
import { Search, Droplets, Sparkles, CookingPot, User, Gem, Car, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    name: "Water & Drinks",
    icon: <Droplets size={20} />,
    options: ["Bottled Water", "Dispenser Refills", "Energy Drinks", "Soda", "Fruit Juices", "Wine & Alcoholic Beverages"],
  },
  {
    name: "Hygiene & Cleaning",
    icon: <Sparkles size={20} />,
    options: ["Detergents", "Disinfectants", "Soaps", "Sanitizers"],
  },
  {
    name: "Cooking & Edible Liquids",
    icon: <CookingPot size={20} />,
    options: ["Vegetable Oil", "Palm Oil", "Vinegar", "Cooking Wine"],
  },
  {
    name: "Personal Care",
    icon: <User size={20} />,
    options: ["Shampoos", "Conditioners", "Body Oils", "Lotions"],
  },
  {
    name: "Luxury & Lifestyle",
    icon: <Gem size={20} />,
    options: ["Perfumes", "Essential Oils", "Fragrance Diffusers"],
  },
  {
    name: "Automobile",
    icon: <Car size={20} />,
    options: ["Engine Oil", "Transmission Fluid", "Coolant", "Gear Oil"],
  },
];

const TopSide = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [drops, setDrops] = useState([]); // ✅ FIXED: drops state added

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

  return (
    <div className="w-full flex flex-col items-center p-6 space-y-6 relative">
      {/* Top Search + Back */}
      <div className="flex items-center justify-evenly w-full gap-12">
        <div className="flex items-center w-full rounded-lg bg-white shadow-md px-3 py-2">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search liquids..."
            className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
          />
        </div>

        <div className="relative inline-block">
          <button
            onClick={handleBackIntro}
            className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 w-fit hover:bg-[#1C4672]/80 transition relative z-30"
          >
            Back <ArrowLeftIcon className="text-lg" />
          </button>
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

      {/* Second Row (Options) */}
      {activeCategory && (
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center gap-2 min-w-max px-1 py-2">
            {categories
              .find((c) => c.name === activeCategory)
              .options.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 bg-blue-50 border rounded-md text-sm text-gray-700 hover:bg-blue-100 cursor-pointer whitespace-nowrap"
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
