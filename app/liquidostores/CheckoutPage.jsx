// import Invoice from "./Invoice";

// export default function CheckoutPage() {
//   const [lastInvoice, setLastInvoice] = useState(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("lastInvoice");
//     if (saved) {
//       setLastInvoice(JSON.parse(saved));
//     }
//   }, []);

//   return (
//     <div>
//       <button onClick={handlePlaceOrder}>Place Order</button>

//       {lastInvoice && (
//         <div className="mt-6">
//           <Invoice order={lastInvoice} />
//         </div>
//       )}
//     </div>
//   );
// }
