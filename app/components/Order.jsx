'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import StepsOrder from './StepsOrder';


const Order = () => {

  const MotionImage = motion(Image);

  return (
    <section className="w-full flex min-h-screen justify-center items-center bg-[#77B3F4] text-white relative overflow-hidden px-4">
      <div className="flex w-full p-8 items-center justify-between gap-6">
           
        <div className="relative w-160 h-100 flex items-center justify-center">

          {/* Blurred Circle (background only) */}
          <div className="absolute w-160 h-80 opacity-30 bg-[linear-gradient(to_bottom,#D9D9D9_0%,#77B3F4_100%)] 
              rounded-full blur-xl z-0">
          </div>

          {/* Image on top */}
          <MotionImage
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            src={assets.van} alt="van" fill className="object-contain z-10"/>
        </div>

        <div className='p-16'>
          <StepsOrder/>
        </div>

      </div>
    </section>

  );
};

export default Order;