"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import { images } from '@/public/assets';

const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});


export default function Trusted() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"], // scroll from start to end
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 32, // slower or faster
          ease: "linear",
        },
      },
    });
  }, [controls]);

  const handlePause = () => controls.stop();
  const handlePlay = () =>
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });

  return (
    <div className="relative w-full overflow-hidden py-20">
      <motion.h1 
      initial={{y: -100, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      transition={{ duration: 1.0 }}
      className={` ${quick.className} text-3xl md:text-4xl text-black text-center mb-8 p-2`}>
        TRUSTED BY
      </motion.h1>
      <motion.div
        className="flex gap-8"
        animate={controls}
        onHoverStart={handlePause}
        onHoverEnd={handlePlay}
        onTouchStart={handlePause}
        onTouchEnd={handlePlay}
      >
        {/* duplicate images to create seamless infinite scroll */}
        {[...images, ...images].map((src, i) => (
          <div key={i} className="min-w-[140px] h-[100px] relative">
            <Image
              src={src}
              alt={`scroll-img-${i}`}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
