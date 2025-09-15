import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </HelmetProvider>
  </React.StrictMode>
);
