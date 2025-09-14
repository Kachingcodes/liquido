"use client";
import React, { useState } from "react";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Image from "next/image";
import { assets } from "@/public/assets";
import Link from "next/link";
import { Quicksand } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';


const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [drops, setDrops] = useState([]);
    const router = useRouter();

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

      const handlePlaceOrder = () => {
    // Add drop on click
    const newDrop = { id: Date.now() };
    setDrops((prev) => [...prev, newDrop]);

    // Remove drop after animation
    setTimeout(() => {
      setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
    }, 3000);

    setTimeout(() => {
      router.push("/shop");
    }, 600); 
  };

    return (
        <section className="w-full min-h-screen bg-[#4C86C4] relative overflow-hidden text-white flex items-center justify-center">
            {/* Backgrounds */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover hidden md:block"
                style={{ backgroundImage: "url('/heroside.svg')" }}
            />
            <div
                className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover block md:hidden"
                style={{ backgroundImage: "url('/phonehero.svg')" }}
            />

            <div className="flex flex-col w-full p-2 md:p-8 items-center relative z-20">
                <div className="flex flex-col md:flex-row gap-6 items-center shadow-md shadow-[#000000]/60 p-6 md:p-10 bg-white/10 rounded-xl">
                
                {/* Left Section */}
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    {/* <h1 className={`${quick.className} text-6xl font-bold`}>
                    Welcome To
                    </h1> */}

                    <Link href="/">
                    <Image
                        src={assets.logo}
                        alt="logo"
                        className="w-60 md:w-80 h-auto"
                    />
                    </Link>

                    {/* Circle with Water */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className=" w-30 h-30 md:w-46 md:h-46
                          bg-[linear-gradient(to_bottom,#8FC0F4_0%,rgba(143,192,244,0.6)_50%,#1C4672_100%)] 
                          rounded-full flex items-center justify-center"
                        >
                        <Image src={assets.water2} alt="Water2" className="w-[80%] object-contain" />
                    </motion.div>

                    {/* Socials */}
                    <div className="flex flex-row gap-4 mt-2">
                        <div className="relative w-10 h-10">
                            <Image src={assets.foot1} alt="whatsapp" fill className="object-contain" />
                        </div>
                        <div className="relative w-10 h-10">
                            <Image src={assets.foot2} alt="instagram" fill className="object-contain" />
                        </div>
                        <div className="relative w-10 h-10">
                            <Image src={assets.foot3} alt="tiktok" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col gap-4 bg-white/10 p-8 rounded-lg w-full max-w-sm">
                    <h3 className={`${quick.className} text-center text-2xl font-semibold`}>
                    SIGN IN
                    </h3>

                    <div className="border-2 rounded-lg p-2">
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full bg-transparent outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    <div className="border-2 rounded-lg p-2">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-transparent outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>

                    <button
                    onClick={handlePlaceOrder}
                    className="bg-[#1C4672] px-4 py-3 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 hover:bg-[#8FC0F4]/40 transition"
                    >
                    Log In
                    </button>

                    <hr className="border-white" />

                    <div className="gap-2 flex">
                        <p className="">Don't have account?
                            <span className="text-[#1C4672] cursor-pointer ml-2">Sign up</span>
                        </p>
                    </div>

                </div>

                {/* Logout Button (Optional) */}
                {/* 
                <button
                    onClick={logout}
                    className="bg-[#1C4672] px-4 py-3 text-white text-lg rounded-lg shadow-md shadow-[#000000]/50 hover:bg-[#8FC0F4]/40 transition"
                >
                    Log Out
                </button>
                */}
                </div>
            </div>
</section>

    );
};

export default Auth;