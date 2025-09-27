'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import { assets } from "@/public/assets";
import { motion, AnimatePresence } from 'framer-motion';
import { GiShoppingCart } from "react-icons/gi";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drops, setDrops] = useState([]);

   const handleDrop = () => {
  const newDrop = {
    id: Date.now(), // unique id
  };
  setDrops((prev) => [...prev, newDrop]);

  // Remove drop after animation finishes
  setTimeout(() => {
    setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
  }, 1500);
};

  const liquidSections = ['Home', 'Categories', 'Order', 'Choose Us', 'Bulk', 'Testimonials'];

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
    <header className="w-full fixed top-0 left-0 bg-[#4C86C4] shadow z-50">
      <div className="max-w-7xl mx-auto px-8 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src={assets.logo}
            alt="logo"
            className="w-[60%] h-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center">
          {liquidSections.map((section) => (
            <li key={section}>
              <ScrollLink
                to={section}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="text-white hover:text-[#1C4672] text-sm transition list-none cursor-pointer"
              >
                {section}
              </ScrollLink>
            </li>
          ))}
          <li>
            <Link 
              href="/shop"
              onClick ={() => {
                  handleDrop();
                  setIsOpen(false);
                }}
              className="bg-[white] px-2 py-3 flex items-center gap-2 shadow-md shadow-[#000000]/50 text-[#1C4672] text-sm rounded-lg w-fit hover:bg-[#8FC0F4]/40 hover:text-white transition"
            >
              Shop <GiShoppingCart size={18}/>
            </Link>               
          </li>
          <li>
            <Link 
              href="/contact"
              onClick ={() => {
                  handleDrop();
                  setIsOpen(false);
                }}
              className="bg-[white] px-2 py-3 flex items-center gap-2 shadow-md shadow-[#000000]/50 text-[#1C4672] text-sm rounded-lg w-fit hover:bg-[#8FC0F4]/40 hover:text-white transition"
            >
              Contact <Phone size={18} />
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
            <hr className='text-white'/>

            <div className="flex-1 flex flex-col justify-between px-6 py-4 space-y-4">
             
              {liquidSections.map((section) => (
                <ScrollLink
                  key={section}
                  to={section}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="block font-medium text-white text-sm cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {section}
                </ScrollLink>
              ))}
              <Link 
                href="/shop"
                className="flex items-center justify-center gap-3 py-3 px-4 bg-white text-[#1C4672] rounded-2xl text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span>Shop</span>
                <GiShoppingCart size={18}/>
              </Link>
              <Link 
                href="/contact"
                className="flex items-center justify-center gap-3 py-3 px-4 bg-white text-[#1C4672] rounded-2xl text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span>Contact</span>
                <Phone className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        <AnimatePresence>
          {drops.map((drop) => (
          <motion.img
          key={drop.id}
          src="/drop.png"
          alt="drop"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 100, opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="absolute right-50 w-10 top-12 -translate-x-1/2"
          />
          ))}
        </AnimatePresence>

        <Link 
          href="/liquidostores"
          className="fixed right-2 bottom-12 p-3 bg-[#092850] hover:bg-[#305f9e] text-[#E0F2FE] rounded-full text-sm shadow shadow-[#000000]/50"
          onClick={() => setIsOpen(false)}
        >
          <GiShoppingCart size={30}/>
        </Link>
    </header>
  );
};

export default Navbar;