'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

const Hero = () => {
  const [drops, setDrops] = useState([]);
  const router = useRouter();

  const handlePlaceOrder = () => {
    // Add drop on click
    const newDrop = { id: Date.now() };
    setDrops((prev) => [...prev, newDrop]);

    // Remove drop after animation
    setTimeout(() => {
      setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
    }, 3000);

    setTimeout(() => {
      router.push("/shop");
    }, 600); 
  };

  return (
    <section className="w-full h-screen p-2 md:p-8 flex justify-center items-center bg-[#4C86C4] text-white relative overflow-hidden px-2 md:px-4 py-2 md:py-20">
      <div className="flex flex-col md:flex-row w-full p-2 md:p-8 items-center justify-evenly">
        
        {/* Backgrounds */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover hidden md:block"
          style={{ backgroundImage: "url('/heroside.svg')" }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover block md:hidden"
          style={{ backgroundImage: "url('/phonehero.svg')" }}
        />

        {/* Left Section */}
        <div className="relative w-full md:w-1/2 flex flex-col gap-4 z-20">
          <h1 className={`${quick.className} text-2xl md:text-4xl tracking-wide`}>
            Everything Liquid delivered to you with ease
          </h1>
          <span className="text-md md:text-lg">
            From crystal-clear water to premium beverages, 
            we bring freshness, quality, and convenience 
            right to your doorstep — every time, without compromise
          </span>

          <div className='relative inline-block'>
            <button 
              onClick={handlePlaceOrder}
              className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-md md:text-lg rounded-lg shadow-md shadow-[#000000]/50 w-fit hover:bg-[#8FC0F4]/40 transition relative z-30"
            >
              Place Order <ShoppingCartIcon className="text-lg"/>
            </button>
          </div>

          {/* Socials */}
          <div className="flex flex-row gap-4 mt-2">
            <div className="relative w-10 h-10">
              <Image src={assets.foot1} alt="whatsapp" fill className="object-contain" />
            </div>
            <div className="relative w-10 h-10">
              <Image src={assets.foot2} alt="instagram" fill className="object-contain" />
            </div>
            <div className="relative w-10 h-10">
              <Image src={assets.foot3} alt="tiktok" fill className="object-contain" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">
          {/* Circle with Water1 */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute right-4 md:right-10 mb-10 w-40 h-40 md:w-76 md:h-76 
            bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
            rounded-full shadow-md shadow-[#000000]/20 flex items-center justify-center"
          >
            <Image src={assets.water1} alt="Water1" fill className="object-contain" />
          </motion.div>

          {/* Circle with Water2 */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute left-11 md:left-10 top-20 w-30 h-30 md:w-56 md:h-56
            bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
            rounded-full flex items-center justify-center"
          >
            <Image src={assets.water2} alt="Water2" className="w-[80%] object-contain" />
          </motion.div>
        </div>

        {/* Van */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 right-2 md:right-20 w-32 h-32 md:w-60 md:h-60"
        >
          <Image src={assets.van} alt="van" fill className="object-contain" />
        </motion.div>

        {/* Drops */}
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
              className="absolute top-110 left-30 w-10 -translate-x-3/6"
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
