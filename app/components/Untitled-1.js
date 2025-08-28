// "use client";
// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Droplet, Fuel, FlaskConical, Snowflake } from "lucide-react"; // from lucide-react icons

// const services = [
//   {
//     title: "Water Delivery",
//     icon: <Droplet size={36} className="text-blue-500" />,
//     description: "Potable water for homes and offices.",
//   },
//   {
//     title: "Fuel Delivery",
//     icon: <Fuel size={36} className="text-red-500" />,
//     description: "Diesel, petrol, and kerosene for homes and industries.",
//   },
//   {
//     title: "Chemical Delivery",
//     icon: <FlaskConical size={36} className="text-green-500" />,
//     description: "Safe handling of industrial liquids.",
//   },
//   {
//     title: "Refrigerated Liquid Transport",
//     icon: <Snowflake size={36} className="text-cyan-400" />,
//     description: "Temperature-controlled transport for sensitive cargo.",
//   },
// ];

// const Services = () => {
//   return (
//     <section className="py-20 px-6 bg-[#35A2E0] text-gray-800 ">
//       <div className="max-w-6xl mx-auto text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-bold mb-12"
//         >
//           Services Offered
//         </motion.h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//   key={index}
//   initial={{ opacity: 0, y: 30 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ delay: index * 0.2, duration: 0.6 }}
//   className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
// >
//   <div className="mb-4 flex justify-center">{service.icon}</div>
//   <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//   <p className="text-sm">{service.description}</p>
// </motion.div>

//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;
// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { assets } from "@/public/assets"; // adjust path if needed

// const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">
//       {/* Center Text */}
//       <motion.h1
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//         className="z-10 text-white text-4xl md:text-6xl font-bold text-center"
//       >
//         Welcome to Liquido
//       </motion.h1>

//       {/* Fading Image from Left */}
//       <motion.div
//         initial={{ x: -200, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[300px] md:w-[400px] z-0"
//       >
//         <Image
//           src={assets.van} // or whatever image you want
//           alt="Fading Liquid"
//           width={400}
//           height={400}
//           className="object-contain rounded-lg opacity-90"
//         />
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;




// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { herosec } from "@/public/assets"; // imported image array

// const ProductCarousel = () => {
//   return (
//     <section className="py-20 px-6 bg-[#0a0a0a] text-white overflow-x-hidden">
//       <div className="max-w-6xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-bold text-center mb-12"
//         >
//           Our Liquid Products
//         </motion.h2>

//         <div className="relative">
//           <motion.div
//             className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//           >
//             {herosec.map((img, index) => (
//               <motion.div
//                 key={index}
//                 className="relative min-w-[260px] h-[360px] rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 flex-shrink-0 overflow-hidden shadow-xl hover:scale-105 transition duration-300"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//               >
//                 <Image
//                   src={img}
//                   alt={`product-${index}`}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 flex items-end">
//                   <p className="text-sm font-semibold">Product #{index + 1}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductCarousel;




// export default Hero;
// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { assets } from "@/public/assets"; // adjust path if needed

// const Hero = () => {
//   return (
//     <section className="relative min-h-screen bg-[#35A2E0]/60 flex items-center justify-center overflow-hidden px-4">

//       {/* <div className="absolute inset-0 bg-[#000000]/60 z-0 pointer-events-none"></div> */}
      
//     </section>
//   );
// };

// export default Hero;

// // style={{
// //      backgroundImage: `url(${assets.bg2.src})`,
// //     backgroundSize: "cover",
// //     backgroundPosition: "center"
// //   }}



//<h1 className={` ${kameron.className} text-4xl md:text-6xl font-bold mb-6 text-white`}></h1>

