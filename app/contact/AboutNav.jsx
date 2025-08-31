'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Phone, HomeIcon, ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import { assets } from "@/public/assets";
import { motion, AnimatePresence } from 'framer-motion';

const AboutNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const liquidSections = ['Home'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="w-full fixed top-0 left-0 bg-[#3A699A] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src={assets.logo}
            alt="logo"
            className="w-[60%] h-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
            <li>
                <Link 
                href="/"
                className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-md rounded-lg w-fit hover:bg-[#8FC0F4]/40 transition"
                >
                Home <HomeIcon className="text-md" />
                </Link>  
            </li>

            <li>
                <Link 
                href="/shop"
                className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-md rounded-lg w-fit hover:bg-[#8FC0F4]/40 transition"
                >
                Shop <ShoppingCartIcon className="text-md" />
                </Link>  
            </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full max-w-sm md:hidden bg-[#3A699A] shadow-md z-50 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-between px-6 py-4 space-y-4">
              <Link 
                href="/"
                className="flex items-center justify-center gap-3 py-3 px-4 bg-[#1C4672] text-white rounded-2xl hover:bg-[#8FC0F4]/40 transition"
                onClick={() => setIsOpen(false)}
              >
                <span>Home</span>
                <HomeIcon className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/shop"
                className="flex items-center justify-center gap-3 py-3 px-4 bg-[#1C4672] text-white rounded-2xl hover:bg-[#8FC0F4]/40 transition"
                onClick={() => setIsOpen(false)}
              >
                <span>Shop</span>
                <ShoppingCartIcon className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AboutNav;
