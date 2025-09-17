'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});


const Distance = () => {

  return (
    <section className="w-full flex justify-center items-center bg-white text-black relative overflow-hidden">
      <div className="flex w-full flex-col md:flex-row p-4 md:p-8 items-center justify-evenly">
           
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1.2 }}
          className="relative w-60 h-60 md:w-90 md:h-90">
          <Image src={assets.location} alt="location" fill className="object-contain" />
        </motion.div>

           <div className={` ${quick.className} py-6 md:py-12 px-8 text-2xl md:text-4xl`}>
                <h1>No Distance Too Far</h1>
                <h1>No Liquid Too Heavy</h1>
                <h1> — We Dey for You.</h1>
           </div>

        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.2 }}
          className="relative w-60 h-60 md:w-90 md:h-90">
          <Image src={assets.nylon} alt="nylon" fill className="object-contain" />
        </motion.div>

      </div>
    </section>

  );
};

export default Distance;