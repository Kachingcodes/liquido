"use client";
import React, { useState } from "react";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { assets } from '@/public/assets';
import Checkout from "./Checkout";


export default function Cart({ cart, total, setShowCart, handleCartIncrease, handleCartDecrease }) {

  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="text-black p-2 md:p-6 space-y-4 flex flex-col justify-between mt-12">
      
      <div className="flex flex-col justify-evenly"> 
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
            <div className="flex items-center gap-3">
              <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.volume}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="font-medium mt-0.5 text-gray-700 text-sm md:text-md">₦{item.price}</span>
            <span className="font-medium text-sm md:text-md">x {item.quantity}</span>
          </div>

          <div className="flex items-center justify-evenly px-1 md:px-4 border border-black bg-gray-100 rounded-lg text-sm md:text-md"> 
            <button
            onClick={() => handleCartDecrease(item.id)}
            className="p-1 md:p-2 rounded-lg text-gray-500 hover:text-gray-900"
            >
              <Minus size={18}/>
            </button>
            <span className="min-w-[24px] text-center font-semibold text-gray-900 text-sm md:text-md">{item.quantity}</span>
            <button
            onClick={() => handleCartIncrease(item.id)}
            className="p-1 md:p-2 rounded-lg text-gray-500 hover:text-gray-900"
            >
              <Plus size={18}/>
            </button>
          </div>
        </div>
        ))
      )}
      </div>

      <div>
        {/* Total */}
        <div className="flex justify-between text-md md:text-lg px-2 font-semibold mt-4">
          <span>Total:</span>
          <span>₦{total}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-6 px-2">
          <button
            onClick={() => setShowCart(false)}
            className="w-1/2 px-2 md:px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-md"
          >
            Continue Shopping
          </button>
          <button 
          onClick={() => setShowCheckout(true)}
          className="w-1/2 px-2 md:px-4 py-2 bg-[#1C4672] text-white rounded-lg hover:bg-[#4C86C4] transition text-md">
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout */}
        <AnimatePresence>
          {showCheckout && (
            <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className='fixed top-0 right-0 w-[100%] md:w-[40%] h-screen bg-white py-4 z-100 overflow-auto min-h-screen'>
              <button
              onClick={() => setShowCheckout(false)}
              className='absolute top-4 right-4 text-gray-700 hover:text-black'
              >
                <p className="flex items-center justify-center gap-2"> Back to Cart <ArrowLeft size={26} className="bg-[#1C4672] rounded-full p-1 text-white"/></p>
              </button>

              <Checkout
              cart={cart}
              total={total}
              setShowCart={setShowCart}/>
            </motion.div>
          )}
        </AnimatePresence>
      
    </div>
  );
}