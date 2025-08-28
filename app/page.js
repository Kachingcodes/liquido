'use client'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Order from './components/Order';
import ChooseUs from './components/ChooseUs';
import Distance from './components/Distance';
import Bulk from './components/Bulk';
// import ProductCarousel from './components/ProductCarousel';
import Features from './components/Features';
// import Testimonials from './components/Testimonials';
// import Footer from './components/Footer';



export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero />
    <Features/>
    <Order/>
    <ChooseUs/>
    <Distance/>
    <Bulk/>
      {/* <div className="h-[200vh] bg-white" /> allows scrolling */}
    
    {/* 
     <ProductCarousel/>
     */}
   {/* <Testimonials/> */}
    {/* <Footer/>  */}
    </>  
    );
}
