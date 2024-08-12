/* eslint-disable react/prop-types */
import { useState } from "react";
import { CartContext } from "./CartContext";

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
