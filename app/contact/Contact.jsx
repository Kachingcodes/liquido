'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock, ArrowRight, ArrowBigRight, ArrowBigDown, InfoIcon, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/public/assets';
import { Quicksand } from 'next/font/google';
import { FaWhatsapp } from 'react-icons/fa6';


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["600"]
});


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: ""}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name ="Please enter your name";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    }

    // If there are errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Otherwise proceed with form action
    console.log("Form submitted:", formData);

    const phoneNumber = "2347062757706"; 

    const message = `Hi LIQUIDO, my name is ${formData.name}\n
    Contact Info: ${formData.contact}\n\n
    ${formData.message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    setFormData({ name: '', contact: '', message: '' });
  };

  const phoneNum = "2347062757706"; 
  const chat = "Hi LIQUIDO 💧. My name is  I would like to make some inquiries.";



  return (
    <section id='Contact'>
      <div className="px-6 flex flex-col items-center bg-white">

        {/* Grid */}
        <motion.div 
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full max-w-5xl flex flex-col md:flex-row md:items-start md:justify-between gap-8 mt-12">
          
          {/* Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-0 flex-1">
            {/* Card 1 */}
            <div className="bg-white text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-md shadow-[#000000]/40 hover:text-white hover:bg-[#4C86C4]">
              <MapPin className="mx-auto mb-1" size={20}/>
              <h1 className='text-lg mb-2'>LOCATION</h1>
              <p className='text-black text-sm'>107A Adeniyi Jones, Ikeja, Lagos</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-md shadow-[#000000]/40 hover:text-white hover:bg-[#4C86C4]">
              <Clock className="mx-auto mb-1" size={20}/>
              <h1 className='text-lg mb-2'>WORK HOURS</h1>
              <p className='text-black text-sm flex justify-evenly items-center'>Mondays - Saturdays <ArrowRight size={16}/> 9AM - 6PM</p>
              <p className='text-black text-sm flex justify-evenly'>Sundays <ArrowRight size={16}/> 1PM - 6PM</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white text-[#1C4672] p-6 text-center flex flex-col rounded-2xl shadow-md shadow-[#000000]/40 items-center justify-center hover:text-white hover:bg-[#4C86C4]">
              <InfoIcon className="mx-auto mb-1" size={20}/>
              <h1 className='text-lg mb-2'>Contact Info</h1>
              <div className='cursor-pointer hover:border-b-2 hover:border-dotted hover:border-black w-fit'>
                <a
                  href={`https://wa.me/${phoneNum}?text=${encodeURIComponent(chat)}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <p className='text-black text-sm flex justify-center gap-2 items-center cursor-pointer'><FaWhatsapp size={16}/>07062757706</p>
                </a>
              </div>
              <div className='cursor-pointer hover:border-b-2 hover:border-dotted hover:border-black w-fit'>
                <a
                  href="tel:+2347067259151">
                  <p className='text-black text-sm flex justify-center gap-2 items-center'><Phone size={16}/>07067259151</p>
                </a>
              </div>
              <p className='text-black text-sm flex justify-center gap-2 items-center'><Mail size={16}/>getliquido@gmail.com</p>
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
            className="flex flex-col md:items-start w-full md:w-[50%] items-center py-6 md:py-4">
              <div className='flex gap-4 text-black'>
                <h2 className="text-xl md:text-3xl font-bold">
                Contact Us   
                </h2>
                <ArrowBigDown size={30} className='mt-1 md:hidden flex'/>
                <ArrowBigRight size={30} className='mt-1 hidden md:flex'/>
              </div>
            
            <div className="relative w-30 h-30 md:w-60 md:h-60">
              <Image 
                src={assets.tiller} 
                alt="Contact illustration" 
                fill 
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <div className="w-full md:w-[60%] flex justify-center md:bg-[#4C86C4] bg-none p-4 md:p-8 rounded-2xl md:text-white text-black">
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
                  className={`w-full rounded-lg px-4 py-3 bg-gray-200 text-black border 
                    ${ errors.name ? "border-red-500" : "border-gray-900"} 
                    focus:border-[#1C4672] focus:outline-none`}
                />
                  {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm mb-2">Phone Number/Instagram handle</label>
                <input
                  type="contact"
                  name="contact"
                  value={formData.contact}
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
                  className={`w-full rounded-lg px-4 py-3 bg-gray-200 text-black border 
                    ${ errors.name ? "border-red-500" : "border-gray-900"} 
                    focus:border-[#1C4672] focus:outline-none resize-none`}
                ></textarea>
                  {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-gray-100 w-full flex items-center justify-center gap-2 py-3 px-4 hover:bg-[#1C4672] text-[#1C4672] hover:text-white rounded-xl shadow-lg shadow-[#000000]/20 transition"
              >
                <FaWhatsapp size={18}/>
                Chat on WhatsApp
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
