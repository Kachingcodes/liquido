'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { testimonials } from '@/public/assets';
import { Quicksand } from "next/font/google";
import { ArrowBigLeft, ArrowBigRight, MessageCircle } from 'lucide-react';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -80, transition: { duration: 0.3 } },
};

const Testimonials = () => {
    const [currentReview, setCurrentReview] = useState(0);
    const visibleReviews = 3;

    const nextReview = () => {
        setCurrentReview((prev) => (prev + visibleReviews) % testimonials.length);
    };

    const prevReview = () => {
        setCurrentReview((prev) => prev - visibleReviews < 0 ? testimonials.length - visibleReviews: prev - visibleReviews
    );
    };

    const visibleTestimonials = testimonials.slice(currentReview, currentReview + visibleReviews);

  return (
    <section id='Testimonials'
    className="w-full flex justify-center items-center bg-white text-black relative overflow-hidden px-4 md:px-8 py-10 md:py-18">
        <div className="flex w-full max-w-7xl flex-col md:flex-row items-start justify-between gap-6 md:gap-12">
            
            {/* Left Section */}
            <div className="w-full md:w-1/4 flex flex-col gap-3 md:gap-6">
                <motion.h1 
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className={`${quick.className} text-3xl md:text-4xl`}>
                    What Our Customers Are Saying
                </motion.h1>  

                <div className='flex flex-row gap-1 md:gap-3 text-black'>
                    <ArrowBigLeft onClick={prevReview}
                    className="cursor-pointer hover:scale-110 transition"/>
                    <MessageCircle/>
                    <MessageCircle/>
                    <MessageCircle/>
                    <ArrowBigRight onClick={nextReview} 
                    className="cursor-pointer hover:scale-110 transition"/>
                </div>     
            </div>

            {/* Testimonials Grid */}
            <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={currentReview}
            >
            <AnimatePresence>
            {visibleTestimonials.map((test) => (
                <motion.div 
                key={test.id}
                variants={itemVariants}
                exit={{ opacity: 0, x: -80 }}

                className='flex flex-col rounded-2xl overflow-hidden shadow-md shadow-[#000000]/40 min-h-[280px] md:min-h-[280px]'> 
                    <div className='text-[#1C4672] p-4 md:p-6 text-center flex-grow'>
                        <p>{test.review}</p>
                    </div>
                    <div className='bg-[#1C4672] text-white flex flex-row items-center gap-4 p-4 md:p-6'>
                        <div className='relative w-8 h-8 md:w-16 md:h-16'>
                            <Image src={assets.foot1} alt="Customer 1" fill className="rounded-full object-cover"/>
                        </div>
                        <p className='font-semibold'>{test.name}</p>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
            </motion.div>
        </div>
    </section>

  );
};

export default Testimonials;