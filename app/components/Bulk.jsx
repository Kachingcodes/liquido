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

const TextTiller = () => {
   let message = `Kindly fill out the blanks befor hitting send: \n\n
    Hello Liquido 💧, I’d like to make a bulk order / event booking.\n
    My name is: ______\n
    Event type (Owambe, Birthday, Wedding, Party, Supermarket, Estate, Bulk Stocking): ______\n
    Quantity needed: ______\n
    Event date / delivery schedule: ______\n
    Location: ______`;
    const url = `https://wa.me/2347062757706?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section id='Bulk Order'
    className="w-full flex justify-center items-center text-black relative overflow-hidden py-4 bg-no-repeat bg-cover bg-center">
        <div className="flex w-full p-4 md:p-6 items-center justify-center">

            <div className="max-w-xl rounded-lg shadow-md shadow-[#000000]/40 py-7 px-4 md:px-7">
                <div className='flex items-center justify-between'>
                    <motion.h1 
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                        className={`${quick.className} text-3xl md:text-4xl`}>
                        Bulk Orders
                    </motion.h1>

                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }} 
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 1.2 }}
                        className="relative w-40 h-20 mb-8"
                    >
                        <Image src={assets.bulk} alt="bulk" className="object-contain"/>
                    </motion.div>
                </div>

                <div className="mt-8 md:mt-4">
                    <ul className="text-sm md:text-lg list-none space-y-2">
                    <li className="before:content-['➜'] before:mr-2 before:text-[#04182e]">
                        From estates to supermarkets, events to parties — no order is too big.
                    </li>
                    <li className="before:content-['➜'] before:mr-2 before:text-[#04182e]">
                        Whether it’s owambe, birthdays, weddings, or bulk stocking, get reliable bulk water delivery, flexible schedules, and cost-effective pricing — all tailored for your needs.
                    </li>
                    <li className="before:content-['➜'] before:mr-2 before:text-[#04182e]">
                        Connect with our sales rep or book directly through our B2B form.
                    </li>
                    </ul>

                    <div className="flex flex-row items-center justify-between mt-4 md:mt-6">
                        <button onClick={TextTiller}
                        className="bg-[#1C4672] px-4 py-3 flex items-center justify-center gap-2 text-white text-sm md:text-md 
                        rounded-lg w-full hover:bg-white hover:text-[#1C4672] transition shadow-md shadow-[#000000]/40">
                            Book Rep <MessageSquareText size={20}/>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </section>

  );
};

export default Bulk;

//Create a redirect page to fill forms. When done include a button to continue to Intro page
//Create a collection in firestore called bulkOrders to collect orders filled through the form
