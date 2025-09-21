'use client'
import AboutNav from './AboutNav';
import AboutTop from './AboutTop';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Wave from '../components/Wave';
import Footer from '../components/Footer';




export default function About() {
  return (
    <>
      <AboutNav/>
      
      <AboutUs/>
      <AboutTop/>
      <Contact/>
      {/* <Wave/> */}
      {/* <Footer/> */}
    </>  
    );
}
