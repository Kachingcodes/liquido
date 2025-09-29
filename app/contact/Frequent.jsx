"use client";
import React, { useState } from "react";
import { Quicksand } from "next/font/google";
import { faqs } from '@/public/assets';
import { ChevronDown, ChevronUp, MailCheck } from "lucide-react";
import { motion } from "framer-motion";


const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"]
});


export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

const [formData, setFormData] = useState({ question: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "2347062757706"; 

    // WhatsApp URL
    const message = `Hello, I have a question: ${formData.question}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    setFormData({ question: "" });
  };


  return (
    <section
      id="FAQ"
      className="bg-white relative w-full py-8 flex items-center justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-6 gap-10 w-full max-w-6xl">
        {/* Left */}
        <div className="flex flex-col justify-between max-w-xl">
          <div className="gap-4 flex flex-col">
          <motion.h1 
          initial={{y: -100, opacity: 0 }}
          whileInView={{y: 0, opacity: 1}}
          transition={{ duration: 1.0 }}
          className={` ${quick.className} text-3xl font-bold text-black tracking-wide`}>
            Frequently Asked Questions
          </motion.h1>
          <p className="text-md md:mb-0 mb-4">We are here to answer your inquiries</p>
        </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="bg-gray-100 space-y-4 p-4 rounded-lg">
            <h3 className="font-semibold">Can't locate the answers you need?</h3>
            <span className="text-gray-700 text-sm block">
              Send us a message and we will get back to you as soon as possible.
            </span>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Input Question */}
            <div>
              <label className="block text-sm mb-2">Type Your Question</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-2 text-sm bg-gray-200 text-black border border-gray-900 focus:border-[#1C4672] focus:outline-none"
              />
            </div>

            <button className="flex gap-2 items-center justify-center px-4 py-2 text-white bg-[#4C86C4] hover:bg-[#1C4672] rounded-md">
             <MailCheck size={20}/> Send Inquiry
            </button>
            </form>
          </motion.div>
        </div>

        {/* Right */}
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-gray-300 pb-2 cursor-pointer"
            >
              <div
                className="flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <h2 className="font-medium text-gray-800">{faq.q}</h2>
                {openIndex === i ? (
                  <ChevronUp size={20} className="text-gray-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600" />
                )}
              </div>

              {openIndex === i && (
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}