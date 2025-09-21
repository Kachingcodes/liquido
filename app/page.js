'use client'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import SignIn from './components/SignIn';
import Features from './components/Features';
import Categories from './components/Categories';
import Order from './components/Order';
import ChooseUs from './components/ChooseUs';
import Distance from './components/Distance';
import Bulk from './components/Bulk';
import Testimonials from './components/Testimonials';
import Wave from './components/Wave';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/next"



export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      {/* <SignIn/> */}
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
