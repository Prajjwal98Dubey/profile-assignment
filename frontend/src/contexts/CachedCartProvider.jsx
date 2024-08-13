/* eslint-disable react/prop-types */
import { useState } from "react";
import { CachedCartContext } from "./CachedCartContext";

function CachedCartProvider({ children }) {
  const [cachedCartItem, setCachedCartItem] = useState([]);
  return (
    <CachedCartContext.Provider value={{ cachedCartItem, setCachedCartItem }}>
      {children}
    </CachedCartContext.Provider>
  );
}

export default CachedCartProvider;
