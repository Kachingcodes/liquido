import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from '@/public/assets';
import Image from "next/image";
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
import{ motion, AnimatePresence } from 'framer-motion';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

const DesktopCat = () => {

const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + categories.length) % categories.length);
  };
    
  return(
    <div className="w-full flex flex-col items-center justify-center relative px-4 py-8">
        <h3 className={` ${quick.className} text-2xl font-semibold text-left w-full max-w-6xl mb-8`}>
            {categories[current].name}
        </h3>

        {/* Cards */}
        <AnimatePresence mode="wait">
            <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {categories[current].items.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                    {/* Card Image */}
                    <div className="rounded-2xl shadow-lg shadow-[#000000]/30 p-6 flex items-center justify-center">
                        <motion.div 
                        key={current} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-32 h-32">
                        <Image src={item.img} alt={item.text} fill className="object-contain" />
                        </motion.div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-black text-center mt-2 text-lg">{item.top}</span>
                        <ul className="list-disc list-inside text-left text-[#1C4672]">
                        <li>{item.text}</li>
                        </ul>
                    </div>
                    </div>
            ))}
            </div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="flex justify-between w-full max-w-6xl mt-8">
            <button onClick={prevSlide} className="p-3 bg-white text-black rounded-full shadow-md hover:bg-gray-200">
            <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="p-3 bg-white text-black rounded-full shadow-md hover:bg-gray-200">
            <ChevronRight size={24} />
            </button>
        </div>

    </div>
  );
};

export default DesktopCat;