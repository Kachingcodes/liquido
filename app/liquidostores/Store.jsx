import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { StarIcon, Loader2, Minus, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";



const Store = ({ activeCategory, selectedOption, searchTerm, favorites, setFavorites }) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const productsCollectionRef = collection(db, "products");
  const [quantity, setQuantity] = useState(0);


  useEffect(() => {
    const fetchProducts = async () => {
      if (!activeCategory || !selectedOption) {
        setProductsList([]);
        return;
      }

      setLoading(true);
      try {
        let q = query(
          productsCollectionRef,
          where("category", "==", activeCategory),
          where("option", "==", selectedOption)
        );

        const snapshot = await getDocs(q);
        const formatted = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductsList(formatted);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [activeCategory, selectedOption]);

  const filteredProducts = productsList.filter((p) =>
    searchTerm
      ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const toggleFavorite = (product) => {
  const isFavorite = favorites.some((p) => p.id === product.id);

  if (isFavorite) {
    setFavorites((prev) => prev.filter((p) => p.id !== product.id));
    toast.error(`${product.name} removed from favorites`);
  } else {
    setFavorites((prev) => [...prev, product]);
    toast.success(`${product.name} added to favorites`);
  }
};



  // const handleAdd = () => {
  //   setQuantity(1); // when clicked first time
  // };

  // const increase = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  // const decrease = () => {
  //   setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  // };


  return (
    <section className="w-full py-8 md:py-14 overflow-hidden">
      {/* Loader */}
      {loading && (
      <div className="flex flex-col items-center justify-center mt-16 space-y-2">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <p className="text-center text-gray-400">Loading products...</p>
      </div>
      )}

      <Toaster position="top-center" />

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 p-4 scrollbar-hide">
        {!loading && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="shadow-md hover:shadow-[#000000]/16 rounded-lg overflow-hidden"
            >
              <div className="p-2 flex justify-end">
                <StarIcon size={20} 
                onClick={() => toggleFavorite(product)} 
                className={`cursor-pointer ${
                  favorites.some((p) => p.id === product.id)
                    ? "text-amber-600"
                    : "text-gray-400"
                }`}
              />
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-30 md:h-40 p-0 object-contain"
              />

              <div className="p-2 flex flex-col">
                <div className="flex flex-row items-center justify-between px-3"> 
                  <div className="flex flex-col items-start justify-start">
                    <h3 className="text-center text-black text-sm md:text-md font-medium">
                    {product.name}
                    </h3>
                    <span className="text-center text-black text-xs md:text-sm font-medium">{product.volume}</span>
                  </div>

                  <div> 
                    <p className="text-center text-black text-xs md:text-sm font-semibold">
                    ₦{product.price}
                </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-2 md:flex-row flex-col gap-2">
                  <div className="flex items-center justify-evenly px-4 border border-black bg-gray-100 rounded-lg text-sm md:text-md"> 
                    <button
                   
                      className="hover:bg-[#4C86C4] p-2 rounded-lg text-gray-500 hover:text-white"
                    >
                      <Minus size={18}/>
                    </button>
                      <span className="min-w-[24px] text-center font-semibold text-gray-900">1</span>
                    <button
                     
                      className=" hover:bg-[#4C86C4] p-2 rounded-lg text-gray-500 hover:text-white"
                    >
                      <Plus size={18}/>
                    </button>
                  </div>
                  <div>
                    <button 
                        className="bg-[#1C4672] text-center w-full px-8 md:px-4 py-2 text-white text-sm md:text-md rounded-lg hover:shadow-md hover:shadow-[#000000]/20 hover:bg-[#4C86C4] transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  {/* ) : (
                    <div className="flex items-center gap-2"> 
                      <button
                        onClick={decrease}
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        -
                      </button>
                        <span className="min-w-[24px] text-center font-semibold">{quantity}</span>
                      <button
                        onClick={increase}
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  )}  */}
                </div>    
              </div>
            </div>
          ))
        ) : (
          !loading &&
          selectedOption && (
            <p className="col-span-full text-center text-gray-400 mt-10 p-8">
              No products found for this option.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default Store;
