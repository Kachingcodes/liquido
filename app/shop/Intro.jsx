'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '@/public/assets';
import { ShoppingCartIcon, StoreIcon, Truck, TruckIcon } from 'lucide-react';
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
    <section className="w-full min-h-screen p-2 md:p-8 flex justify-center items-center bg-[#4C86C4] text-white relative overflow-hidden">
      
      {/* Backgrounds */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover hidden md:block"
        style={{ backgroundImage: "url('/backgrounds/heroside.svg')" }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover block md:hidden"
        style={{ backgroundImage: "url('/backgrounds/phonehero.svg')" }}
      />

      {/* Centered Content (Logo + Buttons) */}
      <div className="relative flex flex-col items-center justify-center gap-4 z-20 bg-[white]/8 shadow-md shadow-[#000000]/30 p-6 md:p-8 rounded-2xl">
        
        <div className="relative w-50 h-20 md:w-70 md:h-30 md:ml-9 ml-2">
          <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>

        <div className="flex gap-4 md:gap-6 flex-col md:flex-row">
            <Link href="/liquidostores"
                onClick = {(e) => {
                handleDrop(e); 
            }}
            className="bg-gray-100 px-4 py-3 flex items-center gap-2 text-[#1C4672] text-md rounded-lg shadow-md shadow-[#000000]/40 hover:bg-[#8FC0F4]/40 hover:text-white transition relative z-30"
            >
                LIQUIDO STORES <StoreIcon size={20}/>  
            </Link>

            <button
              disabled
            className=" px-4 py-3 flex items-center gap-2 text-md rounded-lg shadow-md shadow-[#000000]/40 transition relative z-30 disabled:bg-gray-400 disabled:cursor-not-allowed"
            > 
              COMING SOON <TruckIcon size={20}/>
          </button>

            {/* <Link href="/liquidoexpress"
                onClick = {(e) => {
                handleDrop(e); 
            }} 
            className=" px-4 py-3 flex items-center gap-2 text-md rounded-lg shadow-md shadow-[#000000]/40  transition relative z-30 disabled:bg-gray-400 disabled:cursor-not-allowed"
            > 
                LIQUIDO EXPRESS <TruckIcon size={20}/>
          </Link> */}
        </div>
      </div>

      {/* Van bg-gray-100 text-[#1C4672] hover:bg-[#8FC0F4]/40 hover:text-white*/}
      <Link href="/">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          
          className="absolute bottom-10 right-2 md:right-20 w-36 h-36 md:w-64 md:h-64"
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
