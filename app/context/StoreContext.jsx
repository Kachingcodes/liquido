"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase"; // adjust path
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // --- STATES ---
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [viewFavourites, setViewFavourites] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [viewSearchResults, setViewSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [leftSideOpen, setLeftSideOpen] = useState(false);


  // --- DETECT MOBILE ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- SCROLL LOCK ---
  useEffect(() => {
    if ((isMobile && (cartOpen || leftSideOpen)) || (!isMobile && cartOpen)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [cartOpen, leftSideOpen, isMobile]);

  // --- FETCH PRODUCTS ---
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
      setFilteredProducts(items);
    };
    fetchProducts();
  }, []);

  // --- FAVOURITES ---
  const toggleFavourite = (product) => {
  const exists = favourites.some((item) => item.id === product.id);
  const message = exists
    ? `${product.name} removed from favourites`
    : `${product.name} added to favourites`;

  toast.success(message);

  setFavourites((prev) =>
    exists ? prev.filter((item) => item.id !== product.id) : [...prev, product]
  );
};


  const isFavourite = (productId) => favourites.some((item) => item.id === productId);

  const filterByCategoryAndOption = (category, option) => {
    if (!category) return setFilteredProducts(products);
    let filtered = products.filter((p) => p.category === category);
    if (option) filtered = filtered.filter((p) => p.option === option);
    setFilteredProducts(filtered);
  };

  // --- CART HANDLERS ---
  const addToCart = (product) => {
  const exists = cart.some((item) => item.id === product.id);
  const message = exists
    ? `${product.name} quantity increased`
    : `${product.name} added to cart`;

  toast.success(message);

  setCart((prev) =>
    exists
      ? prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      : [...prev, { ...product, qty: 1 }]
  );
};

const increaseQty = (id) => {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  // Fire toast before updating state
  toast.success(`${item.name} quantity increased`);

  setCart((prev) =>
    prev.map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i
    )
  );
};

const decreaseQty = (id) => {
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  // Fire toast before updating state
  toast.success(`${item.name} quantity decreased`);

  setCart((prev) =>
    prev
      .map((i) =>
        i.id === id ? { ...i, qty: i.qty - 1 } : i
      )
      .filter((i) => i.qty > 0)
  );
};


const removeFromCart = (id) => {
  const removedItem = cart.find((item) => item.id === id);
  if (!removedItem) return;

  // Fire toast before updating state
  toast.success(`${removedItem.name} removed from cart`);

  setCart((prev) => prev.filter((item) => item.id !== id));
};


const performSearch = (query) => {
    if (!query.trim()) {
      setViewSearchResults(false);
      setSearchResults([]);
      return;
    }

    const results = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setViewSearchResults(true);
    setViewFavourites(false); // turn off favourites view while searching
  };

  // --- PANEL HANDLERS ---
  const openCart = () => {
    setCartOpen(true);
    if (isMobile && leftSideOpen) setLeftSideOpen(false);
  };

  const toggleCart = () => (cartOpen ? setCartOpen(false) : openCart());

  const openSidePanel = () => {
    setSidePanelOpen(true);
    if (isMobile && cartOpen) setCartOpen(false);
  };

  const toggleSidePanel = () => (sidePanelOpen ? setSidePanelOpen(false) : openSidePanel());

  // --- PROVIDER VALUES ---
  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        setFilteredProducts,
        favourites,
        toggleFavourite,
        isFavourite,
        viewFavourites,
        setViewFavourites,
        filterByCategoryAndOption,
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        cartOpen,
        setCartOpen,
        toggleCart,
        openCart,
        leftSideOpen,
        setLeftSideOpen,
        toggleSidePanel,
        openSidePanel,
        isMobile,
        searchResults,
        viewSearchResults,
        performSearch,
        setViewSearchResults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// --- CUSTOM HOOK ---
export const useStore = () => useContext(StoreContext);