"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { Quicksand } from "next/font/google";
import Image from "next/image";
import { assets } from "@/public/assets";
import { db } from "../../firebase/firebase"; // your Firebase config
import { collection, addDoc, Timestamp, doc,
   getDoc, getDocs, updateDoc, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Banknote, Landmark, CreditCard, Check } from "lucide-react";
import StepCard from "./StepCard";

const quick = Quicksand({
   subsets: ["latin"],
  weight: ["700"]
});

// -------------------- STEP WRAPPER --------------------
const StepWrapper = ({ children }) => (
  <motion.div
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
  const router = useRouter();

  // -------------------- STATES --------------------
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState("");
  const [summary, setSummary] = useState({
    subtotal: 0,
    delivery: 0,
    total: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Delivery Fees
  const [deliveryFees, setDeliveryFees] = useState([]);
  const [loadingDelivery, setLoadingDelivery] = useState(true);

  const locations = deliveryFees.map((item) => item.name);

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

  // -------------------- LOAD DELIVERY FEES --------------------
 useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "deliveryFees"),
    (snapshot) => {
      const fees = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((item) => item.active);

      setDeliveryFees(fees);
      setLoadingDelivery(false);
    },
    (error) => {
      console.error("Error loading delivery fees:", error);
      setLoadingDelivery(false);
    }
  );

  return () => unsubscribe();
}, []);

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
      JSON.stringify({
        step,
        location,
        time,
        payment,
      })
    );
  }, [step, location, time, payment, isLoaded]);

  // -------------------- SUMMARY --------------------
  useEffect(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + Number(item.price) * item.qty,
      0
    );

    const delivery =
      deliveryFees.find((item) => item.name === location)?.fees || 0;

    setSummary({
      subtotal,
      delivery,
      total: subtotal + delivery,
    });
  }, [cart, location, deliveryFees]);

  // -------------------- BUTTON VALIDATION --------------------
  const isContinueDisabled =
    (step === 1 && !location) ||
    (step === 2 && !time) ||
    (step === 3 && !payment) ||
    loadingDelivery;

  const nextStep = () => {
    if (isContinueDisabled) return;
    setStep(step + 1);
  };

  // -------------------- PLACE ORDER --------------------
  const placeOrder = async () => {
     alert("placeOrder called");
    if (cart.length === 0) return;

    const order = {
      id: Date.now().toString(),
      items: cart,
      total: summary.total,
      date: Timestamp.now(),
      location,
      time,
      payment,
    };

    alert("Before addDoc");

    try {
      await addDoc(collection(db, "storesorders"), {
        id: order.id,
        items: cart,
        total: summary.total,
        date: Timestamp.now(),
        location,
        time,
        payment,
        clientName: "",
        paymentStatus: false,
      });

alert("After addDoc");

      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      existingOrders.push(order);

      localStorage.setItem(
        "orders",
        JSON.stringify(existingOrders)
      );

      const whatsappMsg = encodeURIComponent(
        `New Order
          Items:
          ${cart
            .map(
              (i) =>
          `${i.name}
          ${i.volume}${i.packSize ? ` | Pack of ${i.packSize}` : ""}
          Qty: ${i.qty}
          ₦${(Number(i.price) * i.qty).toLocaleString()}`
            )
            .join("\n\n")}

          Total: ₦${summary.total.toLocaleString()}

          Location: ${location}

          Delivery: ${deliverySlots.find((s) => s.value === time)?.label}

          Payment: ${payment}`
      );

      window.open(
        `https://wa.me/2347062757706?text=${whatsappMsg}`,
        "_blank"
      );

      // -------------------- DEDUCT STOCK --------------------
      for (const item of cart) {
        const productRef = doc(db, "products", item.id);

        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) continue;

        const product = snapshot.data();

        const updatedVariants = (product.variants || []).map((variant) => {
          const sameVolume = variant.volume === item.volume;

          const samePack =
            (variant.packSize || null) === (item.packSize || null);

          if (sameVolume && samePack) {
            return {
              ...variant,
              stock: Math.max(
                0,
                Number(variant.stock) - item.qty
              ),
            };
          }

          return variant;
        });

        await updateDoc(productRef, {
          variants: updatedVariants,
        });
      }

      toast.success("Order placed successfully!");

      setTimeout(() => {
        setCart([]);
        localStorage.removeItem("checkout-progress");
        router.push("/pastOrders");
      }, 3000);

    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (!isLoaded) return null;

  console.log({
  loadingDelivery,
  deliveryFees,
});

return (
  <div className="min-h-screen bg-slate-50">

    {/* ================= HEADER ================= */}
    <div className="sticky top-0 z-30 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-2 py-3 md:px-6 md:py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="bg-[#1C4672] rounded-xl p-2">
            <Image
              src={assets.logo}
              alt="logo"
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
            />
          </div>

          <div>
            <h1
              className={`${quick.className} text-xl md:text-3xl text-[#1C4672]`}
            >
              Checkout
            </h1>

            <p className="text-sm text-gray-500">
              Complete your order in four easy steps
            </p>
          </div>

        </div>

        <div className="hidden lg:block text-right">

          {/* <p className="text-sm text-gray-500">
            Secure Checkout
          </p> */}

          <h3 className="font-semibold text-[#1C4672]">
            Liquido Stores
          </h3>

        </div>

      </div>

    </div>

    {/* ================= CONTENT ================= */}

    <div className="max-w-7xl mx-auto px-3 py-4 md:px-5 md:py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">

        {/* LEFT */}
        <div>

          {/* Progress */}
          <div className="bg-white rounded-2xl shadow-sm border p-3 mb-4 md:p-7 md:mb-6">

            <div className="flex items-center justify-between">
              {[
                "Location",
                "Delivery",
                "Payment",
                "Review",
              ].map((label, i) => {

                const stepNumber = i + 1;

                const completed = step > stepNumber;

                const active = step === stepNumber;

                return (

                  <button
                    key={label}
                    disabled={stepNumber > step}
                    onClick={() => {
                      if (stepNumber <= step) {
                        setStep(stepNumber);
                      }
                    }}
                    className="flex flex-col items-center flex-1"
                  >

                    <div
                      className={`
                      w-8 h-8 md:w-11 md:h-11 text-sm md:text-xl
                      rounded-full flex items-center
                      justify-center font-bold transition
                      ${
                        completed
                          ? "bg-green-600 text-white"
                          : active
                          ? "bg-[#1C4672] text-white scale-110"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                    >
                      {completed ? "✓" : stepNumber}
                    </div>

                    <span
                      className={`mt-3 text-sm font-medium ${
                        active
                          ? "text-[#1C4672]"
                          : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>

                  </button>

                );

              })}

            </div>

            <div className="mt-8 h-2 rounded-full bg-gray-100 overflow-hidden">

              <div
                className="h-full rounded-full bg-[#1C4672] transition-all duration-500"
                style={{
                  width: `${(step / 4) * 100}%`,
                }}
              />

            </div>

            {/* Card */}

            <div className=" rounded-2xl mt-2 md:mt-4">
              {/* STEP 1: LOCATION */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepWrapper>
                    <StepCard
                      step="Step 1"
                      title="Select Delivery Location"
                      description="Choose where you'd like your order delivered."
                      icon="📍"
                      nextButton={

                      <button
                        onClick={nextStep}
                        disabled={!location}
                        className={`
                          px-4 h-10 md:px-10 md:h-14
                          rounded-xl font-lightbold md:font-semibold
                          transition-all
                          ${
                            !location
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#1C4672] text-white hover:bg-[#16395d] hover:shadow-xl"
                          }
                        `}
                      >
                        Continue →
                      </button>
                    }
                  >

                    {loadingDelivery ? (
                    <div className="grid md:grid-cols-2 gap-5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-14 md:h-28 rounded-2xl border animate-pulse bg-gray-100"
                        />
                      ))}
                    </div>
                    ) : (
                    <div className="grid md:grid-cols-1 gap-3">
                      {deliveryFees.map((loc) => (
                        <label
                          key={loc.id}
                          className={`
                            cursor-pointer
                            rounded-2xl
                            border-2
                            p-3 md:p-6
                            transition-all
                            duration-300
                            hover:shadow-lg
                            hover:-translate-y-1
                            ${
                              location === loc.name
                                ? "border-[#1C4672] bg-blue-50 shadow-lg"
                                : "border-gray-200 bg-white"
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="location"
                            className="hidden"
                            checked={location === loc.name}
                            onChange={() => setLocation(loc.name)}
                          />

                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-md md:text-xl font-semibold">{loc.name}</h3>
                            </div>

                            <div className="text-right">
                              <p className="text-xs uppercase tracking-wide md:tracking-wider text-gray-400">
                                Delivery Fee
                              </p>

                              <h3 className="text-md md:text-2xl font-semibold md:font-bold text-[#1C4672] mt-2">
                                ₦{Number(loc.fees).toLocaleString()}
                              </h3>
                            </div>
                          </div>

                          {location === loc.name && (
                            <div className="mt-2 md:mt-5 flex items-center gap-2 text-[#1C4672] font-medium">
                              ✓ Selected
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                    </StepCard>
                  </StepWrapper>
                )}

                {/* STEP 2: DELIVERY TIME */}
                {step === 2 && (
                  <StepWrapper>
                    <StepCard
                      step="Step 2"
                      title="Select Delivery Time"
                      description="Select the most convenient delivery window."
                      icon="🕒"

                      backButton={
                        <button
                          onClick={() => setStep(1)}
                          className="px-4 h-10 md:px-8 md:h-14 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                        >
                          ← Back
                        </button>
                      }
                      nextButton={
                        <button
                          onClick={nextStep}
                          disabled={!time}
                          className={`
                            px-4 h-10 md:px-10 md:h-14
                            rounded-xl font-lightbold md:font-semibold
                            transition-all
                            ${
                              !time
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-[#1C4672] text-white hover:bg-[#16395d] hover:shadow-xl"
                            }
                          `}
                        >
                          Continue →
                        </button>
                      }
                    >

                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                        {deliverySlots.map((slot) => {
                          const selected = time === slot.value;
                          const [day, hour] = slot.label.split(" - ");

                          return (
                            <label
                              key={slot.value}
                              className={` cursor-pointer rounded-2xl border-2 p-3 md:p-6
                                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                                ${
                                  selected
                                    ? "border-[#1C4672] bg-blue-50 shadow-md"
                                    : "border-gray-200"
                                }
                              `}
                            >
                              <input
                                type="radio"
                                name="slot"
                                checked={selected}
                                onChange={() => setTime(slot.value)}
                                className="hidden"
                              />

                              <div className="flex justify-between items-start">

                                <div>

                                  <p className="text-gray-500 text-sm">
                                    {day}
                                  </p>

                                  <h3 className="text-lg font-semibold md:text-2xl md:font-bold mt-1">
                                    {hour}
                                  </h3>

                                </div>

                                {selected && (
                                  <div className="bg-[#1C4672] text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                                    ✓
                                  </div>
                                )}

                              </div>

                            </label>
                          );
                        })}
                      </div>
                    </StepCard>
                  </StepWrapper>
                )}

                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                <StepWrapper>
                  <StepCard
                    step="Step 3"
                    title="Choose Payment Method"
                    description="Select your preferred payment option."
                    icon="💳"
                    backButton={
                      <button
                        onClick={() => setStep(2)}
                        className="px-4 h-10 md:px-8 md:h-14 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                      >
                        ← Back
                      </button>
                    }
                    nextButton={
                      <button
                        onClick={nextStep}
                        disabled={!payment}
                        className={` px-4 h-10 md:px-10 md:h-14 rounded-xl font-lightbold md:font-semibold transition-all
                          ${
                            !payment
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#1C4672] text-white hover:bg-[#16395d] hover:shadow-xl"
                          }
                        `}
                      >
                        Continue →
                      </button>
                    }
                  >
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        {
                          title: "Cash",
                          icon: Banknote,
                          desc: "Pay on delivery",
                        },
                        {
                          title: "Transfer",
                          icon: Landmark,
                          desc: "Bank transfer",
                        },
                        {
                          title: "POS",
                          icon: CreditCard,
                          desc: "Card on delivery",
                        },
                      ].map((method) => {
                        const selected = payment === method.title;
                        const Icon = method.icon;

                        return (
                          <button
                            key={method.title}
                            onClick={() => setPayment(method.title)}
                            className={`
                              rounded-2xl
                              border-2
                              p-3 md:p-6
                              text-left
                              transition-all
                              duration-300
                              hover:-translate-y-1
                              hover:shadow-lg
                              ${
                                selected
                                  ? "border-[#1C4672] bg-blue-50 shadow-lg"
                                  : "border-gray-200 bg-white"
                              }
                            `}
                          >
                            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-[#1C4672]/10 flex items-center justify-center mb-2.5 md:mb-5">
                              <Icon size={20} className="text-[#1C4672]" />
                            </div>

                            <h3 className="text-md md:text-xl font-semibold">
                              {method.title}
                            </h3>

                            <p className="text-sm md:text-md text-gray-500 mt-2">
                              {method.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                      <h4 className="font-semibold text-[#1C4672]">
                        Payment Information
                      </h4>

                      <p className="text-sm text-gray-600 mt-2 leading-7">
                        Depending on your selected payment method, our delivery agent
                        will either collect cash, provide bank transfer details, or
                        arrive with a POS terminal.
                      </p>
                    </div>
                  </StepCard>
                </StepWrapper>
              )}

                {/* STEP 4: REVIEW */}
                {step === 4 && (
                <StepWrapper>
                  <StepCard
                    step="Final Step"
                    title="Review Your Order"
                    description="Please confirm your delivery information before placing your order."
                    icon="✅"
                    backButton={
                      <button
                        onClick={() => setStep(3)}
                        className="px-4 h-10 md:px-10 md:h-14 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                      >
                        ← Back
                      </button>
                    }
                    nextButton={
                      <button
                        onClick={placeOrder}
                        className="px-4 h-10 md:px-10 md:h-14 rounded-xl bg-green-600 hover:bg-green-700 text-white font-lightbold md:font-bold shadow-lg transition-all"
                      >
                        Confirm & Proceed →
                      </button>
                    }
                  >
                    {/* Delivery Details */}

                    <div className="rounded-2xl border border-gray-200 p-4 md:p-6 bg-gray-50">
                      <h3 className="font-semibold text-md md:font-bold md:text-lg mb-5">
                        Delivery Details
                      </h3>

                      <div className="space-y-5">
                        <div className="flex justify-between items-center">
                          <span className="text-sm md:text-lg text-gray-500">Delivery Location</span>
                          <span className="font-lightbold md:font-semibold">{location}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm md:text-lg text-gray-500">Delivery Time</span>
                          <span className="font-lightbold md:font-semibold text-right">
                            {deliverySlots.find((s) => s.value === time)?.label}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm md:text-lg text-gray-500">Payment Method</span>
                          <span className="font-lightbold md:font-semibold">{payment}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}

                    <div className="mt-4 md:mt-8 rounded-2xl border p-4 md:p-6">
                      <h3 className="font-lightbold md:font-bold text-lg mb-5">
                        Payment Summary
                      </h3>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm md:text-lg text-gray-500">Items Subtotal</span>
                          <span>₦{summary.subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm md:text-lg text-gray-500">Delivery Fee</span>
                          <span>₦{summary.delivery.toLocaleString()}</span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-lg md:text-2xl font-lightbold md:font-bold text-[#1C4672]">
                          <span>Total</span>
                          <span>₦{summary.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Information */}

                    <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-200 p-5">
                      <h4 className="font-semibold text-[#1C4672]">
                        What happens next?
                      </h4>

                      <ul className="mt-4 text-sm text-gray-600 space-y-2 list-disc ml-5">
                        <li>Your WhatsApp chat will open automatically.</li>
                        <li>Your order details will already be filled in.</li>
                        <li>Simply send the message to confirm your order.</li>
                        <li>Our team will contact you shortly.</li>
                      </ul>
                    </div>
                  </StepCard>
                </StepWrapper>
              )}
              </AnimatePresence>
            </div>

          </div> {/*END OF PROGRESS*/}

        </div> {/*END OF LEFT*/}

        {/* -------------------- RIGHT SIDE — ORDER SUMMARY -------------------- */}

        <div className="sticky top-8 h-fit">

          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">

            {/* Header */}

            <div className="bg-[#1C4672] px-8 py-6 text-white">

              <p className="uppercase tracking-[3px] text-xs opacity-80">
                Order Summary
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </h2>

            </div>

            {/* Cart Items */}

            <div className="p-7">

              {cart.length === 0 ? (

                <div className="text-center py-12">

                  <div className="text-6xl mb-4">
                    🛒
                  </div>

                  <h3 className="font-semibold text-lg">
                    Your cart is empty
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Add some products before checking out.
                  </p>

                </div>

              ) : (

                <>
                  <div className="space-y-6">

                    {cart.map((item) => (

                      <div
                        key={`${item.id}-${item.volume}-${item.packSize}`}
                        className="flex gap-4 items-start"
                      >

                        {/* Product Image */}

                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">

                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />

                        </div>

                        {/* Details */}

                        <div className="flex-1">

                          <h3 className="font-semibold text-lg">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {item.volume}
                            {item.packSize && ` • Pack of ${item.packSize}`}
                          </p>

                          <div className="flex justify-between mt-3">

                            <span className="text-gray-500">
                              Qty × {item.qty}
                            </span>

                            <span className="font-bold">
                              ₦{(Number(item.price) * item.qty).toLocaleString()}
                            </span>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* Divider */}

                  <div className="border-t my-8" />

                  {/* Pricing */}

                  <div className="space-y-4">

                    <div className="flex justify-between text-gray-600">

                      <span>Items</span>

                      <span>
                        ₦{(summary.subtotal ?? 0).toLocaleString()}
                      </span>

                    </div>

                    <div className="flex justify-between text-gray-600">

                      <span>Delivery</span>

                      <span>
                        ₦{(summary.delivery ?? 0).toLocaleString()}
                      </span>

                    </div>

                    <div className="border-t pt-5 flex justify-between">

                      <span className="text-xl font-bold">
                        Total
                      </span>

                      <span className="text-3xl font-bold text-[#1C4672]">
                        ₦{(summary.total ?? 0).toLocaleString()}
                      </span>

                    </div>

                  </div>

                  {/* Trust Box */}

                  <div className="mt-8 rounded-2xl bg-[#F5F9FF] border border-blue-100 p-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-full bg-[#1C4672] text-white flex items-center justify-center">

                        ✓

                      </div>

                      <div>

                        <h4 className="font-semibold">
                          Secure Checkout
                        </h4>

                        <p className="text-sm text-gray-500">
                          Your order is confirmed via WhatsApp before processing.
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Delivery Status */}

                  <div className="mt-6 rounded-2xl border border-gray-200 p-5">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Delivery
                      </span>

                      <span className="font-semibold">

                        {location || "Not selected"}

                      </span>

                    </div>

                    <div className="flex justify-between mt-4">

                      <span className="text-gray-500">
                        Payment
                      </span>

                      <span className="font-semibold">

                        {payment || "Not selected"}

                      </span>

                    </div>

                  </div>

                </>

              )}

            </div>

          </div>
        </div> {/*END OF RIGHT*/}
      </div> {/*END OF GRID*/}
    </div>   {/*END OF CONTENT*/}
  </div>
  );
}
