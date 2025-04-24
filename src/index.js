//React dependicies
import React from "react";
import ReactDOM from "react-dom/client";

//Import the application
import App from "./App";

//Import base styling
import "./css/setup/base.scss";

//Render the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
