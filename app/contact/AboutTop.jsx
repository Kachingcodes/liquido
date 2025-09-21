import React from "react";
import Contact from './Contact';
import { Quicksand } from 'next/font/google';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const AboutTop = () => {
  return (
    <section
    className="relative w-full bg-[#1C4672] h-[46vh] md:h-[60vh] mt-8 bg-no-repeat bg-contain flex items-center justify-center"
    style={{ backgroundImage: "url('/van.png')" }}
    >
    {/* Dark overlay (optional) */}
    <div className="absolute inset-0 bg-black/20"></div>

        {/* Centered text */}
        <h1 className="relative z-10 text-white text-4xl font-bold text-center">
            Welcome to Liquido 💧
        </h1>
    </section>

  );
};

export default AboutTop;
