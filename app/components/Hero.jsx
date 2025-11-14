import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Instagram,  Linkedin, Facebook } from "lucide-react";
import { FaXTwitter, FaWhatsapp, FaInstagram, FaX, FaTiktok, FaLinkedin } from "react-icons/fa6";
import { Quicksand } from "next/font/google";

// Example usage: <LiquidoHero products={products} />
// products = [{ id, title, subtitle, image, tag }]
const quick = Quicksand({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Hero({ products }) {
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

  const phoneNumber = "2347062757706"; 
  const message = "Hello Liquido 💧. I would like to make some inquiries.";

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(120deg, rgba(28,70,114,0.95) 0%, rgba(76,134,196,0.92) 55%, rgba(255,255,255,0.02) 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/10">
                <span className="text-xs uppercase tracking-wider text-white/90 font-medium">Liquido</span>
                <span className="text-xs text-white/60">Luxury • Lifestyle</span>
              </div>

              <h1 className={`${quick.className} text-2xl sm:text-3xl lg:text-6xl leading-tight font-extrabold text-white drop-shadow-lg`}>
                Everything Liquid Delivered To You With Ease
                <span className="block text-xl sm:text-xl font-medium text-white/90 mt-2">Fresh drinks • Personal care • Culinary essentials</span>
              </h1>

              <p className="text-white/85 max-w-xl text-md">
                Liquido is your number-one plug — redefining the way you get water and drinks. Say goodbye to
                heavy lifting and long queues at supermarkets. We’re here to save your time and energy by
                delivering every liquid product you need, directly to your doorstep.
              </p>

              <div className="flex items-center gap-4">
                <button
                  className="relative inline-flex items-center gap-3 rounded-2xl px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 transform transition shadow-md"
                  onMouseEnter={stopAutoplay}
                  onMouseLeave={startAutoplay}
                >
                  <motion.span
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-white font-semibold"
                  >
                    Explore Liquido
                  </motion.span>
                </button>

                <div className="hidden sm:flex items-center gap-3 text-white">
                  {/* <a href="#" aria-label="Instagram" className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <Instagram size={18} className="text-white" />
                  </a> */}
                  {/* <a href="#" aria-label="Tiktok" className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <Tiktok size={18} className="text-white" />
                  </a> */}
                  {/* <a href="#" aria-label="LinkedIn" className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <Linkedin size={18} className="text-white" />
                  </a>
                  <a href="#" aria-label="Facebook" className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <Facebook size={18} className="text-white" />
                  </a> */}

                  <a href="https://twitter.com/liquido_ng" target="_blank" rel="noopener noreferrer" 
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaXTwitter size={18}/>
                  </a>
                  <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaWhatsapp size={18}/>
                  </a>
                  <a href="https://instagram.com/liquido.ng" target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaInstagram size={18}/>
                  </a>
                  <a href="https://tiktok.com/@liquido.ng" target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaTiktok size={18}/>
                  </a>
                  <a href="https://linkedin.com/company/liquidong" target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaLinkedin size={18}/>
                  </a>                  
                </div>
              </div>

              <div className="mt-6 flex gap-4 text-sm text-white/80">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  <span>Same‑day delivery</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  <span>Eco packaging</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/60" />
                  <span>Subscription available</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-white/6 to-white/3 backdrop-blur-2xl">
                <div className="absolute -left-24 -top-10 w-72 h-72 rounded-full opacity-10" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 30%)" }} />
                <div className="absolute -right-24 -bottom-12 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.06), transparent 30%)" }} />

                <button
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
                </button>

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
                              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl bg-white/6 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                                <motion.div
                                  animate={{ rotate: [0, 4, 0, -3, 0] }}
                                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                                  className="absolute inset-0"
                                />

                                <img src={p.image} alt={p.title} className="w-40 h-40 object-contain z-10" />
                              </div>
                            </div>

                            <div className="pt-6 sm:pt-0">
                              <div className="inline-flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white">{p.tag}</span>
                              </div>
                              <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                              <p className="text-white/85 mt-3">{p.subtitle}</p>

                              <div className="mt-6 flex gap-3">
                                <a href="#" className="text-sm font-medium px-4 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm hover:scale-105 transition">View details</a>
                                <a href="#" className="text-sm font-medium px-4 py-2 rounded-xl bg-white text-slate-800 hover:opacity-95 transition">Order now</a>
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

              {/* <div className="absolute -right-6 top-1/4 hidden md:flex flex-col gap-3 z-30">
                  <a href="https://twitter.com/liquido_ng" target="_blank" rel="noopener noreferrer" 
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaXTwitter size={18}/>
                  </a>
                  <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaWhatsapp size={18}/>
                  </a>
                  <a href="https://instagram.com/liquido.ng" target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaInstagram size={18}/>
                  </a>
                  <a href="https://tiktok.com/@liquido.ng" target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaTiktok size={18}/>
                  </a>
                  <a href="https://linkedin.com/company/liquidong" target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-white/6 backdrop-blur-sm rounded-lg border border-white/10 hover:scale-105 transition">
                    <FaLinkedin size={18}/>
                  </a>
              </div> */}
            </div>

            <div className="mt-6 flex items-center gap-4 overflow-x-auto py-2">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
