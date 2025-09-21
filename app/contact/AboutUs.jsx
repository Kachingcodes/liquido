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
          At <span className="font-semibold">Liquido</span>, we believe every drop matters. 
          We provide high-quality liquid products—from clean, refreshing water to specialty liquids 
          for homes, businesses, and industries.
        </motion.p>

        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={2}
          variants={textVariants}
          className="mb-4">
          Our mission is simple: to make access to essential and premium liquids easy, reliable, and affordable. 
          With a commitment to quality and customer satisfaction, we ensure every product we deliver adds value to your life.
        </motion.p>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          custom={3}
          variants={textVariants}
        >
          Whether it’s hydration, refreshment, or specialized solutions, 
          <span className="font-semibold"> Liquido</span> is here to serve you—one drop at a time.
        </motion.p>
      </div>
      
    </section>
  );
};

export default About;
