"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const promos = [
  {
    img: "/wine.png",
    text: "🔥 Big Discount – 20% Off All Items!",
  },
  {
    img: "/wine.png",
    text: "🎉 Buy 1 Get 1 Free This Week!",
  },
  {
    img: "/wine.png",
    text: "🚚 Free Shipping on Orders Over ₦20,000!",
  },
  {
    img: "/wine.png",
    text: "✨ New Arrivals Just Dropped – Shop Now!",
  },
];

const DeskAdvert = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl h-48 overflow-hidden rounded-xl shadow-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {/* Background Image */}
          <Image
            src={promos[index].img}
            alt={promos[index].text}
            fill
            className="object-contain"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#4C86C4]/40 flex items-center justify-center">
            <p className="text-white text-lg md:text-xl font-semibold text-center px-4">
              {promos[index].text}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DeskAdvert;
