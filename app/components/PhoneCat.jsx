"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { categories } from "@/public/assets";

const PhoneCat = () => {
 
    const [currentCategory, setCurrentCategory] = useState(0);
    const [mainText, setMainText] = useState(categories[0].name);

    const currentGroup = categories[currentCategory];

    const handlePrev = () => {
        const newCategory = (currentCategory - 1 + categories.length) % categories.length;
        setCurrentCategory(newCategory);
        setMainText(categories[newCategory].name);
    };

    const handleNext = () => {
        const newCategory = (currentCategory + 1) % categories.length;
        setCurrentCategory(newCategory);
        setMainText(categories[newCategory].name);
    };

    const radius = 150;
    const positions = currentGroup.items.map((_, i) => {
        const angle = -Math.PI / 1.2 + i * (Math.PI / 3); // spread across top arc
        return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        };
    });


  return (
    <div className="flex flex-col items-center justify-center relative w-full px-4 py-12">
        <div className="relative flex items-center justify-center">
            {/* Main Circle */}
            <motion.div
            key={mainText}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="w-40 h-40 rounded-full bg-[#4C86C4] mt-14 flex items-center justify-center text-white font-bold text-center p-4"
            >
            <span className="break-words">{mainText}</span>
            </motion.div>

            {currentGroup.items.map((item, i) => {
                const {x, y} = positions[i];
                return(
                    <motion.div
                        key={item.top}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        className="absolute"
                        style={{
                        top: `calc(66% + ${y}px - 30px)`,
                        left: `calc(50% + ${x}px - 44px)`,
                        transform: "translate(-80%, -80%)",
                        }}>
                            <div
                                className="bg-gradient-to-br from-[#ffffff]/40 via-[#4C86C4]/10 to-[#1C4672]/5 backdrop-blur-lg border border-white/50 shadow-lg relative w-22 h-22 rounded-full overflow-hidden cursor-pointer group"
                                >
                                <Image src={item.img} alt={item.top} fill className="object-contain p-1"/>
                            </div>

                    </motion.div>
                )
            })}
        </div>

        {/* Carousel Controls */}
        <div className="flex flex-row items-center justify-between w-full">
            <button onClick={handlePrev}
            className="p-3 bg-white text-black rounded-full shadow-md hover:bg-gray-200">
                <ChevronLeft size={24} />
            </button>
            <button onClick={handleNext}
            className="p-3 bg-white text-black rounded-full shadow-md hover:bg-gray-200">
                <ChevronRight size={24} />
            </button>
        </div>
    </div>
  );
};

export default PhoneCat;
