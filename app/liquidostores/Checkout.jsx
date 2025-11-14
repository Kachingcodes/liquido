// "use client";
// import React, { useState } from "react";
// import Invoice from "./Invoice";
// import Image from 'next/image';
// import { assets } from '@/public/assets';
// import { motion, AnimatePresence } from "framer-motion";


// export default function Checkout({ cart, setCart, setShowCart, setShowCheckout,
//   total, goBack, locSelected, setLocSelected, timeSelected, setTimeSelected, payment, setPayment, 
//    }) {

//     //  ,handlePlaceOrder, setCurrentInvoice,
//       const [showInvoice, setShowInvoice] = useState(false);

//   const paymentOptions = ["Cash", "Transfer", "POS"];
//   const locations = ["Ikeja", "Agege", "Ogba", "Berger", "GRA", "Oshodi", "Yaba"];

//   // generate slots from 9 AM to 6 PM
//   const generateSlots = () => {
//     const slots = [];
//     const now = new Date();
//     const currentHour = now.getHours();

//     for (let hour = 9; hour <= 19; hour++) {
//       const slotDate = new Date();
//       let labelDay = "Today";

//       if (currentHour >= hour) {
//         slotDate.setDate(slotDate.getDate() + 1);
//         labelDay = "Tomorrow";
//       }

//       slotDate.setHours(hour, 0, 0, 0);

//       const labelTime = slotDate.toLocaleTimeString([], {
//         hour: "numeric",
//         minute: "2-digit",
//       });

//       slots.push({
//         value: slotDate.toISOString(),
//         label: `${labelDay} - ${labelTime}`,
//       });
//     }

//     return slots;
//   };

//   const slots = generateSlots();

//   const handleChange = (value) => {
//     setTimeSelected((prev) =>
//       prev.includes(value)
//         ? prev.filter((v) => v !== value)
//         : [...prev, value]
//     );
//   };


//   return (
//     <div className="text-black p-6 space-y-9 mt-4 flex flex-col justify-between">
//         {showInvoice ? (
//         <Invoice
//           cart={cart}
//           total={total}
//           payment={payment}
//           timeSelected={timeSelected}
//           locSelected={locSelected}
//           goBack={() => setShowInvoice(false)}
//         />
//       ) : (
//         <>
//             <div className="absolute top-2 left-4 w-24 h-12">
//                 <Image src={assets.middle} alt="logo" fill className="object-contain"/>
//             </div>

//             <div className="space-y-2 mt-6">
//                 <h2 className="text-xl md:text-2xl font-semibold mb-2">Choose Your Location</h2>
//                 <div className="space-y-2 grid grid-cols-2">
//                     {locations.map((location) => (
//                     <label
//                         key={location}
//                         className="flex items-center gap-2 cursor-pointer">
//                         <input
//                         type="radio"
//                         name="location"
//                         value={location}
//                         checked={locSelected === location}
//                         onChange={(e) => setLocSelected(e.target.value)}
//                         className="h-4 w-4 text-[#4C86C4] focus:ring-[#4C86C4]"
//                         />
//                         <span className="text-sm md:text-md">{location}</span>
//                     </label>
//                     ))}
//                 </div>
//             </div>
        
//             <div className="space-y-3">
//                 <h2 className="text-xl md:text-2xl font-semibold mb-2">Delivery Options</h2>
//                 <p className="text-sm">For better service, kindly choose a time you would be available</p>

//                 <div className="space-y-1 grid grid-cols-2 gap-2">
//                     {slots.map((slot) => (
//                     <label key={slot.value} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                         type="radio"
//                         name="delivery-time"
//                         value={slot.value}
//                         checked={timeSelected === slot.value}
//                         onChange={(e) => setTimeSelected(e.target.value)}
//                         className="h-4 w-4 text-[#4C86C4] focus:ring-[#4C86C4]"
//                         />
//                         <span className="text-sm md:text-md">{slot.label}</span>
//                     </label>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex flex-col gap-2">
//                 <h2 className="text-xl md:text-2xl font-semibold mb-4">Payment Options</h2>
//                 <div className="grid grid-cols-3 gap-4 items-center justify-center">
//                     {paymentOptions.map((option) => (
//                     <button
//                         key={option}
//                         onClick={() => setPayment(option)}
//                         className={`px-4 py-4 rounded-lg transition text-white
//                         ${
//                             payment === option
//                             ? "bg-[#1C4672]" // selected
//                             : "bg-[#4C86C4] hover:bg-[#1C4672]"
//                         }`}
//                     >
//                         {option}
//                     </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex"> 
//               <button 
//                 onClick={() => setShowInvoice(true)}
//                 disabled={!payment || !timeSelected || !locSelected}
//                 className={` w-full px-4 py-2 rounded-lg transition-colors ${
//                   !payment || !timeSelected || !locSelected
//                   ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                   : "bg-[#1C4672] text-white hover:bg-[#4C86C4]"
//                 }`}>
//                   Get Invoice
//               </button>
//             </div>
//         </>
//    )} 
//     </div>
//   );
// }