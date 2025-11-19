"use client";
import LeftSide from "./components/LeftSide";
import TopSide from "./components/TopSide";
import { StoreProvider } from "../context/StoreContext";
import MainPage from "./MainPage";
import Cart from "./Cart";

export default function LiquidoStores({ children }) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen">
        {/* Sidebar (fixed on desktop) */}
        <div className="hidden md:flex fixed top-0 left-0 min-h-screen w-64 z-30">
          <LeftSide />
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 md:ml-48">
          {/* Topbar (sticky) */}
          <div className="sticky top-0 z-20 bg-white">
            <TopSide />
          </div>

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-auto">
            <MainPage />
          </main>
        </div>

        <Cart/>
      </div>
    </StoreProvider>
  );
}
