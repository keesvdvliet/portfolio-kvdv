//React dependicies
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//Import the application
import App from "./App.jsx";

//Import base styling
import "./css/setup/base.scss";

//Render the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
