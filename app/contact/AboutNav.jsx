'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Phone, HomeIcon, ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import { assets } from "@/public/assets";
import { motion, AnimatePresence } from 'framer-motion';
import { GiShoppingCart } from "react-icons/gi";
              


const AboutNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drops, setDrops] = useState([]);

  const handleDrop = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const newDrop = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY,
    };

    setDrops((prev) => [...prev, newDrop]);

    setTimeout(() => {
      setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
    }, 2000);
  };

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
    <header className="w-full fixed top-0 left-0 bg-[#4C86C4] z-50">
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
                onClick={(e) => {
                  handleDrop(e);
                  setIsOpen(false)
                }}
                className="bg-[white] px-2 py-3 flex items-center gap-2 shadow-md shadow-[#000000]/50 text-[#1C4672] text-sm rounded-lg w-fit hover:bg-[#8FC0F4]/40 hover:text-white transition"
                >
                Home <HomeIcon size={20}/>
                </Link>  
            </li>

            <li>
                <Link 
                href="/shop"
                onClick={(e) => {
                handleDrop(e);
                setIsOpen(false)
              }}
                className="bg-[white] px-2 py-3 flex items-center gap-2 shadow-md shadow-[#000000]/50 text-[#1C4672] text-sm rounded-lg w-fit hover:bg-[#8FC0F4]/40 hover:text-white transition"
                >
                Shop <GiShoppingCart size={20}/>
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
            className="absolute top-full left-0 w-full max-w-sm md:hidden bg-[#4C86C4] shadow-md z-50 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-between px-6 py-6 space-y-4">
              <Link 
                href="/"
                className="flex items-center justify-center gap-2 py-2 px-2 bg-white text-[#1C4672] rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                <span>Home</span>
                <HomeIcon className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/shop"
                className="flex items-center justify-center gap-2 py-2 px-2 bg-white text-[#1C4672] rounded-2xl"
                onClick={() => setIsOpen(false)}
              >
                <span>Shop</span>
                <GiShoppingCart className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* DROPS */}
        <AnimatePresence>
        {drops.map((drop) => (
          <motion.img
          key={drop.id}
          src="/drop.png"
          alt="drop"
          initial={{ top: drop.y, left: drop.x, opacity: 1, position: "absolute" }}
          animate={{ top: drop.y + 100, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="w-10 h-10 pointer-events-none"
        />
        ))}
        </AnimatePresence>

        <Link 
        href="/shop"
        className="fixed right-2 bottom-2 p-3 bg-black text-[#E0F2FE] rounded-full text-sm"
        onClick={() => setIsOpen(false)}
        >
          <GiShoppingCart size={22}/>
        </Link>
    </header>
  );
};

export default AboutNav;
