import React from "react";
import Contact from './Contact';
import { Quicksand } from 'next/font/google';
import { motion } from "framer-motion";


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <section className="relative bg-white text-black py-10 px-6 mt-14 overflow-hidden">

      <div className="relative max-w-3xl mx-auto py-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={textVariants}
          className={` ${quick.className} text-3xl md:text-4xl font-semibold mb-4`}>About Us</motion.h2>
       
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={1}
          variants={textVariants}
          className="mb-4">
          At <span className="font-semibold">Liquido</span>, we deliver everyday essentials from drinking water to 
          liquid soaps, quality wines, beverages, and perfumes, we specialize in delivering liquid-based products 
          that keep you refreshed, clean, and confident. 
        </motion.p>

        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={2}
          variants={textVariants}
          className="mb-4">
          Our mission is to bring hydration, hygiene, and household necessities right to your doorstep with ease. 
          Whether you are ordering a single pack or placing a bulk request, we ensure fast delivery, 
          unbeatable prices, and consistent quality backed by trusted supplier partnerships.
        </motion.p>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={3}
          variants={textVariants}
        >
          With <span className="font-semibold"> Liquido</span>, you are not just buying products, you are choosing convenience, reliability and care. 
          We are here to serve homes, offices, and businesses with liquid essentials that fit your style, 
          taste, and everyday needs.
          <span className="font-semibold"> Liquido</span> - Everything Liquid, Delivered with Ease.
        </motion.p>
      </div>
      
    </section>
  );
};

export default About;
