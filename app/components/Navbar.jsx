'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { assets } from "@/public/assets"
import { Phone } from 'lucide-react';


const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Order', href: '#order' },
  { name: 'Why Choose Us', href: '#why-us' },
  { name: 'Delivery', href: '#delivery' },
  { name: 'Testimonials', href: '#testimonials' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-[#3A699A] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
<Image
src={assets.logo}
alt='logo'
className="w-auto h-auto"
/>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-red-500 transition"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-md rounded-lg w-fit hover:bg-[#8FC0F4]/40 transition"
           >
            Contact <Phone className='text-md'/>
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 hover:text-red-500 transition"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="block text-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;