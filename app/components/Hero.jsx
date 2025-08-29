'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Graduate, Lato } from "next/font/google";
import { ShoppingCartIcon } from 'lucide-react';

const grad = Graduate({
   subsets: ["latin"],
  weight: ["400"]
});


const Hero = () => {
  return (
    <section className="w-full min-h-screen p-8 flex justify-center items-center bg-[#4C86C4] text-white relative overflow-hidden px-4 py-20">
      <div className="flex w-full p-8 items-center justify-between">
        
        {/* Left Section */}
        <div className="relative w-1/2 flex flex-col gap-4">
          <h1 className={`${grad.className} text-4xl`}>
            Sustainable Delivery for Every Sip
          </h1>

          <span className="text-lg">
            From crystal-clear water to premium beverages, 
            we bring freshness, quality, and convenience 
            right to your doorstep — every time, without compromise
          </span>

          <button className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-lg rounded-lg w-fit hover:bg-[#8FC0F4]/40 transition">
            Place Order <ShoppingCartIcon className='text-lg'/>
          </button>

          {/* Social Icons in a row */}
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
        <div className="relative w-1/2 h-full flex items-center justify-center">
          {/* First Circle - Up */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute right-10 mb-10 w-80 h-80 
            bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
            rounded-full shadow-md shadow-[#000000]/20 flex items-center justify-center">
            <Image src={assets.water1} alt="Water1" fill className="object-contain" />
          </motion.div>

          {/* Second Circle - Down*/}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute left-10 top-20 w-60 h-60 
            bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
            rounded-full flex items-center justify-center">
            <Image src={assets.water2} alt="Water2" className="w-[80%] object-contain" />
          </motion.div>
        </div>

        {/* Van at bottom right */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 right-20 w-64 h-64">
          <Image src={assets.van} alt="van" fill className="object-contain" />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;