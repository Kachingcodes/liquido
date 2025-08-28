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
    <section className="w-full flex justify-center items-center bg-[#1C4672] text-white relative overflow-hidden py-20 p-6">
      <div className="flex w-full p-12 items-center justify-evenly">
           
           <div className='bg-[#406c9b] py-12 px-8 rounded-2xl'>
                <h2 className={` ${quick.className} text-white text-4xl font-bold mb-4`}>Why Choose Us</h2>
                
                <ul className="text-lg text-white space-y-3">
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
          transition={{ duration: 1.2 }}
          className="relative w-72 h-72">
          <Image src={assets.delivery} alt="delivery" fill className="object-contain" />
        </motion.div>

      </div>
    </section>

  );
};

export default ChooseUs;