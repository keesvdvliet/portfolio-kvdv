//React dependicies
import React from "react";

//Import the component styling
import "../css/components/header.scss";

//Import functions
import { fetchDataFromApi } from "../functions/fetchFromApi";
const mainMenu = await fetchDataFromApi(
  "links",
  import.meta.env.VITE_basedomain
);

//Render the default
export default function Header() {
  return (
    <header>
      <nav className="main"></nav>

      <nav className="external">
        {mainMenu.map((menuItem, index) => {
          return (
            <a
              href={menuItem.acf.url}
              target="_blank"
              key={index}
              className="cursor_hint"
              data-cursor-text="open"
              data-cursor-icon="fas fa-arrow-up-right-from-square"
            >
              {/* THIS DOES NOT WORK FOR SOME REASON ? <i
                className={
                  menuItem.acf.icon.style === "brands"
                    ? `fab fa-${menuItem.acf.icon.id}`
                    : `fas test fa-${menuItem.acf.icon.id}`
                }
              ></i>
 */}
              <i
                className={`fab ${
                  menuItem.acf.url.includes("linkedin")
                    ? "fa-linkedin"
                    : "fa-github"
                }`}
              ></i>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
