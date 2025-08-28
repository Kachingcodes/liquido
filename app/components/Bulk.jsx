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
    <section className="w-full flex justify-center items-center bg-[#1C4672] text-black relative overflow-hidden py-6">
        <div className="flex w-full p-8 items-center justify-start gap-12">
            
            {/* Left image */}
            <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative w-76 h-76 flex-shrink-0"
            >
            <Image src={assets.jugs} alt="jugs" fill className="object-contain" />
            </motion.div>

            {/* Text box */}
            <div className="max-w-xl">
                <h1 className={`${quick.className} py-12 px-10 text-4xl text-white`}>
                    Bulk Orders
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <ul className="text-black text-md list-none space-y-2">
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

                    <div className="flex flex-row items-center justify-between mt-6">
                        <button className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-lg rounded-lg w-fit hover:bg-[#8FC0F4] transition">
                            Book Rep <MessageSquareText className="text-lg" />
                        </button>

                        <button className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-lg rounded-lg w-fit hover:bg-[#8FC0F4] transition">
                            Fill Form <NotebookPen className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right image pinned */}
            <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute right-0 w-90 h-90"
            >
            <Image src={assets.bulk} alt="bulk" fill className="object-contain"/>
            </motion.div>

        </div>
    </section>

  );
};

export default Bulk;