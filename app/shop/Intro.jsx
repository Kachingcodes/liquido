'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '@/public/assets';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

const Intro = () => {
  const [drops, setDrops] = useState([]);
  
    const handleDrop = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

  const newDrop = {
    id: Date.now(), 
    x: rect.left + rect.width / 2,
    y: rect.top + window.scrollY,
  };
  setDrops((prev) => [...prev, newDrop]);

  setTimeout(() => {
    setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
  }, 2000);

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

      {/* Circle with Water1 */}
        <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute right-4 md:right-10 mb-10 w-40 h-40 md:w-60 md:h-60 
            bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
            rounded-full shadow-md shadow-[#000000]/20 flex items-center justify-center"
        >
            <Image src={assets.water1} alt="Water1" fill className="object-contain" />
        </motion.div>
  

      {/* Centered Content (Logo + Buttons) */}
      <div className="relative flex flex-col items-center justify-center gap-6 z-20">
        <div className="relative w-80 h-40 ml-9">
          <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>

        <div className="flex gap-6">
            <Link href="/liquidostores"
                onClick = {(e) => {
                handleDrop(e); 
            }}
            className="bg-[#1C4672] px-6 py-3 flex items-center gap-2 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 hover:bg-[#8FC0F4]/40 transition relative z-30"
            >
                LIQUIDO STORES <ShoppingCartIcon className="text-lg"/>  
            </Link>

            <Link href="/liquidoexpress"
                onClick = {(e) => {
                handleDrop(e); 
            }} 
            className="bg-[#1C4672] px-6 py-3 flex items-center gap-2 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 hover:bg-[#8FC0F4]/40 transition relative z-30"
            >
                LIQUIDO EXPRESS <ShoppingCartIcon className="text-lg"/>
          </Link>
        </div>
      </div>
   
        {/* Circle with Water2 */}
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute left-11 md:left-10 top-20 w-30 h-30 md:w-50 md:h-50 animate-bounce
            bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
            rounded-full flex items-center justify-center"
                >
                  <Image src={assets.water2} alt="Water2" className="w-[80%] object-contain" />
                </motion.div>

      {/* Van */}
      <Link href="/">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          
          className="absolute bottom-0 right-2 md:right-20 w-32 h-32 md:w-64 md:h-64"
        >
          <Image src={assets.van} alt="van" fill className="object-contain" />
        </motion.div>
      </Link>

      {/* Drops */}
      <AnimatePresence>
              {drops.map((drop) => (
                <motion.img
                  key={drop.id}
                  src="/drop.png"
                  alt="drop"
                  initial={{ top: drop.y, left: drop.x, opacity: 1, position: "absolute" }}
                  animate={{ top: drop.y + 100, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeIn" }}
                  className="w-10 h-10 pointer-events-none"
                />
              ))}
            </AnimatePresence>
    </section>
  );
};

export default Intro;
