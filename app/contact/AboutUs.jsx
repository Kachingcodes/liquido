import React from "react";
import Contact from './Contact';
import { Quicksand } from 'next/font/google';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const About = () => {
  return (
    <section className="relative bg-white text-black py-10 px-6 mt-14 overflow-hidden">

      {/* Content */}
      <div className="relative max-w-3xl mx-auto py-4">
        <h2 className={` ${quick.className} text-3xl md:text-4xl font-semibold mb-4`}>About Us</h2>
        <p className="mb-4">
          At <span className="font-semibold">Liquido</span>, we believe every drop matters. 
          We provide high-quality liquid products—from clean, refreshing water to specialty liquids 
          for homes, businesses, and industries.
        </p>
        <p className="mb-4">
          Our mission is simple: to make access to essential and premium liquids easy, reliable, and affordable. 
          With a commitment to quality and customer satisfaction, we ensure every product we deliver adds value to your life.
        </p>
        <p>
          Whether it’s hydration, refreshment, or specialized solutions, 
          <span className="font-semibold">Liquido</span> is here to serve you—one drop at a time.
        </p>
      </div>

      {/* <div className="relative z-10">
        <Contact/>
      </div> */}
      
    </section>
  );
};

export default About;
