"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/public/assets"; 
import { steps } from "@/public/assets";

export default function StepsOrder() {
  return (
    <section className="flex flex-col gap-3 md:gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.3 }} // stagger effect
          className="bg-[#3A699A]/40 hover:bg-[#1C4672] p-4 rounded-lg flex items-center gap-2 md:gap-4 shadow-md shadow[#000000]/50 relative"
        >
          {/* Drop image with number */}
          <div className="relative w-18 h-18 flex-shrink-0">
            <Image src={assets.drop} alt="drop" fill className="object-contain"/>
            <h2 className="absolute inset-0 flex items-center justify-center text-md md:text-xl font-bold text-[#1C4672] mt-2">
              {step.id}
            </h2>
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-200 text-md md:text-lg">{step.title}</span>
            <p className="text-sm md:text-md text-white">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
