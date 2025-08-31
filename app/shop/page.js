'use client'
import ShopNav from './ShopNav';
import Advert from './Advert';
import Store from './Store';
import Wave from '../components/Wave';
import Footer from '../components/Footer';



export default function Shop() {
  return (
    <>
      <ShopNav/>
      <Advert/>
      <Store/>
      <Wave/>
      <Footer/>
    </>  
    );
}
