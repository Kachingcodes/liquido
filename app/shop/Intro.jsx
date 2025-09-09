'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '@/public/assets';
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Intro = () => {
  const [drops, setDrops] = useState([]);
  const router = useRouter();

  const handlePlaceOrder = () => {
    const newDrop = { id: Date.now() };
    setDrops((prev) => [...prev, newDrop]);

    setTimeout(() => {
      setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
    }, 3000);

    // setTimeout(() => {
    //   router.push("/shop");
    // }, 600); 
  };

  return (
    <section className="w-full h-screen p-2 md:p-8 flex justify-center items-center bg-[#4C86C4] text-white relative overflow-hidden">
      
      {/* Backgrounds */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover hidden md:block"
        style={{ backgroundImage: "url('/heroside.svg')" }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover block md:hidden"
        style={{ backgroundImage: "url('/phonehero.svg')" }}
      />

      {/* Centered Content (Logo + Buttons) */}
      <div className="relative flex flex-col items-center justify-center gap-6 z-20">
        <div className="relative w-80 h-40 ml-9">
          <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>

        <div className="flex gap-6">
          <button 
            className="bg-[#1C4672] px-6 py-3 flex items-center gap-2 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 hover:bg-[#8FC0F4]/40 transition relative z-30"
          >
            LIQUIDO STORES <ShoppingCartIcon className="text-lg"/>
          </button>

          <button 
            className="bg-[#1C4672] px-6 py-3 flex items-center gap-2 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 hover:bg-[#8FC0F4]/40 transition relative z-30"
          >
            LIQUIDO EXPRESS <ShoppingCartIcon className="text-lg"/>
          </button>
        </div>
      </div>

      {/* Van */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        onClick={() => router.push("/")}
        className="absolute bottom-0 right-2 md:right-20 w-32 h-32 md:w-64 md:h-64"
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
    </section>
  );
};

export default Intro;
