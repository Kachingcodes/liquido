'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag, Package, MessageSquare, HomeIcon, StoreIcon, TruckIcon, Boxes } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { Quicksand } from 'next/font/google';
import { useAuth } from "../../context/AuthContext";


const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});


const AdminSidebar = () => {
      const { logout } = useAuth();
    // const router = useRouter();

    // const handleLogout = () => {
    //     localStorage.removeItem("adminAuth");
    //     router.push("/admin");
    // };

    return (
        <aside className="w-64 bg-[#1C4672] text-white hidden md:flex flex-col justify-between overflow-hidden">
            <div>
                <div className="relative w-30 h-auto py-4 ml-8">
                    <Image src={assets.logo} alt="logo" className="object-contain" priority/>
                </div>
        
                <div className={`${quick.className} p-6 text-2xl font-semibold border-b border-blue-400`}>
                    Liquido Admin
                </div>
                
                <nav className="p-4 space-y-4">     
                    <Link
                    href="/admin/dashboard"
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <LuLayoutDashboard size={18}/> Dashboard
                    </div>
                    </Link>

                    <Link
                    href="/admin/products"
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <Package size={18}/> Products
                    </div>
                    </Link>

                    <Link
                    href="/admin/orders"
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={18}/> Regular Orders
                    </div>
                    </Link>

                    <Link
                    href="/admin/bulkorders"
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <Boxes size={18}/> Bulk Orders
                    </div>
                    </Link>

                    <Link
                    href="/admin/messages"
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <MessageSquare size={18}/> Messages
                    </div>
                    </Link>
                    
                    <Link 
                    href="/"               
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <HomeIcon size={18}/> Home
                    </div>
                    </Link>

                    <Link 
                    href="/liquidostores"               
                    className="block px-3 py-2 rounded-lg hover:bg-[#4C86C4] transition"
                    >
                    <div className="flex items-center gap-2">
                        <StoreIcon size={18}/> Liquido Stores
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
                onClick={logout}
                className="m-4 flex items-center gap-2 bg-white text-[#1C4672] px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                <LogOut size={18}/> Logout
            </button>
        </aside> 
    );
};

export default AdminSidebar;