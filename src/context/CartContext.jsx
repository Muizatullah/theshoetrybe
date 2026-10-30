// import {
// createContext,
// useContext,
// useEffect,
// useState,
// } from "react";

// const CartContext = createContext(null);

// const CART_STORAGE_KEY = "theshoetrybe-cart";

// function getSavedCart() {
// try {
// const saved = localStorage.getItem(CART_STORAGE_KEY);
// return saved ? JSON.parse(saved) : [];
// } catch {
// return [];
// }
// }

// export function CartProvider({ children }) {
// const [cart, setCart] = useState(getSavedCart);

// useEffect(() => {
// localStorage.setItem(
// CART_STORAGE_KEY,
// JSON.stringify(cart)
// );
// }, [cart]);

// function addToCart(product, size) {
// setCart((currentCart) => {
// const existing = currentCart.find(
// (item) =>
// item.id === product.id &&
// String(item.size) === String(size)
// );


//   if (existing) {
//     return currentCart.map((item) =>
//       item.id === product.id &&
//       String(item.size) === String(size)
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//   }

//   return [
//     ...currentCart,
//     {
//       ...product,
//       size: String(size),
//       quantity: 1,
//     },
//   ];
// });


// }

// function changeQuantity(id, size, amount) {
// setCart((currentCart) =>
// currentCart.map((item) =>
// item.id === id &&
// String(item.size) === String(size)
// ? {
// ...item,
// quantity: Math.max(1, item.quantity + amount),
// }
// : item
// )
// );
// }

// function removeFromCart(id, size) {
// setCart((currentCart) =>
// currentCart.filter(
// (item) =>
// !(
// item.id === id &&
// String(item.size) === String(size)
// )
// )
// );
// }

// function clearCart() {
// setCart([]);
// }

// const cartCount = cart.reduce(
// (total, item) => total + item.quantity,
// 0
// );

// const cartTotal = cart.reduce(
// (total, item) => total + item.price * item.quantity,
// 0
// );

// return (
// <CartContext.Provider
// value={{
// cart,
// cartCount,
// cartTotal,
// addToCart,
// changeQuantity,
// removeFromCart,
// clearCart,
// }}
// >
// {children}
// </CartContext.Provider>
// );
// }

// export function useCart() {
// const context = useContext(CartContext);

// if (!context) {
// throw new Error(
// "useCart must be used inside CartProvider"
// );
// }

// return context;
// }



import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "theshoetrybe-cart";

function getSavedCart() {
  try {
    if (typeof window === "undefined") return [];

    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getSavedCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(product, size) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) =>
          item.id === product.id &&
          String(item.size) === String(size)
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id &&
          String(item.size) === String(size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          size: String(size),
          quantity: 1,
        },
      ];
    });
  }

  function changeQuantity(id, size, amount) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && String(item.size) === String(size)
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  }

  function removeFromCart(id, size) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(item.id === id && String(item.size) === String(size))
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}