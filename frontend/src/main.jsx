import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider placement="top-center">
      <ToastProvider />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
