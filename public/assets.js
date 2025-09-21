'use client';
import { Droplets, Sparkles, CookingPot, User, Gem, Car } from "lucide-react";
import bulk from './bulk.png';
import delivery from './delivery.png';
import drop from './drop.png';
import jugs from './jugs.png';
import juice from './juice.png';
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
    juice,
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
        img: "/water1.png",
        top: "Water",
        text: "Satchet, Bottled, Dispenser, Specialty"
      },
      {
        img: "/juice.png",
        top: "Juices",
        text: "Orange, Apple, Mixed fruit, Mango"
      },
      {
        img: "/wine.png",
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
        img: "/detergent.png",
        top: "Detergents",
        text: "Morning Fresh, Mama Lemon, Ariel liquid"
      },
      {
        img: "/dettol.png",
        top: "Disinfectants",
        text: "Jik, Dettol, Harpic, Lysol"
      },
      {
        img: "/soap.png",
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
        img: "/cooking.png",
        top: "Cooking oils",
        text: "Vegetable Oil, Palm oil, Soyabean oil."
      },
      {
        img: "/syrup.png",
        top: "Syrups",
        text: "Maple, Chocolate, Flavored syrups, Honey."
      },
      {
        img: "/vinegar.png",
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
        img: "/cantu.png",
        top: "Hair Care",
        text: "Shampoos, Conditioners, Hair oils"
      },
      {
        img: "/bodyoil.png",
        top: "Body Oils",
        text: "Coconut oil, Shea oil, Almond oil, Olive oil, Baby oils"
      },
      {
        img: "/nivea.png",
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
        img: "/perfume.png",
        top: "Perfumes",
        text: "Eau de parfum, Eau de toilette, Body mists,"
      },
      {
        img: "/essential.png",
        top: "Essential Oils",
        text: "Floral, Citrus, Herbal, Spice, Woodsy"
      },
      {
        img: "/diffuser.png",
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
        img: "/engine.png",
        top: "Engine Oil",
        text: "Total, Mobil, Castrol, Shell Helix, Oando"
      },
      {
        img: "/mobil.png",
        top: "Automotive Liquids",
        text: "ATF (Dexron II/III), DOT brake fluids, gear oil, coolant"
      },
      {
        img: "/fluid.png",
        top: "Windshield Fluid",
        text: "Windshield Fluid"
      }
    ]
  }
];

export const testimonials =[
  {
    id:1,
    name: "Amina Yusuf",
    review: "I love how fast and reliable this service is. I never run out of my essential liquids anymore. Highly recommend to everyone!",
    img:"/girl.jpg"
  },
  {
    id:2,
    name: "David Okeke",
    review: "The app is super easy to use, and the delivery is always on time. The quality of the products is top-notch.",
    img:"/david.jpg"
  },
  {
    id:3,
    name: "Adaobi Eze",
    review: "Finally, a service that actually cares about its customers. Friendly support and smooth deliveries every time.",
    img:"/ada.jpg"
  },
  {
    id:4,
    name: "Emeka Nwosu",
    review: "I’ve tried a few liquid delivery services, but this one is by far the best. Affordable, fast, and dependable.",
    img:"/emeka.jpg"
  },
  {
    id:5,
    name: "Fatima Bello",
    review: "I was worried about ordering liquids online, but everything arrived safely and well-packaged. I’m definitely a loyal customer now!",
    img:"/fatima.jpg"
  },
  {
    id:6,
    name: "Tunde Adeyemi",
    review: "Convenient, quick, and professional. I can’t imagine going back to buying from stores when I have this service at my fingertips.",
    img:"/tunde.jpg"
  },
  {
    id:7,
    name: "Ebun Adeola",
    review: "I love that they offer eco-friendly packaging. It’s rare to find a delivery service that cares about the environment as much as the customers.",
    img:"/ebun.jpg"
  },
  {
    id:8,
    name: "Blessing Chukwu",
    review: "I was blown away by how personalized the service felt. They remembered my preferences and always delivered exactly what I needed.",
    img:"/blessing.jpg"
  },
  {
    id:9,
    name: "Zainab Ahmed",
    review: "The delivery drivers are friendly and professional, and my orders always arrive ahead of time. Makes life so much easier!",
    img:"/zainab.jpg"
  }
];

export const adverts = [
  { img: "/smoothie.png", text: "🔥 Big Discount – 20% Off All Items!" },
  { img: "/coffee.png", text: "🎉 Buy 1 Get 1 Free This Week!" },
  { img: "/wine.png", text: "🚚 Free Shipping on Orders Over ₦20,000!" },
  { img: "/icetea.png", text: "✨ New Arrivals Just Dropped – Shop Now!" },
];