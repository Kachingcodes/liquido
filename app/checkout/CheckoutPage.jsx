"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Quicksand } from "next/font/google";
import Image from "next/image";
import { assets } from "@/public/assets";


const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

// -------------------- STEP WRAPPER --------------------
const StepWrapper = ({ children }) => (
  <motion.div
    key={Math.random()}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.25 }}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    {children}
  </motion.div>
);

// -------------------- CHECKOUT PAGE --------------------
export default function CheckoutPage() {
  const { cart, setCart } = useStore();

  // -------------------- STATES --------------------
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("");
  const [summary, setSummary] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const locations = ["Ikeja", "Agege", "Ogba", "Berger", "GRA", "Oshodi", "Yaba"];
  const paymentOptions = ["Cash", "Transfer", "POS"];

  // -------------------- DELIVERY SLOTS --------------------
  const generateSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();

    for (let hour = 9; hour <= 19; hour++) {
      const slotDate = new Date();
      let labelDay = "Today";

      if (currentHour >= hour) {
        slotDate.setDate(slotDate.getDate() + 1);
        labelDay = "Tomorrow";
      }

      slotDate.setHours(hour, 0, 0, 0);

      const labelTime = slotDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      slots.push({
        value: slotDate.toISOString(),
        label: `${labelDay} - ${labelTime}`,
      });
    }

    return slots;
  };

  const deliverySlots = generateSlots();

  // -------------------- LOCAL STORAGE RESTORE --------------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkout-progress"));
    if (saved) {
      setLocation(saved.location || "");
      setTime(saved.time || "");
      setPayment(saved.payment || "");
      setStep(saved.step || 1);
    }
    setIsLoaded(true);
  }, []);

  // -------------------- LOCAL STORAGE SAVE --------------------
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "checkout-progress",
      JSON.stringify({ step, location, time, payment })
    );
  }, [step, location, time, payment, isLoaded]);

  // -------------------- SUMMARY --------------------
  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setSummary({
      subtotal,
      delivery: 1500,
      total: subtotal + 1500,
    });
  }, [cart]);

  // -------------------- BUTTON VALIDATION --------------------
  const isContinueDisabled =
    (step === 1 && !location) ||
    (step === 2 && !time) ||
    (step === 3 && !payment);

  const nextStep = () => {
    if (isContinueDisabled) return;
    setStep(step + 1);
  };

  const placeOrder = () => {
    toast.success("Order placed successfully!");
    setCart([]);
    localStorage.removeItem("checkout-progress");
    toast("Invoice page coming soon!");
  };

  if (!isLoaded) return null;

  return (
    <div className="text-center py-4 min-h-screen overflow-hidden">

      <div className="flex items-center justify-center bg-[#1C4672] py-4">
        <div className="relative items-start justify-start">
          <Image
            src={assets.logo}
            alt="logo"
            className="w-[60%] h-auto"
          />
          </div>
        <h1 className={` ${quick.className} md:text-3xl text-2xl text-white md:mt-0 mt-10`}>
            Checkout Page Details
        </h1>
      </div>

        <div className="py-8 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">

            {/* -------------------- LEFT SIDE — STEPS -------------------- */}
            <div className="space-y-4">

                {/* STEP HEADERS with click-to-navigate */}
                <div className="flex justify-between text-sm font-semibold">
                {["Location", "Delivery Time", "Payment", "Review"].map((label, i) => (
                    <button
                    key={i}
                    onClick={() => setStep(i + 1)}
                    className={`${
                        i + 1 <= step
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                    >
                    {label}
                    </button>
                ))}
                </div>

                {/* -------------------- STEP CONTENT -------------------- */}
                <AnimatePresence mode="wait">
                {/* STEP 1: LOCATION */}
                {step === 1 && (
                    <StepWrapper>
                    <h2 className="text-xl font-semibold mb-4">Choose Your Location</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {locations.map((loc) => (
                        <label key={loc} className="flex items-center gap-2 cursor-pointer">
                            <input
                            type="radio"
                            name="location"
                            checked={location === loc}
                            onChange={() => setLocation(loc)}
                            />
                            {loc}
                        </label>
                        ))}
                    </div>

                    <button
                        onClick={nextStep}
                        disabled={!location}
                        className={`mt-6 w-full py-3 rounded-lg text-white ${
                        !location
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#1C4672]"
                        }`}
                    >
                        Continue
                    </button>
                    </StepWrapper>
                )}

                {/* STEP 2: TIME */}
                {step === 2 && (
                    <StepWrapper>
                    <h2 className="text-xl font-semibold mb-3">Select Delivery Time</h2>

                    <div className="space-y-4 md:space-y-2">
                        {deliverySlots.map((slot) => (
                        <label key={slot.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                            type="radio"
                            name="slot"
                            checked={time === slot.value}
                            onChange={() => setTime(slot.value)}
                            />
                            {slot.label}
                        </label>
                        ))}
                    </div>

                    <button
                        onClick={nextStep}
                        disabled={!time}
                        className={`mt-6 w-full py-3 rounded-lg text-white ${
                        !time
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#1C4672]"
                        }`}
                    >
                        Continue
                    </button>
                    </StepWrapper>
                )}

                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                    <StepWrapper>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                    <div className="grid grid-cols-3 gap-4">
                        {paymentOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setPayment(option)}
                            className={`py-3 rounded-lg text-white ${
                            payment === option
                                ? "bg-[#1C4672]"
                                : "bg-gray-400 hover:bg-[#4C86C4]"
                            }`}
                        >
                            {option}
                        </button>
                        ))}
                    </div>

                    <button
                        onClick={nextStep}
                        disabled={!payment}
                        className={`mt-6 w-full py-3 rounded-lg text-white ${
                        !payment
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#1C4672]"
                        }`}
                    >
                        Continue
                    </button>
                    </StepWrapper>
                )}

                {/* STEP 4: REVIEW */}
                {step === 4 && (
                    <StepWrapper>
                    <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

                    <div className="space-y-2 text-sm text-left">
                        <p><strong>Location:</strong> {location}</p>
                        <p><strong>Delivery:</strong> {deliverySlots.find((s) => s.value === time)?.label}</p>
                        <p><strong>Payment:</strong> {payment}</p>
                    </div>

                    <div className="mt-4 border-t pt-4 text-left">
                        <h3 className="font-semibold mb-2">Order Summary</h3>
                        <p>Subtotal: ₦{summary.subtotal}</p>
                        <p className="text-right">Delivery Fee: ₦{summary.delivery}</p>
                        <p className="font-bold text-lg mt-2 text-right">
                        Total: ₦{summary.total}
                        </p>
                    </div>

                    <button
                        onClick={placeOrder}
                        className="mt-6 bg-green-600 text-white w-full py-3 rounded-lg"
                    >
                        Place Order
                    </button>
                    </StepWrapper>
                )}
                </AnimatePresence>
            </div>

            {/* -------------------- RIGHT SIDE — CART DETAILS -------------------- */}
            <div className="bg-white p-6 h-fit sticky top-9 border rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

                {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.name}</span>

                        {/* <div className="flex text-center"> */}
                          <span className="">{item.title} × {item.qty}</span>
                      
                        <span>₦{item.price * item.qty}</span>
                    </div>
                    ))}

                    <hr className="my-4" />

                    <div className="flex justify-between">
                    <strong>Total:</strong>
                    <strong>₦{summary.total}</strong>
                    </div>
                </div>
                )}
            </div>
        </div>
    </div>
    
  );
}
