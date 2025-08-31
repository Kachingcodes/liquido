'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock, ArrowBigRight } from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can integrate API call / email service here
    console.log('Form submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 40 }}
  transition={{ duration: 0.3 }}
  className="px-6 pb-10 flex flex-col items-center bg-[#4C86C4]"
>

    {/* Get in Touch + Grid */}
  <div className="w-full max-w-5xl flex flex-col md:flex-row md:items-start md:justify-between gap-8 mt-12">
    {/* Left: GET IN TOUCH */}
    <h1 className={`${quick.className} text-3xl md:text-4xl text-white`}>
      GET IN TOUCH
    </h1>

    {/* Right: Contacts Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
      {/* Card 1 */}
      <div className="bg-[#E0F2FE] text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-lg hover:text-white hover:bg-[#1C4672]">
        <MapPin className="mx-auto mb-2"/>
        <h1>Serti</h1>
        <p>Welcome to Agraba</p>
      </div>

      {/* Card 2 */}
      <div className="bg-[#E0F2FE] text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-lg hover:text-white hover:bg-[#1C4672]">
        <Clock className="mx-auto mb-2"/>
        <h1>Serti</h1>
        <p>Welcome to Agraba</p>
      </div>

      {/* Card 3 */}
      <div className="bg-[#E0F2FE] text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-lg hover:text-white hover:bg-[#1C4672]">
        <MapPin className="mx-auto mb-2"/>
        <h1>Serti</h1>
        <p>Welcome to Agraba</p>
      </div>
    </div>
  </div>


    {/* BELOW - Contact Us + Form */}
  <div className="w-full max-w-5xl flex flex-col md:flex-row items-start p-1 md:p-20 justify-between gap-8">
    {/* Left: Contact Us heading + Image */}
    <div className="flex flex-col md:items-start w-full md:w-[45%] items-center py-12 md:py-0">
      <h2 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap mb-0 md:mb-4 ml-0 md:ml-10">
        Contact Us
      </h2>
      <div className="relative w-60 h-60">
        <Image 
          src={assets.tiller} 
          alt="Contact illustration" 
          fill 
          className="object-contain"
        />
      </div>
      {/* <ArrowBigRight/> */}
    </div>

    {/* Right: Contact Form */}
    <div className="w-full md:w-[60%] flex justify-center bg-[white]/20 p-4 md:p-8 rounded-2xl">
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg px-4 py-3 bg-[white]/10 text-white border border-gray-900 focus:border-[#1C4672] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg px-4 py-3 bg-[white]/20 text-white border border-gray-700 focus:border-[#1C4672] focus:outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full rounded-lg px-4 py-3 bg-[white]/20 text-white border border-gray-700 focus:border-[#1C4672] focus:outline-none resize-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1C4672] text-white rounded-xl hover:bg-[#011830] transition"
        >
          <Send className="w-4 h-4" />
          Send Message
        </button>
      </form>
    </div>
  </div>



</motion.div>

  );
};

export default Contact;
