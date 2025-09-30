"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { assets } from '@/public/assets';
import jsPDF from "jspdf";


export default function Invoice({ cart, total, payment, timeSelected, locSelected, goBack }) {
//   const handleDownload = () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Liquido NG - Invoice", 20, 20);

//     doc.setFontSize(12);
//     doc.text(`Payment Method: ${payment}`, 20, 40);
//     doc.text(`Delivery Location: ${locSelected}`, 20, 50);

//     if (timeSelected.length > 0) {
//       doc.text("Delivery Time(s):", 20, 60);
//       timeSelected.forEach((time, i) => {
//         doc.text(`- ${new Date(time).toLocaleString()}`, 25, 70 + i * 10);
//       });
//     }

//     doc.text("Items:", 20, 100);
//     cart.forEach((item, i) => {
//       doc.text(
//         `${i + 1}. ${item.name} (x${item.quantity}) - ₦${item.price * item.quantity}`,
//         25,
//         110 + i * 10
//       );
//     });

//     doc.text(`Total: ₦${total}`, 20, 140);

//     doc.save("invoice.pdf");
//   };

const phoneNumber = "2347062757706"; 

  const handlePlaceOrder = () => {
    // Format invoice message
    let message = "🧾 *Liquido NG – Invoice*\n\n";
    message += `*Payment Method:* ${payment}\n`;
    message += `*Delivery Location:* ${locSelected}\n`;
    message += `*Delivery Time(s):*\n`;
    timeSelected.forEach((time, i) => {
      message += `   • ${new Date(time).toLocaleString()}\n`;
    });

    message += `\n*Items Purchased:*\n`;
    cart.forEach((item, i) => {
      message += `   • ${item.name} (x${item.quantity}) – ₦${item.price * item.quantity}\n`;
    });

    message += `\n*Total:* ₦${total}\n\n`;
    message += "✅ Thank you for shopping with Liquido NG!";

    // Encode message for URL
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp with message
    window.open(url, "_blank");
  };


    return (
    <div className="space-y-2 p-1 md:p-4 bg-white">
        {/* Logo + Title */}
        <div className="flex items-center justify-center">
            <div className="relative  w-24 h-16">
                <Image src={assets.middle} alt="logo" fill className="object-contain" />
            </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Invoice</h2>

        <h3 className="text-lg md:text-xl">Purchased Items:</h3>
        {cart.map((item) => (
            <div key={item.id}>
            {item.name} - {item.quantity} x ₦{item.price}
            </div>
        ))}

        <h3>Total: ₦{total}</h3>
        <h3>Payment Method: {payment}</h3>
        <h3>Delivery Time: {timeSelected}</h3>
        <h3>Delivery Location: {locSelected}</h3>

        <div className="flex items-center justify-evenly gap-8">
            <button 
            onClick={goBack}
            className="w-1/2 px-4 py-2 bg-[#1C4672] text-white rounded-lg hover:bg-[#4C86C4] transition mt-4"
            >Edit Details</button>

            <button 
            onClick={handlePlaceOrder}
            className="w-1/2 px-4 py-2 bg-[#1C4672] text-white rounded-lg hover:bg-[#4C86C4] transition mt-4"
            >Place Order</button>

            {/* <button 
            onClick={goBack}
            className="w-1/2 px-4 py-2 bg-[#1C4672] text-white rounded-lg hover:bg-[#4C86C4] transition mt-4"
            >Place Order</button> */}
        </div>
    </div>
  );
}
