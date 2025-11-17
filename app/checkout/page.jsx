// app/checkout/page.jsx
"use client";
import React from "react";
import { StoreProvider } from "../context/StoreContext";
import CheckoutPage from "./CheckoutPage"; // your current CheckoutPage component

export default function Checkout() {
  return (
    <StoreProvider>
      <CheckoutPage />
    </StoreProvider>
  );
}
