import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowLeft, ArrowRight, Instagram,  Linkedin, Facebook } from "lucide-react";
import { FaXTwitter, FaWhatsapp, FaInstagram, FaX, FaTiktok, FaLinkedin } from "react-icons/fa6";
import { Imprima, Quicksand } from "next/font/google";
// import { useRouter } from "next/router";
import Link from "next/link";


// Example usage: <LiquidoHero products={products} />
// products = [{ id, title, subtitle, image, tag }]
const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Hero({ products }) {
  const [drops, setDrops] = useState([]);
  // const router = useRouter();

  const defaultProducts = [
    {
      id: 1,
      title: "Purified Spring Water",
      subtitle: "Crisp. Clean. Delivered.",
      image: "/water1.png",
      tag: "Water & Drinks",
    },
    {
      id: 2,
      title: "Gourmet Olive Oil",
      subtitle: "Cold pressed perfection.",
      image: "/categories/cooking.png",
      tag: "Cooking & Edibles",
    },
    {
      id: 3,
      title: "Aromatic Body Mist",
      subtitle: "Daily luxury for skin.",
      image: "/categories/perfume.png",
      tag: "Personal Care",
    },
    {
      id: 4,
      title: "Crafted Cold-Pressed Juice",
      subtitle: "Taste the freshness.",
      image: "/categories/juice.png",
      tag: "Water & Drinks",
    },
  ];

  const items = products && products.length ? products : defaultProducts;
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [index]);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

   const handleExploreLiquido = () => {
  // Add drop on click
  const newDrop = { id: Date.now() };
  setDrops((prev) => [...prev, newDrop]);

  // Remove drop after animation
  setTimeout(() => {
    setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
  }, 3000);

  setTimeout(() => {
    const element = document.getElementById("Categories");
    if (element) {
      const navbarHeight = 60;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, 500);
};
  const phoneNumber = "2347062757706"; 
  const message = "Hello Liquido 💧. I would like to make some inquiries.";

  return (
  <section id="Home"
    className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(150deg, rgba(20,70,114,0.95) 0%, rgba(86,134,196,0.92) 70%, rgba(255,255,255,0.02) 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 py-20 lg:py-28">

{/*MOBILE VIEW HERE*/}
<div className="flex relative md:hidden mb-7">
  <div className="relative w-full h-[280px] rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl">

    {/* Background circles */}
    <div className="absolute -left-16 -top-10 w-56 h-56 rounded-full opacity-10"
      style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 30%)" }} />

    <div className="absolute -right-16 -bottom-10 w-60 h-60 rounded-full opacity-8"
      style={{ background: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06), transparent 30%)" }} />

    {/* Left / Right buttons */}
    {/* <button
      onClick={prev}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:scale-105 transition"
    >
      <ArrowLeft size={14} className="text-white" />
    </button>

    <button
      onClick={next}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:scale-105 transition"
    >
      <ArrowRight size={14} className="text-white" />
    </button> */}

    {/* Content */}
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <AnimatePresence initial={false} mode="wait">
        {items.map((p, i) => {
          if (i !== index) return null;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -6 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 gap-4 items-center">

                {/* Image */}
                <div className="flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 3, 0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                      className="absolute inset-0"
                    />
                    <img src={p.image} alt={p.title} className="w-30 h-30 object-contain z-10"/>
                  </div>
                </div>

                {/* Text */}
                <div className="">
                  <div className="inline-flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 border border-white/10 text-white">
                      {p.tag}
                    </span>
                  </div>

                  {/* <h3 className="text-xl font-semibold text-white">{p.title}</h3> */}
                  {/* <p className="text-white/80 mt-2 text-sm leading-tight">{p.subtitle}</p> */}

                  {/* Buttons */}
                  {/* <div className="mt-4 flex gap-2">
                    <a className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-sm hover:scale-105 transition">
                      View details
                    </a>
                    <a className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white text-slate-800 hover:opacity-95 transition">
                      Order now
                    </a>
                  </div> */}

                  <div className="mt-3 flex items-center gap-1 text-xs text-white/70">
                    <span>•</span>
                    <span>Free delivery over ₦10,000</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>

    {/* Indicators */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
      {items.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`w-1.5 h-1.5 rounded-full transition-transform ${i === index ? "scale-110 bg-white" : "bg-white/30"}`}
        />
      ))}
    </div>
  </div>
</div>


{/*ENDS HERE*/}

{/*DESKTOP VIEW*/}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="hidden md:inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/10">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">Liquido</span>
                <span className="text-xs text-white/80">Luxury • Lifestyle</span>
              </div>

              <h1 className={`${quick.className} text-2xl sm:text-3xl lg:text-5xl leading-tight font-extrabold text-[#d7e2ee] drop-shadow-lg`}>
                Everything Liquid Delivered To You With Ease
                {/* <span className="block text-xl sm:text-xl font-medium text-white/90 mt-2">Fresh drinks • Personal care • Culinary essentials</span> */}
              </h1>

              <p className="text-white/85 max-w-xl text-md">
                Liquido is your number-one plug for water and drinks - fast, reliable, and delivered to your doorstep with ease.
              </p>

              <div className="flex   gap-3">
  {/* CTA BUTTON */}
  <button
    onClick={handleExploreLiquido}
    onMouseEnter={stopAutoplay}
    onMouseLeave={startAutoplay}
    className="
      relative
      inline-flex
      items-center
      gap-3
      rounded-2xl
      px-6
      py-3
      bg-white/10
      backdrop-blur-md
      border border-white/20
      shadow-md
      hover:scale-105
      transition
    "
  >
    <motion.span
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="text-white font-semibold flex gap-3"
    >
      Explore Liquido <Compass size={18} className="mt-1" />
    </motion.span>
  </button>

  {/* SOCIALS CLUSTER */}
  <div className="hidden sm:flex items-center gap-1.5">
    {[
      { href: "https://twitter.com/liquido_ng", icon: <FaXTwitter size={18} /> },
      { href: `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, icon: <FaWhatsapp size={18} /> },
      { href: "https://instagram.com/liquido.ng", icon: <FaInstagram size={18} /> },
      { href: "https://tiktok.com/@liquido.ng", icon: <FaTiktok size={18} /> },
      { href: "https://linkedin.com/company/liquidong", icon: <FaLinkedin size={18} /> },
    ].map((item, i) => (
      <motion.a
        key={i}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="
          relative
          p-2
          rounded-lg
          bg-white/6
          backdrop-blur-sm
          border border-white/10
          text-white
          shadow-sm
          hover:shadow-lg
          hover:z-10
        "
      >
        {item.icon}
      </motion.a>
    ))}
  </div>
</div>


              <div className="mt-6 flex gap-4 text-sm text-white/80">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  <span>Same‑day Delivery</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  <span>Bulk Delivery</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  <span>Scheduled Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <div className="md:flex relative hidden">
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-2xl">
                {/* <div className="absolute -left-24 -top-10 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 30%)" }} />
                <div className="absolute -right-24 -bottom-12 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06), transparent 30%)" }} /> */}

                {/* <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/10 hover:scale-105 transition"
                  aria-label="Previous"
                >
                  <ArrowLeft size={18} className="text-white" />
                </button>

                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/6 backdrop-blur-sm border border-white/10 hover:scale-105 transition"
                  aria-label="Next"
                >
                  <ArrowRight size={18} className="text-white" />
                </button> */}

                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <AnimatePresence initial={false} mode="wait">
                    {items.map((p, i) => {
                      if (i !== index) return null;
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.96, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -8 }}
                          transition={{ duration: 0.6 }}
                          className="w-full max-w-3xl"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                            <div className="flex items-center justify-center">
                              <div className="relative ">
                                {/* w-56 h-56 sm:w-72 sm:h-72 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg */}
                                <motion.div
                                  animate={{ rotate: [0, 4, 0, -3, 0] }}
                                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                  className="absolute inset-0"
                                />

                                <img src={p.image} alt={p.title} className="w-70 h-60 object-contain z-10" />
                              </div>
                            </div>

                            <div className="pt-6 sm:pt-0">
                              <div className="inline-flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white">{p.tag}</span>
                              </div>
                              <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                              <p className="text-white/85 mt-3">{p.subtitle}</p>

                              <div className="mt-6 flex gap-3">
                                <Link 
                                  href="/liquidostores"               
                                  className="text-sm font-medium px-4 py-2 rounded-xl bg-gray-200 hover:bg-white text-slate-800 hover:opacity-95 transition">Order now
                                </Link>
                              </div>

                              <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
                                <span>•</span>
                                <span>Free delivery over ₦10,000</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-2 h-2 rounded-full transition-transform ${i === index ? "scale-110 bg-white" : "bg-white/30"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="mt-6 hidden md:flex items-center gap-4 overflow-x-auto py-2">
              {items.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  className={`min-w-[140px] flex-shrink-0 p-3 rounded-xl border border-white/8 backdrop-blur-sm bg-white/4 hover:scale-105 transition ${i === index ? "ring-2 ring-white/20" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.title} className="w-12 h-12 object-contain" />
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">{p.title}</div>
                      <div className="text-xs text-white/70">{p.tag}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
