'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
import { FaXTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa6";
import Link from 'next/link'; 


const Footer = () => {
  const phoneNumber = "2347062757706"; 
  const message = "Hello Liquido 💧. I would like to make some inquiries.";

  return (
   <section className="w-full bg-[#1C4672] text-white relative overflow-hidden px-8 p-4">
  
  {/* Main footer content */}
  <div className="relative flex flex-col gap-6">
    
    {/* Top Content */}
    <div className="flex flex-col md:flex-row w-full justify-between gap-6">
      {/* Column 1 */}
      <div className="flex flex-col gap-3">
        <div className="relative w-30 h-20">
          <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>
        <span className='text-sm'>300+ Customers Satisfied</span>
        <span className='text-sm'>1000+ Deliveries Made</span>
        <span className='text-sm'>Preferred supplier for 50+ businesses</span>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-3 mt-0 md:mt-4">
        <h2 className="font-semibold text-md">Quick Links</h2>
        <Link href= "/contact">
          <span className='text-sm'>About Us</span>
        </Link>
        <span className='text-sm'>Services</span>
        <Link href= "/contact">
        <span className='text-sm'>Contact</span>
        </Link>
        <Link href= "/shop">
        <span className='text-sm'>Shop</span>
        </Link>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-3 mt-0 md:mt-4">
        <h2 className="font-semibold text-md">Trust & Legal</h2>
        <span className='text-sm'>Certifications & Licenses</span>
        <span className='text-sm'>Privacy Policy</span>
        <span className='text-sm'>Terms & Conditions</span>
      </div>
    </div>

    {/* Divider */}
    <hr className="w-full border-t border-[#8FC0F4] opacity-40" />

    {/* Bottom Content */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-sm">© 2025 Corporation</span>

      <div>
        <span className="block font-semibold text-center">Follow Us</span>
        <div className="flex flex-row gap-8 mt-4 text-white">
          <a href="https://twitter.com/liquido_ng" target="_blank" rel="noopener noreferrer">
            <FaXTwitter size={16}/>
          </a>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer">
            <FaWhatsapp size={16}/>
          </a>
          <a href="https://instagram.com/liquido.ng" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={16}/>
          </a>
          </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Footer;

