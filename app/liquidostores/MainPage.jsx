'use client';
import React, { useState } from 'react';
import LeftSide from './LeftSide';
import TopSide from './TopSide';

import { Menu, X } from 'lucide-react';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="w-full min-h-screen flex bg-[#4C86C4] text-white relative overflow-hidden">
      {/* Hamburger button (mobile only) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1C4672] p-2 rounded-lg text-white"
      >
        <Menu size={24} />
      </button>

      {/* Left side (Sidebar) */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#1C4672] z-50 overflow-y-auto no-scrollbar transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:w-[16%]`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end p-4 md:hidden">
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>

        <LeftSide />
      </div>

      {/* Overlay (when sidebar is open on mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Right side */}
      <div className="md:ml-[16%] flex-1 flex flex-col relative">
        {/* Top part */}
        <div className="fixed top-0 left-0 md:left-[16%] w-full md:w-[84%] h-[30%] z-40">
          <TopSide />
        </div>

        {/* Bottom part (Store under TopSide) */}
        <div className="flex-1 flex items-center justify-center pt-[18%]">
          <p>Select An Option</p>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
