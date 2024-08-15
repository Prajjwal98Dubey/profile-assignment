import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CartContextProvider from "./contexts/CartContextProvider.jsx";
import CachedCartProvider from "./contexts/CachedCartProvider.jsx";
import CachedProductsProvider from "./contexts/CachedProductsProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CachedProductsProvider>
      <CachedCartProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </CachedCartProvider>
    </CachedProductsProvider>
  </StrictMode>
);
