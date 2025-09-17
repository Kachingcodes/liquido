'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { MessageSquareText, NotebookPen } from 'lucide-react';

const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});


const Bulk = () => {

  return (
    <section id='Bulk'
    className="w-full flex justify-center items-center text-black relative overflow-hidden py-6  bg-no-repeat bg-cover bg-center">
        <div className="flex w-full p-4 md:p-8 items-center justify-evenly md:mb-0 mb-10">
            
            {/* Left image */}
            {/* <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="hidden md:flex relative w-82 h-82 flex-shrink-0"
            >
            <Image src={assets.jugs} alt="jugs" fill className="object-contain" />
            </motion.div> */}

            {/* Text box */}
            <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="max-w-xl rounded-lg shadow-md shadow-[#000000]/40 py-7 px-4 md:px-7">
                <h1 className={`${quick.className} text-3xl md:text-4xl`}>
                    Bulk Orders
                </h1>
                <div className="mt-4">
                    <ul className=" text-md list-none space-y-2">
                    <li className="before:content-['➜'] before:mr-2 before:text-[#04182e]">
                        From estates to factories, no order is too big.
                    </li>
                    <li className="before:content-['➜'] before:mr-2 before:text-[#04182e]">
                        Get reliable bulk water delivery, flexible schedules, and cost-effective pricing — all tailored for your business.
                    </li>
                    <li className="before:content-['➜'] before:mr-2 before:text-[#04182e]">
                        Connect with our sales rep or book directly through our B2B form.
                    </li>
                    </ul>

                    <div className="flex flex-row items-center justify-between mt-4 md:mt-6">
                        <button className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-sm md:text-md 
                        rounded-lg w-fit hover:bg-white hover:text-[#1C4672] transition shadow-md shadow-[#000000]/40">
                            Book Rep <MessageSquareText className="text-sm" />
                        </button>

                        <button className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-sm md:text-md 
                        rounded-lg w-fit hover:bg-white hover:text-[#1C4672] transition shadow-md shadow-[#000000]/40">
                            Fill Form <NotebookPen className="text-sm md:text-lg" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Right image pinned */}
            <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }} 
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 1.2 }}
            className="absolute right-0 bottom-0  w-60 h-60 md:w-120 md:h-120"
            >
                <Image src={assets.bulk} alt="bulk" fill className="object-contain"/>
            </motion.div>

        </div>
    </section>

  );
};

export default Bulk;