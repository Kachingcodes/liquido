'use client'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import Order from './components/Order';
import ChooseUs from './components/ChooseUs';
import Distance from './components/Distance';
import Bulk from './components/Bulk';
import Testimonials from './components/Testimonials';
import Wave from './components/Wave';
import Footer from './components/Footer';



export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Features/>
      <Categories/>
      <Order/>
      <ChooseUs/>
      <Distance/>
      <Bulk/>
      <Testimonials/>
      <Wave/>
      <Footer/> 
    </>  
    );
}
