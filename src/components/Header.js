//React dependicies
import React from "react";

//Import the component styling
import "../css/components/header.scss";

//Render the default
export default function Header() {
  return (
    <header>
      <nav className="main"></nav>
      <nav className="external">
        <a href="#" target="_blank">
          <i className="fab fa-github"></i>
        </a>

        <a href="#" target="_blank">
          <i className="fab fa-linkedin"></i>
        </a>
      </nav>
    </header>
  );
}
