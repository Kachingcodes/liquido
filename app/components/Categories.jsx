import { useState } from "react";
import Image from "next/image";
import { assets } from '@/public/assets';
import { slides } from '@/public/assets';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Quicksand } from "next/font/google";
import{ motion, AnimatePresence } from 'framer-motion';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

export default function CategoriesCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full bg-[#4C86C4] text-white relative overflow-hidden px-4 py-20 flex flex-col items-center">
      {/* Main Heading */}
      <h1 className={` ${quick.className} text-4xl text-center mb-6`}>CATEGORIES</h1>

      {/* Subheading */}
      <h3 className={` ${quick.className} text-2xl font-semibold text-left w-full max-w-6xl mb-8`}>
        {slides[current].title}
      </h3>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <div

          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
              {slides[current].items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {/* Card Image */}
                  <div className="bg-[#8FC0F4] rounded-2xl shadow-lg shadow-[#000000]/30 p-6 flex items-center justify-center">
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
                  {/* Bullet text */}
                  <ul className="list-disc list-inside text-left mt-4">
                    <li>{item.text}</li>
                  </ul>
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
    </section>
  );
}