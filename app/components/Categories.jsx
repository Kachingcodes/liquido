import React from "react";
import { Quicksand } from "next/font/google";
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import DesktopCat from './DesktopCat';
import PhoneCat from './PhoneCat';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

const Categories = () => {
    const router = useRouter(); 

    const handlePlaceOrder = () => {
    router.push("/shop"); 
  };


  return (
    <section id="Categories"
    className="w-full bg-gray-100 text-black relative overflow-hidden px-2 py-8 md:py-12 gap-8 md:gap-16 flex flex-col items-center">
      
      <h1 className={` ${quick.className} text-3xl md:text-4xl text-center mb-10 md:mb-6 font-extrabold text-[#1C4672]`}>CATEGORIES</h1>

    <div className="md:flex hidden w-full">
      <DesktopCat/>
    </div>

    <div className="flex md:hidden w-full ">
      <PhoneCat/>
    </div>

      <div className="">
        <button 
          onClick={handlePlaceOrder}
          className="bg-[#1C4672] px-4 py-3 flex items-center gap-2 text-white text-md md:text-lg rounded-lg w-fit hover:bg-[#8FC0F4] transition">
          Place Order <ShoppingCartIcon className='text-lg'/>
        </button>
      </div>
    </section>
  );
}

export default Categories;