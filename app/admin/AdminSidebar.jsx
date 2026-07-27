'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, ShoppingBag, Package, MessageSquare, HomeIcon,
     StoreIcon, TruckIcon, Boxes, Settings2 } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { Quicksand } from 'next/font/google';


const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});


const AdminSidebar = ({ isMobile = false, onSelect }) => {
      const pathname = usePathname();

      const router = useRouter();

      async function handleLogout() {
        try{
            await fetch("/api/sessionLogout", {
                method: "POST",
            });

            await signOut(auth);

            router.refresh();

            router.replace("/login");
        } catch (error) {
            console.error(error);
        }
      }
    


    return (
        <aside className="h-full w-full bg-[#1C4672] flex flex-col">
            <div>
                <div className="relative w-32 h-auto py-6 mx-auto">
                    <Image src={assets.logo} alt="logo" className="object-contain" priority/>
                </div>
        
                <div
                    className={`${quick.className} text-white px-6 py-4 text-xl font-semibold border-b border-blue-400`}
                >
                    Liquido Admin
                </div>
                
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-white">     
                    <Link
                    href="/admin/dashboard"
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    onClick={onSelect}
                    >
                    <div className="flex items-center gap-2">
                        <LuLayoutDashboard size={16}/> Dashboard
                    </div>
                    </Link>

                    <Link
                    href="/admin/products"
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    onClick={onSelect}
                    >
                    <div className="flex items-center gap-2">
                        <Package size={16}/> Products
                    </div>
                    </Link>

                    <Link
                    href="/admin/orders"
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    onClick={onSelect}
                    >
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={16}/> Regular Orders
                    </div>
                    </Link>

                    <Link
                    href="/admin/bulkorders"
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    onClick={onSelect}
                    >
                    <div className="flex items-center gap-2">
                        <Boxes size={16}/> Bulk Orders
                    </div>
                    </Link>

                    <Link
                    href="/admin/messages"
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    onClick={onSelect}
                    >
                    <div className="flex items-center gap-2">
                        <MessageSquare size={16}/> Messages
                    </div>
                    </Link>

                    <Link 
                    href="/admin/configuration"               
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    onClick={onSelect}
                    >
                        <div className="flex items-center gap-2">
                            <Settings2 size={18}/> Configuration
                        </div>
                    </Link>
                    
                    <Link 
                    href="/"               
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <HomeIcon size={16}/> Home
                    </div>
                    </Link>

                    <Link 
                    href="/liquidostores"               
                    className="block px-2 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <StoreIcon size={16}/> Liquido Stores
                    </div>
                    </Link>

                    {/* <Link 
                    href="/liquidoexpress"               
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <TruckIcon size={18}/> Liquido Express
                    </div>
                    </Link> */}
                </nav>
            </div>

            <button
            onClick={handleLogout}
            className="mx-4 mb-6 flex items-center justify-center gap-2 bg-white text-[#1C4672] px-4 py-3 rounded-xl hover:bg-blue-50 transition"
            >
            <LogOut size={16} />
            Logout
            </button>
        </aside> 
    );
};

export default AdminSidebar;