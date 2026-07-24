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
   getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Banknote, Landmark, CreditCard, Check } from "lucide-react";


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
    const fetchDeliveryFees = async () => {
      try {
        const snapshot = await getDocs(collection(db, "deliveryFees"));

        const fees = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.active === true);

        setDeliveryFees(fees);
      } catch (error) {
        console.error("Error loading delivery fees:", error);
      } finally {
        setLoadingDelivery(false);
      }
    };

    fetchDeliveryFees();
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

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="bg-[#1C4672] rounded-xl p-2">
            <Image
              src={assets.logo}
              alt="logo"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div>
            <h1
              className={`${quick.className} text-3xl text-[#1C4672]`}
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

    <div className="max-w-7xl mx-auto px-5 py-10">

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div>

          {/* Progress */}
          <div className="bg-white rounded-2xl shadow-sm border p-7 mb-6">

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
                      w-11
                      h-11
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-bold
                      transition

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

            <div className="bg-white rounded-2xl shadow-sm border p-8">
              {/* STEP 1: LOCATION */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepWrapper>
                    <div className="mb-8">
                      <div className="flex justify-between items-start">

                        {/* Left */}
                        <div>
                          <span className="text-sm font-semibold tracking-wider uppercase text-[#1C4672]">
                            Step 1
                          </span>

                          <h2 className="text-3xl font-bold mt-2">
                            Select Delivery Location
                          </h2>

                          <p className="text-gray-500 mt-2">
                            Choose where you'd like your order delivered.
                          </p>
                        </div>

                        {/* Right */}

                        <div className="w-14 h-14 rounded-2xl bg-[#1C4672]/10 flex items-center justify-center text-3xl flex-shrink-0">
                          📍
                        </div>

                      </div>
                    </div>

                    {loadingDelivery ? (
                      <div className="grid md:grid-cols-2 gap-5">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-28 rounded-2xl border animate-pulse bg-gray-100"
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
                              p-6
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

                                <h3 className="text-xl font-semibold">
                                  {loc.name}
                                </h3>

                                {/* <p className="text-gray-500 mt-1">
                                  Estimated delivery available.
                                </p> */}

                              </div>

                              <div className="text-right">

                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                  Delivery Fee
                                </p>

                                <h3 className="text-2xl font-bold text-[#1C4672] mt-2">
                                  ₦{Number(loc.fees).toLocaleString()}
                                </h3>

                              </div>

                            </div>

                            {location === loc.name && (
                              <div className="mt-5 flex items-center gap-2 text-[#1C4672] font-medium">
                                ✓ Selected
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                      )}

                      <div className="flex justify-end mt-10">
                        <button
                          onClick={nextStep}
                          disabled={!location}
                          className={`
                            px-10
                            h-14
                            rounded-xl
                            font-semibold
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
                      </div>
                  </StepWrapper>
                )}

                
                {/* STEP 2: DELIVERY TIME */}
                {step === 2 && (
                  <StepWrapper>
                    <div className="mb-8">
                      <div className="flex items-center justify-between gap-8 mb-8">
                        <div>
                          <span className="text-sm font-semibold tracking-wider uppercase text-[#1C4672]">
                            Step 2
                          </span>

                          <h2 className="text-3xl font-bold mt-2">
                            Choose Delivery Time
                          </h2>

                          <p className="text-gray-500 mt-2">
                            Select the most convenient delivery window.
                          </p>
                        </div>

                        <div className="w-20 h-20 rounded-2xl bg-[#1C4672]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-4xl">🕒</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {deliverySlots.map((slot) => {
                        const selected = time === slot.value;

                        const [day, hour] = slot.label.split(" - ");

                        return (
                          <label
                            key={slot.value}
                            className={`
                              cursor-pointer
                              rounded-2xl
                              border-2
                              p-6
                              transition-all
                              duration-300
                              hover:-translate-y-1
                              hover:shadow-lg

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

                                <h3 className="text-2xl font-bold mt-1">
                                  {hour}
                                </h3>

                              </div>

                              {selected && (
                                <div className="bg-[#1C4672] text-white rounded-full w-8 h-8 flex items-center justify-center">
                                  ✓
                                </div>
                              )}

                            </div>

                          </label>
                        );
                      })}
                    </div>

                    <div className="flex justify-between mt-10">

                      <button
                        onClick={() => setStep(1)}
                        className="px-8 h-14 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                      >
                        ← Back
                      </button>

                      <button
                        onClick={nextStep}
                        disabled={!time}
                        className={`
                          px-10
                          h-14
                          rounded-xl
                          font-semibold
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

                    </div>
                  </StepWrapper>
                )}


                {/* STEP 3: PAYMENT */}
                {step === 3 && (
                  <StepWrapper>
                    <div className="mb-8">
                      <span className="text-sm font-semibold tracking-wider uppercase text-[#1C4672]">
                        Step 3
                      </span>

                      <h2 className="text-3xl font-bold mt-2">
                        Choose Payment Method
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Select your preferred payment option.
                      </p>
                    </div>

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
                              p-6
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

                            <div className="flex justify-between">

                              <div>

                                <div className="w-14 h-14 rounded-xl bg-[#1C4672]/10 flex items-center justify-center mb-5">
                                  <Icon size={28} className="text-[#1C4672]" />
                                </div>

                                <h3 className="text-xl font-semibold">
                                  {method.title}
                                </h3>

                                <p className="text-gray-500 mt-2">
                                  {method.desc}
                                </p>

                              </div>

                              {selected && (
                                <div className="w-8 h-8 rounded-full bg-[#1C4672] text-white flex items-center justify-center">
                                  <Check size={18}/>
                                </div>
                              )}

                            </div>

                          </button>
                        );

                      })}

                    </div>

                    {/* Payment Notice */}

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

                    <div className="flex justify-between mt-10">

                      <button
                        onClick={() => setStep(2)}
                        className="px-8 h-14 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                      >
                        ← Back
                      </button>

                      <button
                        onClick={nextStep}
                        disabled={!payment}
                        className={`
                          px-10
                          h-14
                          rounded-xl
                          font-semibold
                          transition-all

                          ${
                            !payment
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-[#1C4672] text-white hover:bg-[#16395d] hover:shadow-xl"
                          }
                        `}
                      >
                        Continue →
                      </button>

                    </div>
                  </StepWrapper>
                )}

                {/* STEP 4: REVIEW */}
                {step === 4 && (
                  <StepWrapper>
                    <div className="mb-8">
                      <span className="text-sm font-semibold tracking-wider uppercase text-[#1C4672]">
                        Final Step
                      </span>

                      <h2 className="text-3xl font-bold mt-2">
                        Review Your Order
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Please confirm your delivery information before placing your order.
                      </p>
                    </div>

                    {/* Delivery Details */}

                    <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50">

                      <h3 className="font-bold text-lg mb-5">
                        Delivery Details
                      </h3>

                      <div className="space-y-5">

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">
                            Delivery Location
                          </span>

                          <span className="font-semibold">
                            {location}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">
                            Delivery Time
                          </span>

                          <span className="font-semibold text-right">
                            {deliverySlots.find((s) => s.value === time)?.label}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">
                            Payment Method
                          </span>

                          <span className="font-semibold">
                            {payment}
                          </span>
                        </div>

                      </div>

                    </div>

                    {/* Pricing */}

                    <div className="mt-8 rounded-2xl border p-6">

                      <h3 className="font-bold text-lg mb-5">
                        Payment Summary
                      </h3>

                      <div className="space-y-4">

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Items Subtotal
                          </span>

                          <span>
                            ₦{summary.subtotal.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Delivery Fee
                          </span>

                          <span>
                            ₦{summary.delivery.toLocaleString()}
                          </span>
                        </div>

                        <hr />

                        <div className="flex justify-between text-2xl font-bold text-[#1C4672]">

                          <span>Total</span>

                          <span>
                            ₦{summary.total.toLocaleString()}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Information Box */}

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

                        {/* Buttons */}

                        <div className="flex justify-between mt-10">

                          <button
                            onClick={() => setStep(3)}
                            className="h-14 px-8 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                          >
                            ← Back
                          </button>

                          <button
                            onClick={placeOrder}
                            className="h-14 px-10 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition-all"
                          >
                            Confirm & Open WhatsApp →
                          </button>

                        </div>

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
