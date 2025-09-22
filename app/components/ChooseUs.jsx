'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { Droplet } from "lucide-react";

const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

const ChooseUs = () => {

  return (
    <section id='Choose Us'
    className="w-full flex justify-center items-center text-white bg-[#4C86C4] relative overflow-hidden py-10 md:py-8 p-2 md:p-6 bg-[url('/Desk2.svg')] bg-no-repeat bg-cover bg-center">
        
      <div className="flex w-full md:flex-row flex-col p-4 md:p-12 items-center justify-evenly">
           
           <div className='bg-[#4C86C4] shadow-lg shadow-[#000000]/40 py-6 md:py-12 px-4 md:px-8 rounded-2xl'>
                <motion.h2 
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className={` ${quick.className} text-3xl md:text-4xl font-bold mb-4 text-center`}>
                  Why Choose Us</motion.h2>
                
                <ul className="text-sm md:text-lg space-y-2 md:space-y-3">
                    <li className="flex items-center gap-2">
                        <Droplet size={16} className="text-[#04182e]" />
                        Direct From the Source
                    </li>
                    <li className="flex items-center gap-2">
                        <Droplet size={16} className="text-[#04182e]" />
                        Trusted by 200+ Families & Offices
                    </li>
                    <li className="flex items-center gap-2">
                        <Droplet size={16} className="text-[#04182e]" />
                        Fast & Hassle-Free Delivery
                    </li>
                    <li className="flex items-center gap-2">
                        <Droplet size={16} className="text-[#04182e]" />
                        All Your Liquids in One Place
                    </li>
                    <li className="flex items-center gap-2">
                        <Droplet size={16} className="text-[#04182e]" />
                        Reliability You Can Count On
                    </li>
                    <li className="flex items-center gap-2">
                        <Droplet size={16} className="text-[#04182e]" />
                        Local Service, Personal Touch
                    </li>
                </ul>

           </div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }} 
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.2 }}
            className="relative w-40 h-40 md:w-80 md:h-80"
          >
            <Image src={assets.delivery} alt="delivery" fill className="object-contain"/>
          </motion.div>


      </div>
    </section>

  );
};

export default ChooseUs;