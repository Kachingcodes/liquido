'use client';
import { Droplets, Sparkles, CookingPot, User, Gem, Car } from "lucide-react";
import bulk from './bulk.png';
import delivery from './delivery.png';
import drop from './drop.png';
import jugs from './jugs.png';
import location from './location.png';
import logo from './logo.png';
import nylon from './nylon.png';
import tiller from './tiller.png';
import van from './van.png';
import water1 from './water1.png';
import water2 from './water2.png';



export const assets = {
  bulk,
  delivery,
    drop,  
    jugs,
    location,
    logo,
    nylon,
    tiller,
    van,
    water1,
    water2
}

export const steps = [
  {
    id: "01",
    title: "Place your order",
    desc: "Call, WhatsApp or order online — Make your choice of liquid",
  },
  {
    id: "02",
    title: "Fast Processing",
    desc: "We confirm your order and prepare it right away",
  },
  {
    id: "03",
    title: "Reliable Delivery",
    desc: "Timely water supply for homes, businesses, and estates",
  },
  {
    id: "04",
    title: "Enjoy",
    desc: "Clean, certified water with strict safety standards",
  },
];

export const categories = [
  {
    name: "Water & Drinks",
    icon: <Droplets size={20}/>,
    options: ["Bottled Water", "Dispenser Refills", "Energy Drinks", "Soda", "Fruit Juices", "Wine & Alcoholic Beverages"],   
      items: [
      {
        img: "/categories/water1.png",
        top: "Water",
        text: "Satchet, Bottled, Dispenser, Specialty"
      },
      {
        img: "/categories/juice.png",
        top: "Juices",
        text: "Orange, Apple, Mixed fruit, Mango"
      },
      {
        img: "/categories/wine.png",
        top: "Wine",
        text: "Red, White, Rosé, Sparkling"
      }
    ]
  },
//HYGIENE
  {
    name: "Hygiene & Cleaning",
    icon: <Sparkles size={20}/>,
    options: ["Detergents",  "Disinfectants", "Soaps"],
    items: [
      {
        img: "/categories/detergent.png",
        top: "Detergents",
        text: "Morning Fresh, Mama Lemon, Ariel liquid"
      },
      {
        img: "/categories/dettol.png",
        top: "Disinfectants",
        text: "Jik, Dettol, Harpic, Lysol"
      },
      {
        img: "/categories/soap.png",
        top: "Soaps",
        text: "Dettol liquid soap, Lifebuoy, Kleanmate"
      }
    ]
  },
//COOKING & EDIBLE LIQUIDS
  {
    name: "Cooking & Edible Liquids",
    icon: <CookingPot size={20} />,
    options: ["Cooking Oil", "Vinegar", "Liquid Seasoning", "Syrup"],
    items: [
      {
        img: "/categories/cooking.png",
        top: "Cooking oils",
        text: "Vegetable Oil, Palm oil, Soyabean oil."
      },
      {
        img: "/categories/syrup.png",
        top: "Syrups",
        text: "Maple, Chocolate, Flavored syrups, Honey."
      },
      {
        img: "/categories/vinegar.png",
        top: "Vinegars",
        text: "Apple cider, Malt, White, Coconut"
      }
    ]
  },
//PERSONAL CARE
{
  name: "Personal Care",
  icon: <User size={20} />,
  options: ["Shampoos", "Conditioners", "Body Oils", "Lotions"],
  items: [
      {
        img: "/categories/cantu.png",
        top: "Hair Care",
        text: "Shampoos, Conditioners, Hair oils"
      },
      {
        img: "/categories/bodyoil.png",
        top: "Body Oils",
        text: "Coconut oil, Shea oil, Almond oil, Olive oil, Baby oils"
      },
      {
        img: "/categories/nivea.png",
        top: "Lotions",
        text: "Sunscreen, Baby lotion, Moisturizers, Hand & Foot lotions"
      }
    ]
},
//LUXURY & LIFESTYLE
  {
    name: "Luxury & Lifestyle",
    icon: <Gem size={20} />,
    options: ["Perfumes", "Essential Oils", "Fragrance Diffusers"],
    items: [
      {
        img: "/categories/perfume.png",
        top: "Perfumes",
        text: "Eau de parfum, Eau de toilette, Body mists,"
      },
      {
        img: "/categories/essential.png",
        top: "Essential Oils",
        text: "Floral, Citrus, Herbal, Spice, Woodsy"
      },
      {
        img: "/categories/diffuser.png",
        top: "Fragrance Diffusers",
        text: "Reed diffusers, Oil burners, Electric plug-in"
      }
    ]
  },
//AUTOMOBILE
  {
    name: "Automobile",
    icon: <Car size={20} />,
    options: ["Engine Oil", "Transmission Fluid", "Coolant", "Gear Oil"],
    items: [
      {
        img: "/categories/engine.png",
        top: "Engine Oil",
        text: "Total, Mobil, Castrol, Shell Helix, Oando"
      },
      {
        img: "/categories/mobil.png",
        top: "Automotive Liquids",
        text: "ATF (Dexron II/III), DOT brake fluids, gear oil, coolant"
      },
      {
        img: "/categories/fluid.png",
        top: "Windshield Fluid",
        text: "Windshield Fluid"
      }
    ]
  }
];


export const images = [
    "/trusted/banahGrace.jpg",
    "/trusted/darwayCoast.jpg",
    "/trusted/ivy.jpg",
    "/trusted/landmark1.jpg",
    "/trusted/landmark2.jpg",
    "/trusted/luxolHomes.jpg",
    "/trusted/mikano.jpg",
    "/trusted/solarPro.jpg",
    "/trusted/togaTravels.jpg",
    "/trusted/wgTrips.jpg"
];


export const testimonials =[
  {
    id:1,
    name: "Kester Africa Limited",
    review: "Liquido stores are always closer to your doorstep than you think, and that's exactly what makes them so convenient! Kudos to the team for making their services so accessible.",
    img:"/people/kester.png"
  },
  {
    id:2,
    name: "Ebun Adeola",
    review: "I love that they offer eco-friendly packaging. It’s rare to find a delivery service that cares about the environment as much as the customers.",
    img:"/people/ebun.jpg"
  },
  {
    id:3,
    name: "Alina Becker",
    review: "They really combine affordability with convenience. That's rare to find these days.",
    img:"/people/happy3.jpg"
  },
  {
    id:4,
    name: "Akinwolire Damilare",
    review: "Very reliable and fast in delivery.",
    img:"/people/happy4.jpg"
  },
  {
    id:5,
    name: "Emeka Nonso",
    review: "The delivery drivers are friendly and professional, and my orders always arrive ahead of time. Makes life so much easier!",
    img:"/people/emeka.jpg"
  },
  {
    id:6,
    name: "Saviour Ikrangubek",
    review: "Fast and Reliable.",
    img:"/people/happy6.jpg"
  },
  {
    id:7,
    name: "Opia Favour",
    review: "The Service was great and the delivery was swift.",
    img:"/people/happy7.jpg"
  },
  {
    id:8,
    name: "Blessing Chukwu",
    review: "I was blown away by how personalized the service felt. They remembered my preferences and always delivered exactly what I needed.",
    img:"/people/ada.jpg"
  },
  {
    id:9,
    name: "Jane Ogba",
    review: "He is reliable. Just give him a call and he will deliver to you anywhere you are.",
    img:"/people/happy9.jpg"
  }
];


export const adverts = [
  { img: "/adverts/smoothie.png", text: "🔥 Big Discount – 20% Off All Items!" },
  { img: "/adverts/coffee.png", text: "🎉 Buy 1 Get 1 Free This Week!" },
  { img: "/adverts/wine.png", text: "🚚 Free Shipping on Orders Over ₦20,000!" },
  { img: "/adverts/icetea.png", text: "✨ New Arrivals Just Dropped – Shop Now!" },
];


export const faqs = [
  { q: "What is the timing of your deliveries?", a: "We deliver daily between 9Am and 6PM. Once your order is placed, we will confirm your exact delivery window." },
  { q: "How does your delivery service work?", a: "It's simple! Tell us the drinks you want, place your order and we'll deliver them to your doorstep quickly and free of charge [Depending on your location]." },
  { q: "What brands of water and drinks do you offer?", a: "We offer a wide range of trusted wateer brands and various beverages to suit your needs. You can find a detailed list on our website." },
  { q: "How do I make payment?", a: "You can pay via transfer, POS (card) or cash on delivery. Once your order is confirmed, we'll send you the payment details. We accept Payment on Delivery." },
  { q: "How much is delivery?", a: "Delivery is free/affordable within Adeniyi Jones (Ikeja). For longer distances, we'll confirm the delivery fee once you share your location." },
  { q: "Do you accept bulk orders?", a: "Yes we do. For bulk orders, kindly share the quantity and location via our DM so we can give you a tailored quote and delivery plan." },
  { q: "Apart from water, what else do you deliver?", a: "Liquido NG is more than water. We also deliver liquid soap, soft drinks, wines and other essential liquids straight to your doorstep." },
    { q: "Which areas do you deliver to?", a: "We currently deliver across Ikeja and Environs. If your location isn't listed, kindly share it with us and we'll confirm availability." },
];