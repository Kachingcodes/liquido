// "use client";
// import React from "react";
// import { X } from "lucide-react";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import toast, { Toaster } from "react-hot-toast";

// export default function Invoice({
//   cart,
//   total,
//   payment,
//   timeSelected,
//   locSelected,
//   goBack,
// }) {
//   const handleDownload = () => {
//     try{
//       const doc = new jsPDF({
//   orientation: "p",
//   unit: "mm",
//   format: "a4",
//     });
//     // Title
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(18);
//     doc.text("INVOICE", 14, 20);
//     doc.setFontSize(12);
//     doc.setTextColor(100);

//     // Add date
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 20);

//     // Table of items
//     const tableColumn = ["Item", "Qty", "Price"];
//     const tableRows = [];

//     cart.forEach((item) => {
//       const itemData = [
//         item.name || item.title || "Item",
//         item.quantity,
//         `₦${item.price.toLocaleString()}`,
//       ];
//       tableRows.push(itemData);
//     });

//     autoTable({
//       startY: 30,
//       head: [tableColumn],
//       body: tableRows,
//       theme: "grid",
//       headStyles: { fillColor: [28, 70, 114] },
//     });

//     // Total
//     const finalY = doc.lastAutoTable.finalY || 30;
//     doc.setFontSize(14);
//     doc.text(`Total: ₦${total.toLocaleString()}`, 150, finalY + 10);

//     // Divider
//     doc.setDrawColor(180);
//     doc.line(14, finalY + 18, 195, finalY + 18);

//     // Delivery details
//     doc.setFontSize(12);
//     doc.text("Delivery Information", 14, finalY + 28);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Delivery Day/Time: ${new Date(timeSelected).toLocaleString()}`, 14, finalY + 38);
//     doc.text(`Location: ${locSelected}`, 14, finalY + 48);
//     doc.text(`Payment Method: ${payment}`, 14, finalY + 58);

//     doc.save("invoice.pdf");
//     toast.success("Order Placed Successfully!");
//   };
//     } catch (error) {
//        toast.error("Something went wrong while placing your order.");
//   }
//     };
  

//   const phoneNumber = "2347062757706"; 
    
//       const handlePlaceOrder = () => {
//         try{
//           // 1. Build order
//     const order = {
//       id: Date.now(),
//       date: new Date().toLocaleString(),
//       items: cart,
//       locSelected,
//       timeSelected,
//       payment,
//     };
  
//     // 2. Save to localStorage
//     if (typeof window !== "undefined") {
//       const prev = JSON.parse(localStorage.getItem("invoices") || "[]");
//       localStorage.setItem("invoices", JSON.stringify([...prev, order]));
//     }
  
//     // 3. Show invoice first
//     setCurrentInvoice(order);
//     setShowInvoice(true);
  
//     setShowCart(false);
//     setShowCheckout(false);
  
//     // 4. Proceed to WhatsApp
//     const message = `
//   Hello Liquido 💧, I'd like to place an order.
  
//   Location: ${locSelected}
//   Delivery Time: ${timeSelected}
//   Payment: ${payment}
  
//   Items:
//   ${cart.map(item => `${item.name} (x${item.quantity}) - ₦${item.price}`).join("\n")}
//     `;
//     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//     window.open(url, "_blank");
  
//     // 5. Clear cart AFTER a short delay (so invoice modal has values)
//     setTimeout(() => {
//       setCart([]);
//       setLocSelected("");
//       setTimeSelected("");
//       setPayment("");
//     }, 1000);
//   };
//           toast.success("Order placed successfully!");
//           } catch (error) {
//             toast.error("Something went wrong while placing your order.");
//           }
//         };
//         }
     

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[200]">
//       <div className="bg-white rounded-xl w-[90%] md:w-[60%] lg:w-[40%] p-6 relative shadow-xl">

//         <Toaster position="top-center" />
        
//         {/* Close Icon */}
//         <button
//           onClick={goBack}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//         >
//           <X size={22} />
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl font-semibold text-center text-[#1C4672] mb-6">
//           Invoice Summary
//         </h2>

//         {/* Items */}
//         <div className="overflow-y-auto max-h-64 mb-4">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="border-b border-gray-300 text-left">
//                 <th className="py-2">Item</th>
//                 <th className="py-2">Qty</th>
//                 <th className="py-2">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, i) => (
//                 <tr key={i} className="border-b border-gray-100">
//                   <td className="py-2">{item.name || item.title}</td>
//                   <td className="py-2">{item.quantity}</td>
//                   <td className="py-2">₦{item.price.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Total */}
//         <div className="text-right font-semibold text-lg text-[#1C4672] mb-3">
//           Total: ₦{total.toLocaleString()}
//         </div>

//         {/* Divider */}
//         <hr className="border-gray-300 mb-3" />

//         {/* Delivery Info */}
//         <div className="space-y-1 text-sm text-gray-700 mb-6">
//           <p>
//             <strong>Delivery Time:</strong>{" "}
//             {new Date(timeSelected).toLocaleString()}
//           </p>
//           <p>
//             <strong>Location:</strong> {locSelected}
//           </p>
//           <p>
//             <strong>Payment Method:</strong> {payment}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col md:flex-row gap-3">
//           <button
//             onClick={handleDownload}
//             className="flex-1 bg-[#1C4672] text-white py-2 rounded-lg hover:bg-[#4C86C4] transition"
//           >
//             Download Invoice
//           </button>
//           <button
//             onClick={() => {handlePlaceOrder}}
//             className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
