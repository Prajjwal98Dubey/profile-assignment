/* eslint-disable react/prop-types */
import { useState } from "react";
import { CachedProductsContext } from "./CachedProductsContext";

function CachedProductsProvider({ children }) {
  const [cachedProducts, setCachedProducts] = useState([]);
  return (
    <CachedProductsContext.Provider
      value={{ cachedProducts, setCachedProducts }}
    >
      {children}
    </CachedProductsContext.Provider>
  );
}

export default CachedProductsProvider;
