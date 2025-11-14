'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import StepsOrder from './StepsOrder';
import { Quicksand } from "next/font/google";

const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});


const Order = () => {

  const MotionImage = motion(Image);

  return (
    <section id='How To Order'
    className="w-full flex flex-col justify-start items-center bg-white text-white relative overflow-hidden px-4 py-6 md:py-8">
    
      {/* Top Heading (Phone) */}
      <div className="flex items-center justify-center gap-1 md:hidden">
        <h1 className={` ${quick.className} text-3xl font-bold text-center text-black`}>How to Order</h1>
        <div className="relative w-30 h-20">
          <Image src={assets.van} alt="van" fill className="object-contain"/>
        </div>
      </div>

      {/* Top Heading (Desk) */}
      <h1 className={` ${quick.className} hidden md:block text-3xl md:text-4xl font-bold text-center text-black`}>
        How to Order
      </h1>

      {/* Content Wrapper (unchanged; big bus hidden on mobile) */}
      <div className="flex flex-col md:flex-row w-full p-2 items-center justify-between gap-6">
        
        {/* Van Desktop */}
        <div className="relative w-72 h-72 md:w-140 md:h-90 hidden md:flex items-center justify-center">

          <MotionImage
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            src={assets.van}
            alt="van"
            fill
            className="object-contain z-10"
          />
        </div>

        {/* Steps Component */}
        <div className="p-2 md:p-10 w-full md:w-1/2">
          <StepsOrder/>
        </div>

      </div>
  </section>
  );
};

export default Order;