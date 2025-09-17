'use client';
import { Search, Droplets, Sparkles, CookingPot, User, Gem, Car, ArrowLeftIcon } from "lucide-react";
import bulk from './bulk.png';
import delivery from './delivery.png';
import drop from './drop.png';
import foot1 from './foot1.png';
import foot2 from './foot2.png';
import foot3 from './foot3.png';
import jugs from './jugs.png';
import juice from './juice.png';
import location from './location.png';
import logo from './logo.png';
import nylon from './nylon.png';
import shield from './shield.png';
import tiller from './tiller.png';
import van from './van.png';
import water1 from './water1.png';
import water2 from './water2.png';



export const assets = {
  bulk,
  delivery,
    drop,
    foot1,
    foot2,
    foot3,  
    jugs,
    juice,
    location,
    logo,
    nylon,
    shield,
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
        text: "Purified, mineral, spring, or distilled"
      }
      ,
      {
        img: "/juice.png",
        top: "Juices",
        text: "Orange, apple, mixed fruit, etc"
      }
      ,
      {
        img: "/wine.png",
        top: "Wine",
        text: "Red, White, Rosé and Sparkling"
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
        img: "/soda.png",
        top: "Detergents",
        text: "Detergents"
      },
      {
        img: "/icetea.png",
        top: "Disinfectants",
        text: "Disinfectants"
      },
      {
        img: "/coffee.png",
        top: "Soaps",
        text: "Soaps"
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
        text: "Vegetable Oil."
      },
      {
        img: "/syrup.png",
        top: "Syrups",
        text: "Syrups – maple, chocolate, flavored syrups."
      },
      {
        img: "/vinegar.png",
        top: "Vinegars",
        text: "Vinegars & Condiments"
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
        img: "/dettol.png",
        top: "Hair Care",
        text: "Hair Care"
      },
      {
        img: "/fluid.png",
        top: "Body Oils",
        text: "Body Oils"
      },
      {
        img: "/plant.png",
        top: "Lotions",
        text: "Lotions"
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
        img: "/dettol.png",
        top: "Perfumes",
        text: "Perfumes"
      },
      {
        img: "/fluid.png",
        top: "Essential Oils",
        text: "Essential Oils"
      },
      {
        img: "/plant.png",
        top: "Fragrance Diffusers",
        text: "Fragrance Diffusers"
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
        img: "/dettol.png",
        top: "Engine Oil",
        text: "Engine Oil"
      },
      {
        img: "/fluid.png",
        top: "Automotive Liquids",
        text: "Automotive Liquids"
      },
      {
        img: "/plant.png",
        top: "Windshield Fluid",
        text: "Windshield Fluid"
      }
    ]
  }
];

export const adverts = [
    { id: 1, image: "/img1.jpg", text: "Pure Drinking Water" },
    { id: 2, image: "/img2.jpg", text: "Refreshing Juices" },
    { id: 3, image: "/img3.jpg", text: "Cooking Oils" },
    { id: 4, image: "/img4.jpg", text: "Industrial Liquids" },
    { id: 5, image: "/img5.jpg", text: "Premium Beverages" },
    { id: 6, image: "/img6.jpg", text: "Specialty Liquids" },
  ];


export const testimonials =[
  {
    id:1,
    name: "Amina Yusuf",
    review: "I love how fast and reliable this service is. I never run out of my essential liquids anymore. Highly recommend to everyone!",
    img:"/anime.jpeg"
  },
  {
    id:2,
    name: "David Okeke",
    review: "The app is super easy to use, and the delivery is always on time. The quality of the products is top-notch.",
    img:"/girl.jpg"
  },
  {
    id:3,
    name: "Chinwe Eze",
    review: "Finally, a service that actually cares about its customers. Friendly support and smooth deliveries every time.",
    img:"/girl.jpg"
  },
  {
    id:4,
    name: "Emeka Nwosu",
    review: "I’ve tried a few liquid delivery services, but this one is by far the best. Affordable, fast, and dependable.",
    img:"/girl.jpg"
  },
  {
    id:5,
    name: "Fatima Bello",
    review: "I was worried about ordering liquids online, but everything arrived safely and well-packaged. I’m definitely a loyal customer now!",
    img:"/girl.jpg"
  },
  {
    id:6,
    name: "Tunde Adeyemi",
    review: "Convenient, quick, and professional. I can’t imagine going back to buying from stores when I have this service at my fingertips.",
    img:"/girl.jpg"
  },
  {
    id:7,
    name: "Deji Adeola",
    review: "I love that they offer eco-friendly packaging. It’s rare to find a delivery service that cares about the environment as much as the customers.",
    img:"/girl.jpg"
  },
  {
    id:8,
    name: "Blessing Chukwu",
    review: "I was blown away by how personalized the service felt. They remembered my preferences and always delivered exactly what I needed.",
    img:"/girl.jpg"
  },
  {
    id:9,
    name: "Zainab Ahmed",
    review: "The delivery drivers are friendly and professional, and my orders always arrive ahead of time. Makes life so much easier!",
    img:"/girl.jpg"
  }
];