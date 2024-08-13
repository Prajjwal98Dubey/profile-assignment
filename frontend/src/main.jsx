import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CartContextProvider from "./contexts/CartContextProvider.jsx";
import CachedCartProvider from "./contexts/CachedCartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CachedCartProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </CachedCartProvider>
  </StrictMode>
);
