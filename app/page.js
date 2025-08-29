'use client'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Order from './components/Order';
import ChooseUs from './components/ChooseUs';
import Distance from './components/Distance';
import Bulk from './components/Bulk';
import Testimonials from './components/Testimonials';
import Wave from './components/Wave';
// import ProductCarousel from './components/ProductCarousel';
import Footer from './components/Footer';



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
    <Testimonials/>
    <Wave/>
    <Footer/> 
      {/* <div className="h-[200vh] bg-white" /> allows scrolling */}
    
    {/* 
     <ProductCarousel/>
     */}


    </>  
    );
}
