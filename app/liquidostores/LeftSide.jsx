'use client';
import React from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { ShoppingCart, Star, Home, Phone, HelpCircle, StarOff, MinusCircle, ArrowRight } from "lucide-react";
import Link from 'next/link';

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

const LeftSide = ({showFavorites, setShowFavorites, isOpen, setIsOpen, showCart, setShowCart}) => {

  return (    
    <div className='flex flex-col items-center justify-start py-2 space-y-6 z-100'>
        {/* Logo + Title */}
        <div className="relative w-24 h-16">
            <Image src={assets.logo} alt="logo" fill className="object-contain" />
        </div>
        
        <h1 className={`${quick.className} text-[#c4e0f9] text-xl text-center font-semibold`}>
            LIQUIDO STORES
        </h1>
            
        {/* Quick Actions */}
        <div className="w-full px-4 text-white space-y-3 cursor-pointer">
            <h2 className="text-md font-semibold border-b border-white/30 pb-1">Quick Actions</h2>
            <Link href= "/">
                <div className="flex text-sm items-center gap-2 mb-3 hover:text-[#c4e0f9]"><Home size={16}/> Home</div>
            </Link>
            <div 
            onClick={() => { 
                if(showCart) {
                    setShowCart(false);
                } else {
                    setShowCart(true);
                    setIsOpen(false); 
                    setShowFavorites(false) 
                }
                }}
            className="flex text-sm items-center gap-2 hover:text-[#c4e0f9]"
            >
                {showCart ? (
                    <> <MinusCircle size={16}/> Close Cart </>
                ) : (
                    <><ShoppingCart size={16}/> View Cart</>
                )}
                </div>
            
            <div
                onClick={() => { 
                if (showFavorites) {
                    setShowFavorites(false);
                } else{
                    setShowFavorites(true);
                    setShowCart(false);
                    setIsOpen(false);
                    }
                }}
                className="flex items-center text-sm gap-2 cursor-pointer text-white hover:text-[#c4e0f9]"
                >       
                {showFavorites ? (
                    <> <StarOff size={16} /> Hide Favorites </>
                ) : (
                    <> <Star size={16} /> Favorites / Wishlist </>
                )}
                </div>
        </div>

        {/* Delivery Info */}
        <div className="w-full px-4 text-white space-y-3 cursor-pointer">
            <h2 className="text-md font-semibold border-b border-white/30 pb-1">Delivery Hours</h2>
            <p className='flex items-center justify-evenly text-sm'>Sundays <ArrowRight size={14}/> 1PM - 6PM</p>
            <p className='flex items-center justify-evenly text-sm'>Mondays <ArrowRight size={14}/> 9AM - 6PM</p>
            <p className='flex items-center justify-evenly text-sm'>Tuesdays <ArrowRight size={14}/> 9AM - 6PM</p>
            <p className='flex items-center justify-evenly text-sm'>Wednesdays <ArrowRight size={14}/> 9AM - 6PM</p>
            <p className='flex items-center justify-evenly text-sm'>Thursdays <ArrowRight size={14}/> 9AM - 6PM</p>
            <p className='flex items-center justify-evenly text-sm'>Fridays <ArrowRight size={14}/> 9AM - 6PM</p>
            <p className='flex items-center justify-evenly text-sm'>Saturdays <ArrowRight size={14}/> 9AM - 6PM</p>
        </div>

        {/* Help / Support */}
        <div className="w-full px-4 text-white space-y-3 cursor-pointer">
            <h2 className="text-md font-semibold border-b border-white/30 pb-1">Help / Support</h2>
            <Link href="/contact">
                <div className="text-sm flex items-center gap-2 mb-3 hover:text-[#c4e0f9]"><Phone size={16}/> Contact Support</div>
            </Link>
            <Link href="/contact#FAQ">
                <div className="text-sm flex items-center gap-2 mb-3 hover:text-[#c4e0f9]"><HelpCircle size={16}/> FAQ</div>
            </Link>
            {/* <Link href="/contact">
                <div className="text-sm flex items-center gap-2 mb-3 hover:text-[#c4e0f9]"><Clock size={16}/> Delivery Hours</div>
            </Link> */}
        </div>
    </div>
    );
};

export default LeftSide;