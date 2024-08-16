import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CachedCartProvider from "./contexts/CachedCartProvider.jsx";
import CachedProductsProvider from "./contexts/CachedProductsProvider.jsx";
import UserCartContextProvider from "./contexts/UserCartContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CachedProductsProvider>
      <CachedCartProvider>
        <UserCartContextProvider>
          <App />
        </UserCartContextProvider>
      </CachedCartProvider>
    </CachedProductsProvider>
  </StrictMode>
);
