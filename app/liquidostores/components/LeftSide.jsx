'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { ShoppingCart, Star, Home, Phone, HelpCircle, StarOff, MinusCircle, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { FaPerson } from 'react-icons/fa6';
import { useStore } from '@/app/context/StoreContext';
// import { FaFileInvoice } from 'react-icons/fa6';

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

const LeftSide = () => {
    const { favourites, filterByCategoryAndOption, viewFavourites, setViewFavourites,
        toggleCart, cart, cartOpen } = useStore();

    const handleCategoryClick = (cat, option) => {
        filterByCategoryAndOption(categories, option);
    };

    const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);


  return (    
    <div className='flex flex-col items-center justify-start py-2 space-y-6 bg-[#1C4672] h-screen overflow-y-auto scrollbar-hide'>
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
                    <div className="flex text-sm items-center gap-2 mb-3 hover:text-[#c4e0f9]"><Home size={16}/> Home</div>
                </Link>
                <div 
                    onClick={toggleCart}
                    className="flex text-sm items-center gap-2 hover:text-[#c4e0f9]"
                >
                    {cartOpen ? (
                        <><MinusCircle size={16}/> Close Cart</>
                    ) : (
                        <><ShoppingCart size={16}/> View Cart</>
                    )}
                </div>
                
                <div
                    onClick={() => setViewFavourites((prev) => !prev)}
                    className="flex items-center text-sm gap-2 cursor-pointer text-white hover:text-[#c4e0f9]"
                    > 
                    {viewFavourites ? (
                        <> <MinusCircle size={16}/> Close Favourites</>   
                    ) : (
                        <> <Star size={16} /> Favorites / Wishlist</>
                    )}
                </div>

                          {/* This area is temporary. I am using it to test the admin side */}
                            <div>
                              <Link 
                                href="/admin"
                                onClick={(e) => {
                                handleDrop(e);
                                setIsOpen(false)
                                }}
                                className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#c4e0f9]"
                                >
                                    <FaPerson size={16}/> Admin
                              </Link>  
                            </div>
                            {/* Ends here */}

                {/* <div
                    onClick={() => { 
                    if (showInvoice) {
                        setShowInvoice(false);
                    } else{
                        setShowInvoice(true);
                        setShowCart(false);
                        setIsOpen(false);
                        }
                    }}
                    className="flex items-center text-sm gap-2 cursor-pointer text-white hover:text-[#c4e0f9]"
                    >       
                    {showInvoice ? (
                        <> <MinusCircle size={16} /> Close Invoice </>
                    ) : (
                        <> <FaFileInvoice size={16} /> View Invoice </>
                    )}
                </div> */}
            </div>

            {/* Delivery Info */}
            <div className="w-full px-0 md:px-4 text-white space-y-3 cursor-pointer">
                <h2 className="text-md font-semibold border-b border-white/30 pb-1">Delivery Hours</h2>
                {[
                    ["Sundays", "1PM - 6PM"],
                    ["Mondays", "9AM - 6PM"],
                    ["Tuesdays", "9AM - 6PM"],
                    ["Wednesdays", "9AM - 6PM"],
                    ["Thursdays", "9AM - 6PM"],
                    ["Fridays", "9AM - 6PM"],
                    ["Saturdays", "9AM - 6PM"],
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
    </div>
    );
};

export default LeftSide;