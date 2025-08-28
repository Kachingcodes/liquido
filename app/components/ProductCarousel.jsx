'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/public/assets'



const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentProduct = products[currentSlide];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
      setCurrentImageIndex(0);
    }, 8000); // change product every 8s

    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        (prev + 1) % currentProduct.images.length
      );
    }, 8000); // change image every 2.5s

    return () => clearInterval(imageTimer);
  }, [currentSlide]);

  

  return (
    <section className="w-full bg-white py-10 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        {/* Left - Video */}

<div className="w-full lg:w-1/2 aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
  <video
    key={currentProduct.video}
    src={currentProduct.video}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />
</div>

        {/* Right - Fading Images */}
      <div className="w-full lg:w-1/2 relative aspect-[4/3] sm:aspect-[16/9]">
  <AnimatePresence mode="wait">
    <motion.div
      key={currentProduct.images[currentImageIndex]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 rounded-xl overflow-hidden shadow"
    >
      <Image
        src={currentProduct.images[currentImageIndex]}
        alt={`Product image ${currentImageIndex + 1}`}
        fill
        className="object-cover"
      />
    </motion.div>
  </AnimatePresence>
</div>


      </div>
    </section>
  );
};

export default ProductCarousel;