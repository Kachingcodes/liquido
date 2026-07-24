"use client";
import { useStore } from "@/app/context/StoreContext";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Cart() {
   const router = useRouter();
   const {
    cartOpen,
    setCartOpen,
    toggleCart,
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useStore();

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);

  // Animation variants
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.4 },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black z-[40] backdrop-blur-sm"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="fixed top-0 right-0 h-full md:w-[400px] w-80 bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button onClick={toggleCart}>
                <X size={24} className="cursor-pointer"/>
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-4 overflow-y-auto flex-1">

  {cart.length === 0 ? (

    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">

      <Trash2 size={40} />

      <p>Your cart is empty.</p>

    </div>

  ) : (

    <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-center border-b py-3"
                    >
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-auto object-contain"
                          />
                        </div>

                        <div className="flex flex-col gap-1">

                          <p className="font-semibold">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-600">
                            {item.volume}
                          </p>

                          <p className="text-sm text-gray-600">
                            Pack of {item.packSize}
                          </p>

                          <p className="text-sm font-semibold text-[#1C4672]">
                            ₦{Number(item.price).toLocaleString()}
                          </p>

                          <p className="text-xs text-gray-500">
                            Subtotal: ₦
                            {(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex flex-col items-end justify-end gap-5">
                          <button onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={18} className="text-red-500" />
                          </button>

                          <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
                            <button
                              className="w-7 h-7 rounded hover:bg-gray-100 transition"
                              onClick={() => decreaseQty(item.id)}
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              className="w-7 h-7 rounded hover:bg-gray-100 transition"
                              onClick={() => increaseQty(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Total */}
            <div className="p-2 border-t font-semibold text-lg flex justify-between">
              <span>Total:</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-2 mb-2">
              <button 
                onClick={toggleCart}
                className="bg-[#1C4672] px-4 py-2 rounded-lg text-white">
                Continue
              </button>

              <button 
              onClick={() => {
              setCartOpen(false);
              router.push("/checkout");
            }}
              className="bg-[#1C4672] px-4 py-2 rounded-lg text-white">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
