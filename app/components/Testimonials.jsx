'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
import { ArrowBigLeft, ArrowBigRight, MessageCircle } from 'lucide-react';

const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});


const Testimonials = () => {
  return (
    <section className="w-full flex justify-center items-center bg-[#4C86C4] text-white relative overflow-hidden px-8 py-20">
        <div className="flex w-full max-w-7xl items-start justify-between gap-12">
            
            {/* Left Section */}
            <div className="w-full md:w-1/4 flex flex-col gap-6">
                <h1 className={`${quick.className} text-4xl`}>
                    What Our Customers Are Saying
                </h1>  
                <div className='flex flex-row gap-3 text-white'>
                    <ArrowBigLeft className="cursor-pointer hover:scale-110 transition"/>
                    <MessageCircle/>
                    <MessageCircle/>
                    <MessageCircle/>
                    <ArrowBigRight className="cursor-pointer hover:scale-110 transition"/>
                </div>     
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            
            {/* Card 1 */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg">
                {/* Testimonial Text */}
                <div className="bg-[#E0F2FE] text-[#1C4672] p-6 text-center">
                    <p className=''>
                        "This service is amazing! Always on time and super reliable. 
                        I never have to worry about delays anymore, and the quality is consistently excellent."  
                    </p>
                </div>

                {/* Customer Info in a Row */}
                <div className="bg-[#1C4672] text-white flex flex-row items-center gap-4 p-6">
                    <div className="relative w-16 h-16">
                    <Image
                        src={assets.foot1}
                        alt="Customer 1"
                        fill
                        className="rounded-full object-cover"
                    />
                    </div>
                    <p className="font-semibold">Sunflower</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg">
                {/* Testimonial Text */}
                <div className="bg-[#E0F2FE] text-[#1C4672] p-6 text-center">
                    <p>
                        "Fantastic quality and great customer service! 
                        Every order feels personalized, and they go the extra mile to make sure everything is perfect."  
                    </p>
                </div>

                {/* Customer Info in a Row */}
                <div className="bg-[#1C4672] text-white flex flex-row items-center gap-4 p-6">
                    <div className="relative w-16 h-16">
                        <Image src={assets.foot1} alt="Customer 1" fill className="rounded-full object-cover"/>
                    </div>
                    <p className="font-semibold">Daisy</p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg">
                {/* Testimonial Text */}
                <div className="bg-[#E0F2FE] text-[#1C4672] p-6 text-center">
                    <p>
                        "I recommend them to all my friends and family! 
                        Professional, trustworthy, and always exceed my expectations. Truly a stress-free experience."
                    </p>
                </div>

                {/* Customer Info in a Row */}
                <div className="bg-[#1C4672] text-white flex flex-row items-center gap-4 p-6">
                    <div className="relative w-16 h-16">
                        <Image src={assets.foot1} alt="Customer 1" fill className="rounded-full object-cover"/>
                    </div>
                        <p className="font-semibold">Rose</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

  );
};

export default Testimonials;