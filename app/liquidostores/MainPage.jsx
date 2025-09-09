'use client';
import React from 'react';
import LeftSide from './LeftSide';
import TopSide from './TopSide';
import Store from './Store';

const MainPage = () => {
  return (
    <section className="w-full min-h-screen flex bg-[#4C86C4] text-white relative overflow-hidden">
      {/* Left side */}
      <div className="w-[16%] bg-[#1C4672] fixed top-0 left-0 h-screen z-50">
        <LeftSide />
      </div>

      {/* Right side */}
      <div className="ml-[16%] w-[84%] flex flex-col relative">
        {/* Top part */}
        <div className="fixed top-0 left-[16%] w-[84%] h-[30%] z-40">
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