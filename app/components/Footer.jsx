'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { assets } from '@/public/assets';
import { Quicksand } from "next/font/google";
//import {  } from 'lucide-react';


const Footer = () => {
  return (
   <section className="w-full bg-[#1C4672] text-white relative overflow-hidden px-8 py-10">
  
  {/* Main footer content */}
  <div className="relative flex flex-col gap-12">
    
    {/* Top Content */}
    <div className="flex flex-col md:flex-row w-full justify-between gap-10">
      {/* Column 1 */}
      <div className="flex flex-col gap-3">
        <div className="relative w-20 h-20">
          <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>
        <span>300+ Customers Satisfied</span>
        <span>1000+ Deliveries Made</span>
        <span>Preferred supplier for 50+ businesses</span>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">Quick Links</h2>
        <span>About Us</span>
        <span>Services</span>
        <span>Contact</span>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">Trust & Legal</h2>
        <span>Certifications & Licenses</span>
        <span>Privacy Policy</span>
        <span>Terms & Conditions</span>
      </div>
    </div>

    {/* Divider */}
    <hr className="w-full border-t border-[#8FC0F4] opacity-40" />

    {/* Bottom Content */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-sm">© 2025 Corporation</span>

      <div>
        <span className="block font-semibold text-center">Follow Us</span>
        <div className="flex flex-row gap-4 mt-2">
          <div className="relative w-10 h-10">
            <Image src={assets.foot1} alt="whatsapp" fill className="object-contain" />
          </div>
          <div className="relative w-10 h-10">
            <Image src={assets.foot2} alt="instagram" fill className="object-contain" />
          </div>
          <div className="relative w-10 h-10">
            <Image src={assets.foot3} alt="tiktok" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Footer;