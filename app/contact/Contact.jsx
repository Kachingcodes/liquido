'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock, ArrowBigRight, ArrowBigDown } from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { FaEnvelopeOpenText } from 'react-icons/fa6';


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
    <div className="px-6 pb-10 flex flex-col items-center bg-white">

      {/* Grid */}
      <motion.div 
        initial={{ opacity: 0, y: -70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      className="w-full max-w-5xl flex flex-col md:flex-row md:items-start md:justify-between gap-8 mt-12">
        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {/* Card 1 */}
          <div className="bg-white text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-md shadow-[#000000]/40 hover:text-white hover:bg-[#4C86C4]">
            <MapPin className="mx-auto mb-2" size={20}/>
            <h1 className='text-lg'>LOCATION</h1>
            <p className='text-black text-sm'>Welcome to Agraba</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-md shadow-[#000000]/40  hover:text-white hover:bg-[#4C86C4]">
            <Clock className="mx-auto mb-2" size={20}/>
            <h1 className='text-lg'>WORK HOURS</h1>
            <p className='text-black text-sm'>Welcome to Agraba</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-md shadow-[#000000]/40 hover:text-white hover:bg-[#4C86C4]">
            <FaEnvelopeOpenText className="mx-auto mb-2" size={20}/>
            <h1 className='text-lg'>Email</h1>
            <p className='text-black text-sm'>Welcome to Agraba</p>
          </div>
        </div>
      </motion.div>

        {/* BELOW - Contact Us + Form */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-start p-1 md:p-20 justify-evenly">
        {/* Left: Contact Us heading + Image */}
        <motion.div 
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col md:items-start w-full md:w-[50%] items-center py-12 md:py-4">
            <div className='flex gap-4 text-black'>
              <h2 className="text-2xl md:text-3xl font-bold">
              Contact Us   
              </h2>
              <ArrowBigDown size={30} className='mt-1 md:hidden flex'/>
              <ArrowBigRight size={30} className='mt-1 hidden md:flex'/>
            </div>
          
          <div className="relative w-60 h-60">
            <Image 
              src={assets.tiller} 
              alt="Contact illustration" 
              fill 
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="w-full md:w-[60%] flex justify-center bg-[#4C86C4] p-4 md:p-8 rounded-2xl text-white">
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 bg-gray-200 text-black border border-gray-900 focus:border-[#1C4672] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg px-4 py-3 bg-gray-200 text-black border border-gray-700 focus:border-[#1C4672] focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full rounded-lg px-4 py-3 bg-gray-200 text-black border border-gray-700 focus:border-[#1C4672] focus:outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-gray-100 w-full flex items-center justify-center gap-2 py-3 px-4 hover:bg-[#1C4672] text-[#1C4672] hover:text-white rounded-xl shadow-lg shadow-[#000000]/20 transition"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

    </div>

  );
};

export default Contact;
