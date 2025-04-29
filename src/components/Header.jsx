//React dependicies
import React from "react";

//Import the component styling
import "../css/components/header.scss";

//Import functions
import { fetchDataFromApi } from "../functions/fetchFromApi";
const mainMenu = await fetchDataFromApi("links");

//Render the default
export default function Header() {
  return (
    <header>
      <nav className="main"></nav>
      <nav className="external">
        {mainMenu.map((menuItem, index) => (
          <a href={menuItem.acf.url} target="_blank" key={index}>
            {/* <i
              className={
                menuItem.acf.icon.style === "brands"
                  ? `fab fa-${menuItem.acf.icon.id}`
                  : `fas test fa-${menuItem.acf.icon.id}`
              }
            ></i> */}

            <i
              className={`fab ${
                menuItem.acf.url.includes("linkedin")
                  ? "fa-linkedin"
                  : "fa-github"
              }`}
            ></i>
          </a>
        ))}
      </nav>
    </header>
  );
}
