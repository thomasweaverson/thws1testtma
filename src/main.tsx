import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import dotenv from 'dotenv';
dotenv.config();

import { setupTelegram } from "./setup-telegram.ts"
setupTelegram();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
