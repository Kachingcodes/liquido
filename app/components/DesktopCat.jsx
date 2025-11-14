import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { categories } from "@/public/assets";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation'; 


const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"],
});

const DesktopCat = () => {
  const router = useRouter(); 
  
  const handlePlaceOrder = () => {
    router.push("/shop"); 
  };
  
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const currentCategory = categories[current];


  return (
    <div className="w-full flex flex-col items-center justify-center relative px-4 py-6">
      
      <div className="w-full max-w-6xl mb-10">
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentCategory.name}
            className={`${quick.className} text-3xl font-bold text-[#0a1d37]`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {currentCategory.name}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {currentCategory.items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-gradient-to-br from-[#ffffff]/40 via-[#4C86C4]/10 to-[#1C4672]/5 backdrop-blur-lg border border-white/50 shadow-lg rounded-3xl p-4 h-[240px]"
          >
            {/* Image */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={item.img}
                    alt={item.text}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory.name + idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                className="mt-4 text-center"
              >
                <span className="text-lg font-semibold text-[#0a1d37]">
                  {item.top}
                </span>
                <ul className="list-disc list-inside text-[#1C4672] mt-2">
                  <li className="text-sm">{item.text}</li>
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-between w-full max-w-6xl mt-10">
        <button
          onClick={prevSlide}
          className="p-3 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full shadow-md text-[#0a1d37] transition"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={handlePlaceOrder}
          className="bg-[#1C4672] px-3 py-3 flex items-center gap-2 text-white text-sm md:text-lg rounded-lg shadow-md shadow-[#000000]/36 w-fit hover:bg-[#4C86C4] transition">
          View More <ArrowRight size={20}/>
        </button>

        <button
          onClick={nextSlide}
          className="p-3 bg-white/50 hover:bg-white/80 backdrop-blur-md rounded-full shadow-md text-[#0a1d37] transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default DesktopCat;
