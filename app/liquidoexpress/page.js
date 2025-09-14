'use client'
import ShopNav from '../shop/ShopNav';
import Store from '../liquidostores/Store';
import Wave from '../components/Wave';
import Footer from '../components/Footer';


export default function L_Express() {
  return (
    <>
        <ShopNav/>
        {/* <Store/> */}
        <Wave/>
        <Footer/> 
    </>  
    );
}
