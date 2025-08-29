'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, Droplet, Smartphone } from 'lucide-react';


const Hero = () => {
  return (
    <section className="w-full flex justify-center items-center bg-white text-black relative overflow-hidden px-4">
    <div className="w-full p-2 md:p-8 md:flex md:items-center md:justify-between gap-4 md:gap-6">
      
      {/* Reliable Delivery */}
      <div className="flex flex-col items-center text-center py-2">
        <div className="relative w-20 h-24 md:w-26 md:h-32 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-20 h-24 md:w-26 md:h-32">
            <path 
              d="M32 2 Q40 10 58 12 V30 C58 46 45 56 32 62 C19 56 6 46 6 30 V12 Q24 10 32 2 Z" 
              fill="white" 
              stroke="#1C4672" 
              strokeWidth="2"
            />
          </svg>
          <Truck className="absolute w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="font-semibold mt-2 text-sm md:text-lg">Reliable Delivery</h3>
        <p className="text-xs md:text-md">Timely water supply for homes, businesses, estates and more</p>
      </div>

      {/* Bulk & Custom Orders */}
      <div className="flex flex-col items-center text-center py-2">
        <div className="relative w-20 h-24 md:w-26 md:h-32 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-20 h-24 md:w-26 md:h-32">
            <path 
              d="M32 2 Q40 10 58 12 V30 C58 46 45 56 32 62 C19 56 6 46 6 30 V12 Q24 10 32 2 Z" 
              fill="white" 
              stroke="#1C4672" 
              strokeWidth="2"
            />
          </svg>
          <Package className="absolute w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="font-semibold mt-2 text-sm md:text-lg">Bulk & Custom Orders</h3>
        <p className="text-xs md:text-md">Flexible plans tailored to your specific needs</p>
      </div>

      {/* Quality You Can Trust */}
      <div className="flex flex-col items-center text-center py-2">
        <div className="relative w-20 h-24 md:w-26 md:h-32 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-20 h-24 md:w-26 md:h-32">
            <path 
              d="M32 2 Q40 10 58 12 V30 C58 46 45 56 32 62 C19 56 6 46 6 30 V12 Q24 10 32 2 Z" 
              fill="white" 
              stroke="#1C4672" 
              strokeWidth="2"
            />
          </svg>
          <Droplet className="absolute w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="font-semibold mt-2 text-sm md:text-lg">Quality You Can Trust</h3>
        <p className="text-xs md:text-md">Clean, certified water with strict safety standards.</p>
      </div>

      {/* Simple Ordering */}
      <div className="flex flex-col items-center text-center py-2">
        <div className="relative w-20 h-24 md:w-26 md:h-32 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-20 h-24 md:w-26 md:h-32">
            <path 
              d="M32 2 Q40 10 58 12 V30 C58 46 45 56 32 62 C19 56 6 46 6 30 V12 Q24 10 32 2 Z" 
              fill="white" 
              stroke="#1C4672" 
              strokeWidth="2"
            />
          </svg>
          <Smartphone className="absolute w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h3 className="font-semibold mt-2 text-sm md:text-lg">Simple Ordering</h3>
        <p className="text-xs md:text-md">Order and manage deliveries easily online or by phone</p>
      </div>

    </div>
  </section>


  );
};

export default Hero;