'use client';
import React, { useState } from 'react';
import LeftSide from './LeftSide';
import TopSide from './TopSide';
import Store from './Store';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]); 
  const [showFavorites, setShowFavorites] = useState(false);
  

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

        <LeftSide 
          showFavorites={showFavorites} 
          setShowFavorites={setShowFavorites} 
        />
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
          <TopSide 
          favorites={favorites} setFavorites={setFavorites}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}/>
        </div>

        {/* Bottom part (Store under TopSide) */}
        <div className="bg-gray-100 flex-1 flex items-center justify-center mt-8">
          {selectedOption ? (
            <Store 
            activeCategory={activeCategory} 
            selectedOption={selectedOption} 
            searchTerm={searchTerm}
            favorites={favorites}
            setFavorites={setFavorites}/>
          ) : (
            <p className='text-black'>Select An Option</p>
          )}
        </div>

        {/* Favorites Overlay */}
        <AnimatePresence>
          {showFavorites && favorites.length > 0 && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-[30%] left-0 w-full h-[70%] mt-10 bg-white z-50 p-6 overflow-y-auto shadow-lg"
            >
              {/* Close button */}
              <button
                onClick={() => setShowFavorites(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-black">⭐ My Favorites</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favorites.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-contain"
                    />
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">₦{product.price}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MainPage;