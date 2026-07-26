'use client';
import { Droplets, Sparkles, CookingPot, User, Gem, Car } from "lucide-react";
import bulk from './bulk.png';
import delivery from './delivery.png';
import drop from './drop.png';
import jugs from './jugs.png';
import location from './location.png';
import logo from './logo.png';
import middle from './middle.jpg';
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
  middle,
  nylon,
  tiller,
  van,
  water1,
  water2
}

export const steps = [
  {
    id: "01",
    title: "Choose Your Liquid",
    desc: "Browse our available products - water, drinks, or other liquid essentials - and pick what you need.", 
  },
  {
    id: "02",
    title: "Place Your Order",
    desc: "Order directly through our website or send us a message on WhatsApp with your product choice, quantity, and delivery location.",
  },
  {
    id: "03",
    title: "Quick Confirmation",
    desc: "Our team confirms your order instantly and prepares it for dispatch.",
  },
  {
    id: "04",
    title: "Fast & Reliable Delivery",
    desc: "We deliver your liquids to your location in the shortest possible time. Just relax and enjoy!",
  },
];



//THIS IS WHERE YOU ADD NEW PRODUCTS FOR THE STORE SO THAT IT CAN BE VIEWED, AFTER ADDING IT IN PRODUCTS

export const categories = [
  {
    name: "Water & Drinks",
    icon: <Droplets size={20}/>,
    options: ["Bottled Water", "Dispenser Refills", "Energy Drinks", "Soda", "Fruit Juices", "Diary", "Wine & Alcoholic Beverages"],   
      items: [
      {
        img: "/products/nestle.png",
        top: "Water",
        text: "Satchet, Bottled, Dispenser, Specialty"
      },
      {
        img: "/products/fanta.png",
        top: "Juices",
        text: "Orange, Apple, Mixed fruit, Mango"
      },
      {
        img: "/products/evawine.png",
        top: "Wine",
        text: "Red, White, Rosé, Sparkling"
      }
    ]
  },
//HYGIENE
  {
    name: "Hygiene & Cleaning",
    icon: <Sparkles size={20}/>,
    options: ["Mouthwash",  "Disinfectants", "Soaps"],
    items: [
      {
        img: "/products/listerine.png",
        top: "Mouthwash",
        text: "Listerine, Reflex"
      },
      {
        img: "/categories/dettol.png",
        top: "Disinfectants",
        text: "Jik, Dettol, Harpic, Lysol"
      },
      {
        img: "/products/mamalemon1100.png",
        top: "Soaps",
        text: "Morning Fresh, Mama Lemon, Ariel liquid"
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
        img: "/products/poweroil3.png",
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
    review: "'Liquido stores are always closer to your doorstep than you think, and that's exactly what makes them so convenient! Kudos to the team for making their services so accessible.'",
    img:"/people/kester.png"
  },
  {
    id:2,
    name: "Ebun Adeola",
    review: "'I love that they offer eco-friendly packaging. It’s rare to find a delivery service that cares about the environment as much as the customers.'",
    img:"/people/ebun.jpg"
  },
  {
    id:3,
    name: "Alina Becker",
    review: "'They really combine affordability with convenience. That's rare to find these days.'",
    img:"/people/happy3.jpg"
  },
  {
    id:4,
    name: "Akinwolire Damilare",
    review: "'Very reliable and fast in delivery.'",
    img:"/people/happy4.jpg"
  },
  {
    id:5,
    name: "Emeka Nonso",
    review: "'The delivery drivers are friendly and professional, and my orders always arrive ahead of time. Makes life so much easier!'",
    img:"/people/emeka.jpg"
  },
  {
    id:6,
    name: "Saviour Ikrangubek",
    review: "'Fast and Reliable.'",
    img:"/people/happy6.jpg"
  },
  {
    id:7,
    name: "Opia Favour",
    review: "'The Service was great and the delivery was swift.'",
    img:"/people/happy7.jpg"
  },
  {
    id:8,
    name: "Blessing Chukwu",
    review: "'I was blown away by how personalized the service felt. They remembered my preferences and always delivered exactly what I needed.'",
    img:"/people/ada.jpg"
  },
  {
    id:9,
    name: "Jane Ogba",
    review: "'He is reliable. Just give him a call and he will deliver to you anywhere you are.'",
    img:"/people/happy9.jpg"
  }
];


export const adverts = [
  { img: "/products/pulpyorange.png", text: "🔥 Big Discount – 20% Off All Items!" },
  { img: "/products/poweroil3.png", text: "🎉 Want To Advertise Your Products Here? Contact Us!" },
  { img: "/products/threecrowns.png", text: "🚚 Free Shipping on Orders In And Around Adeniyi Jones!" },
  { img: "/products/strawberry.png", text: "✨ New Arrivals Just Dropped – Shop Now!" },
];

