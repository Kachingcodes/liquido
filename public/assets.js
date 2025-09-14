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

export const slides = [
  {
    title: "Drinking & Hydration",
    items: [
      {
        img: "/water1.png",
        text: "Water – purified, mineral, spring, or distilled."
      },
      {
        img: "/juice.png",
        text: "Juices – orange, apple, mixed fruit, etc."
      },
      {
        img: "/wine.png",
        text: "Wine – Red, White, Rosé and Sparkling."
      }
    ]
  },
  {
    title: "Beverages & Refreshments",
    items: [
      {
        img: "/soda.png",
        text: "Soft drinks / sodas."
      },
      {
        img: "/icetea.png",
        text: "Iced teas / Lemonades."
      },
      {
        img: "/coffee.png",
        text: "Coffee / Cold brew / Tea concentrates."
      }
    ]
  },
  {
    title: "Cooking & Culinary Liquids",
    items: [
      {
        img: "/cooking.png",
        text: "Cooking oils – vegetable, olive, coconut, etc."
      },
      {
        img: "/syrup.png",
        text: "Syrups – maple, chocolate, flavored syrups."
      },
      {
        img: "/vinegar.png",
        text: "Vinegars & condiments."
      }
    ]
  },
  {
    title: "Specialty & Industrial",
    items: [
      {
        img: "/dettol.png",
        text: "Cleaning solutions – detergents, disinfectants."
      },
      {
        img: "/fluid.png",
        text: "Automotive liquids – coolant, windshield fluid."
      },
      {
        img: "/plant.png",
        text: "Other specialty liquids – like plant fertilizers."
      }
    ]
  }
];

export const products = [
    {
      id: 1,
      image: "/water1.png",
      text: "Pure Drinking Water",
    },
    {
      id: 2,
      image: "/juice.png",
      text: "Refreshing Juices",
    },
    {
      id: 3,
      image: "/cooking.png",
      text: "Cooking Oils",
    },
    {
      id: 4,
      image: "/fluid.png",
      text: "Industrial Liquids",
    },
    {
      id: 5,
      image: "/soda.png",
      text: "Premium Beverages",
    },
    {
      id: 6,
      image: "/plant.png",
      text: "Specialty Liquids",
    },
    {
      id: 7,
      image: "/water1.png",
      text: "Pure Drinking Water",
    },
    {
      id: 8,
      image: "/juice.png",
      text: "Refreshing Juices",
    },
    {
      id: 9,
      image: "/cooking.png",
      text: "Cooking Oils",
    },
    {
      id: 10,
      image: "/fluid.png",
      text: "Industrial Liquids",
    },
    {
      id: 11,
      image: "/soda.png",
      text: "Premium Beverages",
    },
    {
      id: 12,
      image: "/plant.png",
      text: "Specialty Liquids",
    },
    {
      id: 13,
      image: "/water1.png",
      text: "Pure Drinking Water",
    },
    {
      id: 14,
      image: "/juice.png",
      text: "Refreshing Juices",
    },
    {
      id: 15,
      image: "/cooking.png",
      text: "Cooking Oils",
    },
    {
      id: 16,
      image: "/fluid.png",
      text: "Industrial Liquids",
    },
    {
      id: 17,
      image: "/soda.png",
      text: "Premium Beverages",
    },
    {
      id: 18,
      image: "/plant.png",
      text: "Specialty Liquids",
    }
  ];

export const categories = [
  {
    name: "Water & Drinks",
    icon: <Droplets size={20}/>,
    options: ["Bottled Water", "Dispenser Refills", "Energy Drinks", "Soda", "Fruit Juices", "Wine & Alcoholic Beverages"]
  },
//HYGIENE
  {
    name: "Hygiene & Cleaning",
    icon: <Sparkles size={20}/>,
    options: ["Detergents",  "Disinfectants", "Soaps"]
  },
//COOKING & EDIBLE LIQUIDS
  {
    name: "Cooking & Edible Liquids",
    icon: <CookingPot size={20} />,
    options: ["Cooking Oil", "Vinegar", "Liquid Seasoning", "Syrup"]
  },
//Continue from here
{
  name: "Personal Care",
  icon: <User size={20} />,
    options: ["Shampoos", "Conditioners", "Body Oils", "Lotions"]
},
  {
    name: "Luxury & Lifestyle",
    icon: <Gem size={20} />,
    options: ["Perfumes", "Essential Oils", "Fragrance Diffusers"],
  },
  {
    name: "Automobile",
    icon: <Car size={20} />,
    options: ["Engine Oil", "Transmission Fluid", "Coolant", "Gear Oil"],
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