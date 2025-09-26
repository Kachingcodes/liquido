"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

const images = [
    "/trusted/banahGrace.jpg",
    "/trusted/darwayCoast.jpg",
    "/trusted/ivy.jpg",
    "/trusted/landmark1.jpg",
    "/trusted/landmark2.jpg",
    "/trusted/luxolHomes.jpg",
    "/trusted/mikano.jpg",
    "/trusted/solarPro.jpg",
    "/trusted/togaTravels.jpg",
    "/trusted/wgTrips.jpg"
];

export default function Trusted() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"], // scroll from start to end
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // slower or faster
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
