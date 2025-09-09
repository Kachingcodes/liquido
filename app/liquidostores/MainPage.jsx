'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import LeftSide from './LeftSide';
import TopSide from './TopSide';
import Store from './Store';


const MainPage = () => {

  return (
    <section className="w-full min-h-screen flex bg-[#4C86C4] text-white relative overflow-hidden">

        {/* Left side */}
        <div className="w-[16%] bg-[#1C4672]">
            <LeftSide/>
        </div>


        {/* Right side */}
        <div className="w-[84%] flex flex-col">
            {/* Top part */}
            <div className="h-[30%] bg-white">
                <TopSide/>
            </div>

            {/* Bottom part */}
            <div className="flex-1 bg-blue-500 flex items-center justify-center">
                <Store/>
            </div>
        </div>
</section>

  );
};

export default MainPage;
