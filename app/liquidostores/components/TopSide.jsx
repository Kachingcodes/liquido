"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowLeftIcon, X, ArrowRight, ShoppingCart, Menu } from "lucide-react";
import DeskAdvert from '../../shop/DeskAdvert';
import PhoneAdvert from '../../shop/PhoneAdvert';
import LeftSide from "./LeftSide";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Droplets, Sparkles, CookingPot, User, Gem, Car } from 'lucide-react';
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useStore } from '@/app/context/StoreContext';

const TopSide = () => {
    const [drops, setDrops] = useState([]);
    const { activeCategory, setActiveCategory, selectedOption, setSelectedOption,
        toggleCart, cart, leftSideOpen, setLeftSideOpen, 
        performSearch, filteredProducts, topCartRef } = useStore();
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");

    const suggestions = query
        ? filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const toggleOption = (option) => setSelectedOption(prev => (prev === option ? null : option));
  
    const toggleCategory = (categoryName) => {
    setActiveCategory(categoryName);

    const newCat = categories.find(
        c => c.name === categoryName
    );

    if (newCat?.options?.length) {
        setSelectedOption(newCat.options[0].name);
    } else {
        setSelectedOption(null);
    }
    };

    const activeCat =
    categories.find(
        c => c.name === activeCategory
    );

    const options = activeCat?.options || [];

    useEffect(() => {
    const unsubscribe = onSnapshot(
        collection(db, "categories"),
        async (snapshot) => {

        const data = await Promise.all(
            snapshot.docs.map(async (categoryDoc) => {

            const optionSnapshot = await getDocs(
                collection(
                db,
                "categories",
                categoryDoc.id,
                "options"
                )
            );

          return {
            id: categoryDoc.id,
            ...categoryDoc.data(),

            options: optionSnapshot.docs
              .map(option => ({
                id: option.id,
                ...option.data(),
              }))
              .filter(option => option.active)
              .sort((a, b) => a.name.localeCompare(b.name))
          };
        })
      );

        setCategories(
            data
                .filter(category => category.active)
        );
    }
  );

  return () => unsubscribe();
}, []);

    useEffect(() => {
    if (!activeCategory && categories.length > 0) {
        const firstCat = categories[0];

        setActiveCategory(firstCat.name);

        if (firstCat.options?.length > 0) {
        setSelectedOption(firstCat.options[0].name);
        }
    }
    }, [categories, activeCategory, setActiveCategory, setSelectedOption]);

        const categoryIcons = {
        "Water & Drinks": Droplets,
        "Personal Care": User,
        "Cooking & Edible Liquids": CookingPot,
        "Hygiene & Cleaning": Sparkles,
        "Luxury & Lifestyle": Gem,
        "Automobile": Car,
        };

      const router = useRouter();
      const handleBackIntro = () => {
        const newDrop = { id: Date.now() };
        setDrops(prev => [...prev, newDrop]);
        setTimeout(() => setDrops(prev => prev.filter(d => d.id !== newDrop.id)), 3000);
        setTimeout(() => router.push("/shop"), 600);
      };

      const [mounted, setMounted] = useState(false);

        useEffect(() => {
        setMounted(true);
        }, []);


    return (
        <div className="w-full flex flex-col items-center p-3 md:p-6 space-y-6 bg-white overflow-x-hidden">
        {/* Top Search + Back - Desktop*/}
            <div className="hidden md:flex items-center justify-evenly w-full gap-4">
                <div className="max-w-4xl hidden md:flex flex-1/2">
                    <DeskAdvert/>
                </div>

                <div className="flex flex-col items-end justify-end gap-6">
                    <div className="relative inline-block">
                        <button
                            onClick={handleBackIntro}
                            className="bg-[#1C4672] p-2 flex items-center gap-2 text-white md:text-md text-md rounded-lg shadow-md shadow-[#000000]/40 w-fit hover:bg-[#4C86C4] transition relative"
                        >
                            Back <ArrowLeftIcon size={20}/>
                        </button>
                    </div>

                    <div className="flex items-center w-full rounded-lg bg-white shadow-md px-3 py-3">
                        <Search size={18} className="text-gray-500 mr-2" />
                            <input
                                value={query}
                                onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                performSearch(value);
                                }}
                                className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm text-black"
                                placeholder="Search liquids..."
                            />                           
                    </div>
                </div>
            </div>

            {/* Top part Mobile View */}
            <div className="w-full flex flex-col md:hidden items-center justify-center gap-4 overflow-y-hidden">
                <div className="w-full md:hidden items-center justify-evenly gap-2 flex">
                    <button
                        onClick={() => setLeftSideOpen(prev => !prev)}
                        className=" z-50 p-2 mt-2 rounded-full text-black"
                >
                        <Menu size={24} className="cursor-pointer"/>
                    </button>
                    

                    <div
                        className={`fixed top-0 left-0 h-screen bg-[#1C4672] z-50 overflow-y-auto no-scrollbar transform transition-transform duration-300 ease-in-out 
                        ${leftSideOpen ? 'translate-x-0 w-[60%]' : '-translate-x-full'} 
                        md:translate-x-0 md:w-[16%]`}>

                    {/* Close button (mobile only) */}
                    <div className="flex justify-end px-4 py-3 md:hidden">
                        <button onClick={() => setLeftSideOpen(false)} className="text-white cursor-pointer z-50">
                            <X size={24} />
                        </button>
                    </div>
                        <LeftSide/>
                    </div>

                    {leftSideOpen && (
                        <div
                            onClick={() => setLeftSideOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[40] transition-opacity duration-300"
                            />
                    )}
                    <PhoneAdvert/>
                </div>
                

                <div className="flex items-center justify-center gap-4 w-full">
                    <div className="flex items-center w-full rounded-lg bg-gray-200 px-2 py-2">
                        <Search size={18} className="text-black mr-2" />
                            <input
                                value={query}
                                onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                performSearch(value);
                                }}
                                className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm text-black"
                                placeholder="Search liquids..."
                            />
                    </div> 

                    <div 
                        ref={topCartRef}
                        onClick={toggleCart}
                        className="rounded-lg border px-2 py-2">
                            <ShoppingCart size={18}/>

                                {mounted && cart.length > 0 && (
                                <span className="absolute top-16 right-14 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    {cart.length}
                                </span>
                                )}
                    </div>
                        
                    <div className="rounded-lg border px-2 py-2">
                        <ArrowLeftIcon size={18}/>
                    </div>
                </div>
            </div>

            {/* First Row of Buttons */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full">
  {categories.map((cat) => {
    const Icon = categoryIcons[cat.name];

    return (
      <button
        key={cat.id}
        onClick={() => toggleCategory(cat.name)}
        className={`flex flex-col items-center justify-center px-3 py-4 rounded-lg transition
        ${
          activeCategory === cat.name
            ? "bg-[#8FC0F4] text-white"
            : "text-[#1C4672] hover:bg-[#8FC0F4] hover:text-white border border-[#807d7d83]"
        }`}
      >
        <div
          className={`mb-2 ${
            activeCategory === cat.name
              ? "text-[#1C4672]"
              : "text-[#1C4672]"
          }`}
        >
          {Icon && <Icon size={24} />}
        </div>

        <span
          className={`text-xs text-center ${
            activeCategory === cat.name
              ? "text-[#1C4672]"
              : ""
          }`}
        >
          {cat.name}
        </span>
      </button>
    );
  })}
</div>

            

            <div className="w-full relative md:h-10 h-14">
                {/* absolutely-positioned, horizontally-scrollable content inside the reserved strip */}
                <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`absolute inset-0 flex flex-col pointer-events-auto`}
                >
                {/* Second Row of buttons */}
                <div className="flex gap-2 w-full overflow-x-auto no-scrollbar">
                    {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => toggleOption(option.name)}
                        className={`flex-shrink-0 min-w-max px-4 py-2 rounded-md text-sm cursor-pointer transition
                        ${
                            selectedOption === option.name
                                ? "bg-[#76abe3] text-white"
                                : "border border-black text-black hover:bg-[#67a1e3]"
                        }`}
                    >
                        {option.name}
                    </div>
                ))}
                </div>

                {options.length > 1 && (
                    <div className="flex justify-end w-full mt-1">
                    <span className="md:hidden flex items-center gap-1 text-gray-700 text-xs md:text-sm">
                        Scroll For More <ArrowRight size={16} />
                    </span>
                    </div>
                )}
                </motion.div>
            </div>
        </div>
  );
};

export default TopSide;