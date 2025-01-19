import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import UserProvider from "./Context/UserContextProvider.jsx";
import CourceContextProvider from "./Context/CourceContextProvider.jsx";
UserProvider;

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <App /> 
  </StrictMode>
);
