"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const promos = [
  "🔥 Big Discount – 20% Off All Items!",
  "🎉 Buy 1 Get 1 Free This Week!",
  "🚚 Free Shipping on Orders Over ₦20,000!",
  "✨ New Arrivals Just Dropped – Shop Now!",
];

const PromoBanner = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative bg-[#1C4672] text-white py-3 px-4 rounded-lg shadow-md">
      <div className="h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium"
          >
            {promos[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PromoBanner;
