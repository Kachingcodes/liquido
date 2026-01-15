'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { ShoppingCart, Star, Home, Phone, HelpCircle, StarOff, MinusCircle, ArrowRight, Package, Boxes, History } from "lucide-react";
import Link from 'next/link';
import { FaPerson } from 'react-icons/fa6';
import { useStore } from '@/app/context/StoreContext';
import { useRouter } from 'next/navigation';
import BulkBookingModal from "../../components/BulkBookingModal";



const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

const LeftSide = () => {
    const { favourites, filterByCategoryAndOption, viewFavourites, setViewFavourites,
        toggleCart, cart, cartOpen, leftCartRef } = useStore();

    const router = useRouter();
    const [showRepModal, setShowRepModal] = useState(false);
    
    const handleCategoryClick = (cat, option) => {
        filterByCategoryAndOption(categories, option);
    };

    const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);



  return (    
    <div className='flex flex-col items-center justify-start py-2 space-y-6 bg-[#1C4672] overflow-y-auto'>
        {/* Logo + Title */}
        <div className="relative w-30 h-auto mt-2">
            <Image src={assets.logo} alt="logo" className="object-contain" priority/>
        </div>
        
        <h1 className={`${quick.className} text-[#c4e0f9] text-xl text-center font-semibold`}>
            LIQUIDO STORES
        </h1>
            
        {/* Quick Actions */}
        <div className='flex flex-col items-start justify-start space-y-5'>
            <div className="w-full px-0 md:px-4 text-white space-y-3 cursor-pointer">
                <h2 className="text-md font-semibold border-b border-white/30 pb-1">Quick Actions</h2>
                <Link href= "/">
                    <div className="flex text-sm items-center gap-3 mb-3 hover:text-[#c4e0f9]"><Home size={16}/> Home</div>
                </Link>
                <div 
                ref={leftCartRef}
                onClick={toggleCart}
                className="relative flex text-sm items-center gap-3 hover:text-[#c4e0f9]"
                >
                {cartOpen ? (
                    <>
                    <MinusCircle size={16} /> Close Cart
                    </>
                ) : (
                    <>
                    <ShoppingCart size={16} /> View Cart
                    </>
                )}

                {/* Cart badge */}
                {!cartOpen && mounted && cart.length > 0 && (
                    <span className="absolute -top-2 left-2.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cart.length}
                    </span>
                )}
                </div>

                <div
                    onClick={() => setViewFavourites((prev) => !prev)}
                    className="relative flex items-center text-sm gap-3 cursor-pointer text-white hover:text-[#c4e0f9]"
                    > 
                    {viewFavourites ? (
                        <> <MinusCircle size={16}/> Close Favourites</>   
                    ) : (
                        <> <Star size={16} /> Favorites / Wishlist</>
                    )}

                    {!viewFavourites && mounted && favourites.length > 0 && (
                    <span className="absolute -top-2 left-2.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {favourites.length}
                    </span>
                )}
                </div>

                <div
                    onClick={() => {
                    router.push("/pastOrders");
                    }}
                    className="relative flex items-center text-sm gap-3 cursor-pointer text-white hover:text-[#c4e0f9]"
                >
                   <History size={16}/> Order History
                </div>

                <div
                    onClick={() => setShowRepModal(true)}
                    className="relative flex items-center text-sm gap-3 cursor-pointer text-white hover:text-[#c4e0f9]"
                    >
                        <Boxes size={16}/> Bulk Delivery
                </div>
            </div>

            {/* Delivery Info */}
            <div className="w-full px-0 md:px-4 text-white space-y-3 cursor-pointer">
                <h2 className="text-md font-semibold border-b border-white/30 pb-1">Delivery Hours</h2>
                {[
                    ["Mon - Sat", "9AM - 6PM"],
                    ["Sun", "1PM - 6PM"],
                    ].map(([day, time]) => (
                    <p key={day} className="flex items-start justify-start space-y-2 gap-2 text-sm">
                        {day} <ArrowRight size={14} className='mt-1'/> {time}
                    </p>
                    ))}
            </div>

            {/* Help / Support */}
            <div className="w-full px-0 md:px-4 text-white space-y-3 cursor-pointer">
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

        
           <BulkBookingModal 
                open={showRepModal} 
                onClose={() => setShowRepModal(false)} 
            />
    </div>
    );
};

export default LeftSide;














