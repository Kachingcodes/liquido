'use client';
import React, { useState, useEffect } from 'react';
import LeftSide from './LeftSide';
import TopSide from './TopSide';
import Store from './Store';
import Cart from './Cart';
import { Menu, X, ArrowUpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/public/assets';



const loadStorage = (key, fallback) => {
  try{
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => loadStorage("favorites", [])); 
  const [showFavorites, setShowFavorites] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cart, setCart] = useState(() => loadStorage("cart", []));
  const [showCart, setShowCart] = useState(false);
  const [counts, setCounts] = useState(() => loadStorage("counts", {}));

  //Save Cart when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

   // Save favorites when it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save counts when it changes
  useEffect(() => {
    localStorage.setItem("counts", JSON.stringify(counts));
  }, [counts]);


  useEffect(() => {
    const toggleVisibility = () => {
      if(window.scrollY > 200) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  useEffect(() => {
    if(showCart || isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCart, isOpen]);


    const handleIncrease = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleAddCart = (product) => {
    const quantity = counts[product.id] || 1;

    setCart((prev) => {
    const exists = prev.find((item) => item.id === product.id);
    if (exists) {
      return prev.map((item) => 
      item.id === product.id
      ? { ...item, quantity: item.quantity + quantity }
      : item
    );
  } else {
    return [...prev, {...product, quantity }];
  }
  });

  setCounts((prev) => ({ ...prev, [product.id]: 1}));
};

const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// For Cart (post-cart quantities)
const handleCartIncrease = (id) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const handleCartDecrease = (id) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0) // remove products with 0
  );
};


  return (
    <section className="w-full min-h-screen flex text-white relative overflow-hidden">
      {/* Hamburger button (mobile only) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-3 z-50 bg-[#1C4672] p-2 rounded-full text-white"
      >
        <Menu size={24} />
      </button>

      {/* Left side (Sidebar) */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#1C4672] z-50 overflow-y-auto no-scrollbar transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0 w-[70%]' : '-translate-x-full'} 
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
          isOpen={isOpen}
          setIsOpen={setIsOpen} 
          showCart={showCart}
          setShowCart={setShowCart}
        />
      </div>

      {/* Overlay (when sidebar is open on mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-40"
        />
      )}

      {/* Right side */}
      <div className="md:ml-[16%] flex-1 flex flex-col relative">
        {/* Top part */}
        <div className="w-full h-[30%] z-30">
          <TopSide 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cart={cart} setShowCart={setShowCart}/>
        </div>

        {/* Bottom part (Store under TopSide) */}
        <div className="w-full flex-1 flex items-center justify-center pt-[8%] md:pt-[4%] overflow-hidden">
          {selectedOption ? (
            <Store 
            activeCategory={activeCategory} 
            selectedOption={selectedOption} 
            searchTerm={searchTerm}
            favorites={favorites}
            setFavorites={setFavorites}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleAddCart={handleAddCart}
            counts={counts}/>
          ) : (
            <p className='text-black'>Select An Option</p>
          )}
        </div>

        {visible && (
          <button
          onClick={() => window.scrollTo({ top:0,  behavior: "smooth"})}
          className='fixed right-2 bottom-2 rounded-full p-1 bg-[#4C86C4]'
        >
        <ArrowUpIcon size={26}/>
        </button>
        )}

        {/* Favorites Overlay */}
        <AnimatePresence>
          {showFavorites && favorites.length > 0 && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-[30%] left-0 w-full h-[70%] md:mt-45 bg-white z-20 p-6 overflow-y-auto shadow-lg"
            >
              {/* Close button */}
              <button
                onClick={() => setShowFavorites(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X size={24} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-black">⭐ My Favorites</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 z-50">
                {favorites.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border rounded-lg shadow-sm bg-white">
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

        {/* Cart */}
        <AnimatePresence>
          {showCart && (
            <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black z-30"
            />
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className='fixed top-0 right-0 w-[100%] md:w-[40%] h-screen bg-white py-4 z-100 overflow-auto min-h-screen'>
              
              <div className="absolute top-2 left-4 w-24 h-12">
                <Image src={assets.middle} alt="logo" fill className="object-contain"/>
              </div>
              
              <button
              onClick={() => setShowCart(false)}
              className='absolute top-4 right-4 text-gray-600 hover:text-black'
              >
                <X size={20}/>
              </button>

              <Cart cart={cart} 
                total={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} 
                setShowCart={setShowCart}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                handleAddCart={handleAddCart} 
                handleCartIncrease={handleCartIncrease}
                handleCartDecrease={handleCartDecrease}/>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MainPage;