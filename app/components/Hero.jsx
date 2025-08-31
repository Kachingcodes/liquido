'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'; 


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const Hero = () => {
    const router = useRouter(); 

  const handlePlaceOrder = () => {
    router.push("/shop"); 
  };

  return (
    <section className="w-full h-screen p-2 md:p-8 flex justify-center items-center bg-[#4C86C4] text-white relative overflow-hidden px-2 md:px-4 py-2 md:py-20">
      <div className="flex flex-col md:flex-row w-full p-2 md:p-8 items-center justify-evenly">
        
        {/* Desktop / Tablet Background */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover hidden md:block"
          style={{ backgroundImage: "url('/heroside.svg')" }}
        ></div>

        {/* Mobile Background */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover block md:hidden"
          style={{ backgroundImage: "url('/phonehero.svg')" }}
        ></div>

          {/* Left Section */}
          <div className="relative w-full md:w-1/2 flex flex-col gap-4">
            <h1 className={`${quick.className} text-2xl md:text-4xl`}>
              Sustainable Delivery for Every Sip
            </h1>

            <span className="text-md md:text-lg">
              From crystal-clear water to premium beverages, 
              we bring freshness, quality, and convenience 
              right to your doorstep — every time, without compromise
            </span>

            <button 
            onClick={handlePlaceOrder}
            className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-lg rounded-lg w-fit hover:bg-[#8FC0F4]/40 transition">
              Place Order <ShoppingCartIcon className='text-lg'/>
            </button>

            {/* Social Icons in a row */}
            <div className="flex flex-row gap-4 mt-2">
              <div className="relative w-10 h-10">
                <Image src={assets.foot1} alt="whatsapp" fill className="object-contain" />
              </div>
              <div className="relative w-10 h-10">
                <Image src={assets.foot2} alt="instagram" fill className="object-contain" />
              </div>
              <div className="relative w-10 h-10">
                <Image src={assets.foot3} alt="tiktok" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">
            {/* First Circle - Up */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute right-4 md:right-10 mb-10 w-40 h-40 md:w-80 md:h-80 
              bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
              rounded-full shadow-md shadow-[#000000]/20 flex items-center justify-center">
              <Image src={assets.water1} alt="Water1" fill className="object-contain" />
            </motion.div>

            {/* Second Circle - Down*/}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute left-11 md:left-10 top-20 w-30 h-30 md:w-60 md:h-60
              bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
              rounded-full flex items-center justify-center">
              <Image src={assets.water2} alt="Water2" className="w-[80%] object-contain" />
            </motion.div>
          </div>

        {/* Van at bottom right */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 right-2 md:right-20 w-32 h-32 md:w-64 md:h-64">
          <Image src={assets.van} alt="van" fill className="object-contain" />
        </motion.div>

      </div>
    </section>

  );
};

export default Hero;