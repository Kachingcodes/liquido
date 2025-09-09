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
    options: [
      {
        name: "Bottled Water",
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150", image: "/water1.png"},
          { id: 2, name: "Eva Water 75cl", price: "₦200", image: "/water1.png"},
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350", image: "/water1.png"},
        ]
      },
      {
        name: "Dispenser Refills",
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150" },
          { id: 2, name: "Eva Water 75cl", price: "₦200" },
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350" },
        ]
      },
      {
        name: "Energy Drinks",
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150" },
          { id: 2, name: "Eva Water 75cl", price: "₦200" },
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350" },
        ]
      },
      {
        name: "Soda",
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150" },
          { id: 2, name: "Eva Water 75cl", price: "₦200" },
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350" },
        ]
      },
      {
        name: "Fruit Juices",
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150" },
          { id: 2, name: "Eva Water 75cl", price: "₦200" },
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350" },
        ]
      },
      {
        name: "Wine & Alcoholic Beverages",
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150" },
          { id: 2, name: "Eva Water 75cl", price: "₦200" },
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350" },
        ]
      }
    ]
  },
//HYGIENE
  {
    name: "Hygiene & Cleaning",
    icon: <Sparkles size={20}/>,
    options: [
      {
        name: "Detergents", 
        products: [
          { id: 1, name: "Aquafina 50cl", price: "₦150" },
          { id: 2, name: "Eva Water 75cl", price: "₦200" },
          { id: 3, name: "Nestlé PureLife 1.5L", price: "₦350" },
        ]
      },
      {
        name: "Disinfectants", 
        products: [
          { id: 1, name: "Dettol", price: "₦150" },
          { id: 2, name: "Sanitol", price: "₦200" },
          { id: 3, name: "Spirit", price: "₦350" },
        ]
      },
      {
        name: "Soaps", 
        products: [
          { id: 1, name: "Dettol", price: "₦150" },
          { id: 2, name: "Sanitol", price: "₦200" },
          { id: 3, name: "Spirit", price: "₦350" },
        ]
      }
    ]
  },
//COOKING & EDIBLE LIQUIDS
  {
    name: "Cooking & Edible Liquids",
    icon: <CookingPot size={20} />,
    options: [
      {
        name:"Cooking Oil",
        products: [
          { id: 1, name: "Kings Vegetable Oil", size: "1L", price: "₦2,800 – ₦3,500" },
          { id: 2, name: "Mamador Vegetable Oil", size: "5L", price: "₦14,000 – ₦17,000" },
          { id: 3, name: "Palm Oil", size: "1L", price: "₦2,000 – ₦2,500" },
          { id: 4, name: "Palm Oil", size: "5L", price: "₦10,000 – ₦12,500" },
          { id: 5, name: "Bertolli Olive Oil", size: "500ml", price: "₦6,000 – ₦8,500" },
          { id: 6, name: "Goya Olive Oil", size: "1L", price: "₦12,000 – ₦15,000" },
        ]
      },
      {
        name:"Vinegar",
        products: [
          { id: 1, name: "Heinz White Vinegar", size: "473ml", price: "₦2,000 – ₦3,000" },
          { id: 2, name: "American Garden White Vinegar", size: "1L", price: "₦3,500 – ₦5,000" },
          { id: 3, name: "Bragg Apple Cider Vinegar", size: "473ml", price: "₦4,500 – ₦6,000" },
          { id: 4, name: "Heinz Apple Cider Vinegar", size: "946ml", price: "₦8,000 – ₦10,000" },
          { id: 5, name: "Malt Vinegar", size: "568ml", price: "₦3,500 – ₦4,500" },
        ]
      },
      {
        name:"Liquid Seasoning",
        products: [
          { id: 1, name: "Kikkoman Soy Sauce", size: "150ml", price: "₦1,800 – ₦2,500" },
          { id: 2, name: "Pearl River Bridge Soy Sauce", size: "1L", price: "₦6,500 – ₦8,500" },
          { id: 3, name: "Lee Kum Kee Oyster Sauce", size: "510g", price: "₦3,500 – ₦5,000" },
          { id: 4, name: "Maggi Liquid Seasoning", size: "100ml", price: "₦1,500 – ₦2,000" },
          { id: 5, name: "Squid Brand Fish Sauce", size: "300ml", price: "₦3,000 – ₦4,500" },
        ]
      },
      {
        name:"Syrup",
        products: [
          { id: 1, name: "Aunt Jemima Maple Syrup", size: "355ml", price: "₦5,500 – ₦7,500" },
          { id: 2, name: "Kirkland Maple Syrup", size: "1L", price: "₦12,000 – ₦15,000" },
          { id: 3, name: "Hershey’s Chocolate Syrup", size: "623g", price: "₦4,000 – ₦6,000" },
          { id: 4, name: "Lyle’s Golden Syrup", size: "454g", price: "₦3,500 – ₦5,000" },
        ]
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