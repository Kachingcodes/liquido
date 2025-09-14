"use client";
import React, { useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

const Prods = () => {
  const [productList, setProductList] = useState([]);

  const productsCollectionRef = collection(db, "products" );

  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    getProducts();
  };



  return (
    <div className="w-full flex flex-col items-center p-6 space-y-6 bg-blue-500">


    </div>
  );
};

export default Prods;
