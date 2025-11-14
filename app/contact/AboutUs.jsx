import React from "react";
import Contact from './Contact';
import { Quicksand } from 'next/font/google';
import { motion } from "framer-motion";


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const About = () => {
  return (
    <section id="About"
    className="relative bg-white text-black py-10 px-6 overflow-hidden">

      <div className="relative max-w-3xl mx-auto py-4">
        <motion.h2
          initial={{x: -100, opacity: 0 }}
          whileInView={{x: 0, opacity: 1}}
          transition={{ duration: 1.0 }}
          className={` ${quick.className} text-3xl md:text-4xl font-semibold mb-4`}>About Us</motion.h2>
       
        <p className="mb-4">
          At <span className="font-semibold">Liquido</span>, we deliver everyday essentials from drinking water to 
          liquid soaps, quality wines, beverages, and perfumes, we specialize in delivering liquid-based products 
          that keep you refreshed, clean, and confident. 
        </p>

        <p className="mb-4">
          Our mission is to bring hydration, hygiene, and household necessities right to your doorstep with ease. 
          Whether you are ordering a single pack or placing a bulk request, we ensure fast delivery, 
          unbeatable prices, and consistent quality backed by trusted supplier partnerships.
        </p>

        <p>
          With <span className="font-semibold"> Liquido</span>, you are not just buying products, you are choosing convenience, reliability and care. 
          We are here to serve homes, offices, and businesses with liquid essentials that fit your style, 
          taste, and everyday needs.
          <span className="font-semibold"> Liquido</span> - Everything Liquid, Delivered with Ease.
        </p>
      </div>
      
    </section>
  );
};

export default About;
