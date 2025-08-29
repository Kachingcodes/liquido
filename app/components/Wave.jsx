'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
//import {  } from 'lucide-react';


const Wave = () => {
  return (
   <section className="w-full bg-[#4C86C4] relative overflow-hidden py-10">

<div
    className="absolute top-0 left-0 w-full h-40 bg-no-repeat bg-cover"
    style={{ backgroundImage: "url('/footer.svg')" }}
  ></div>
</section>

  );
};

export default Wave;