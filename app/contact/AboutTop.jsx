import React from "react";
import Contact from './Contact';
import { Quicksand } from 'next/font/google';
import { motion } from 'framer-motion';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const AboutTop = () => {
  return (
    <section
    className="relative w-full bg-[#1C4672] h-[46vh] md:h-[56vh] mt-8 bg-no-repeat bg-contain flex items-center justify-center"
    style={{ backgroundImage: "url('/van.png')" }}
    >
    {/* Dark overlay (optional) */}
    <div className="absolute inset-0 bg-black/20"></div>
        {/* Centered Text */}
        <motion.h1 
        initial={{y: -100, opacity: 0 }}
        whileInView={{y: 0, opacity: 1}}
        transition={{ duration: 1.0 }}
        className={`${quick.className} text-3xl md:text-5xl relative z-10 md:mt-0 mt-30 text-white font-bold text-center`}>
          GET IN TOUCH
        </motion.h1>
    </section>
  );
};

export default AboutTop;
