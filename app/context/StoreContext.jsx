"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase"; // adjust path
import { collection, getDocs } from "firebase/firestore";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [viewFavourites, setViewFavourites] = useState(false);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);


  // Fetch all products from Firestore
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

  // --- HANDLERS ---

const toggleFavourite = (product) => {
    setFavourites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });  
  };

      //Check if a product is already in favourites 
    const isFavourite = (productId) => {
    return favourites.some((item) => item.id === productId);
    };

  const filterByCategoryAndOption = (category, option) => {
    if (!category) return setFilteredProducts(products);
    let filtered = products.filter((p) => p.category === category);
    if (option) filtered = filtered.filter((p) => p.option === option);
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    setCart((prev) => {
        const exists = prev.find((item) => item.id === product.id);
        if (exists) {
            return prev.map((item) =>
            item.id === product.id
        ? {...item, qty: item.qty + 1}
        : item
    );
        }
        return [...prev, {...product, qty: 1}];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
    prev.map((item) =>
        item.id === id ? {...item, qty: item.qty + 1} : item
    )
    );
  };

    const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = () => setCartOpen((prev) => !prev);

  
  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        favourites,
        isFavourite,
        toggleFavourite,
        viewFavourites,
        setViewFavourites,
        filterByCategoryAndOption,
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        cartOpen,
        toggleCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook for easy access
export const useStore = () => useContext(StoreContext);
