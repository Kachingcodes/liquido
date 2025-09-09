'use client';
import React from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { ShoppingCart, Star, Home, Truck, Recycle, PartyPopper, DollarSign, Bell, Phone, HelpCircle, Clock } from "lucide-react";
import Link from 'next/link';

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

const LeftSide = () => {

  return (    
    <div className='flex flex-col items-center justify-start py-2 space-y-6'>
        {/* Logo + Title */}
        <div className="relative w-24 h-16">
            <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>
        
        <h1 className={`${quick.className} text-[#c4e0f9] text-2xl font-semibold`}>
            LIQUIDO STORES
        </h1>
            
        {/* Quick Actions */}
        <div className="w-full px-4 text-white text-sm space-y-3 cursor-pointer">
            <h2 className="text-lg font-semibold border-b border-white/30 pb-1">Quick Actions</h2>
            <Link href= "/">
                <div className="flex items-center gap-2 mb-3 hover:text-[#c4e0f9]"><Home size={16}/> Home</div>
            </Link>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><ShoppingCart size={16}/> View Cart</div>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><Star size={16}/> Favorites / Wishlist</div>
        </div>

        {/* Delivery Info */}
        <div className="w-full px-4 text-white text-sm space-y-3 cursor-pointer">
            <h2 className="text-lg font-semibold border-b border-white/30 pb-1">Delivery & Info</h2>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><Truck size={16}/> Delivery Options</div>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><Recycle size={16}/> Refill & Recycling Info</div>
        </div>

        {/* Promotions / Offers */}
        <div className="w-full px-4 text-white text-sm space-y-3 cursor-pointer">
            <h2 className="text-lg font-semibold border-b border-white/30 pb-1">Promotions / Offers</h2>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><PartyPopper size={16}/> “Buy 2, Get 1 Free”</div>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><DollarSign size={16}/> Discounts for bulk orders</div>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><Bell size={16}/> Seasonal offers</div>
        </div>

        {/* Help / Support */}
        <div className="w-full px-4 text-white text-sm space-y-3 cursor-pointer">
            <h2 className="text-lg font-semibold border-b border-white/30 pb-1">Help / Support</h2>
            <Link href="/contact">
                <div className="flex items-center gap-2 mb-3 hover:text-[#c4e0f9]"><Phone size={16}/> Contact Support</div>
            </Link>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><HelpCircle size={16}/> FAQ</div>
            <div className="flex items-center gap-2 hover:text-[#c4e0f9]"><Clock size={16}/> Delivery Hours</div>
        </div>
    </div>
              );
};

export default LeftSide;