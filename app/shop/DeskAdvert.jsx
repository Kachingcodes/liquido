"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { adverts } from '@/public/assets';




const DeskAdvert = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-slide every 4s (unless paused)
  useEffect(() => {
    if (paused) return; // stop when hovered
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % adverts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="relative w-full max-w-5xl h-48 overflow-hidden rounded-xl shadow-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={adverts[index].img}
              alt={adverts[index].text}
              fill
              className="object-contain"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#4C86C4]/60 flex items-center justify-center">
              <p className="text-white text-lg md:text-xl font-semibold text-center px-4">
                {adverts[index].text}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DeskAdvert;
