//React dependicies
import React from "react";

//Import the component styling
import "../css/components/outro.scss";

//Import functions
import { fetchPageFromApi } from "../functions/fetchPageFromApi";

//Import page conent
const pageContent = await fetchPageFromApi(
  133,
  import.meta.env.VITE_basedomain
);

//Render the default
export default function Outro() {
  return (
    <section className="outro">
      <div className="wrapper">
        <h4 className="title h4">{pageContent.acf.title}</h4>
        <p>{pageContent.acf.text}</p>

        <div className="button_holder">
          <a
            href={pageContent.acf.url}
            target="_blank"
            className="btn cursor_hint"
            data-cursor-text="open"
            data-cursor-icon="fas fa-arrow-up-right-from-square"
          >
            <span className="icon">
              <i className="fab fa-linkedin"></i>
            </span>
            <span className="text">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
