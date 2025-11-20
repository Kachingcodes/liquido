import { Suspense } from "react";
import { StoreProvider } from "../context/StoreContext";
import CheckoutPageClient from "./CheckoutPageClient";

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <StoreProvider>
        <CheckoutPageClient />
      </StoreProvider>
    </Suspense>
  );
}
