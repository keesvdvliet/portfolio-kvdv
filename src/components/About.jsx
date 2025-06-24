//React dependicies
import React from "react";

//Import the component styling
import "../css/components/about.scss";

//Render the default
export default function About() {
  return (
    <div className="about_wrapper">
      <section className="about_window">
        <div className="about_window_content">
          <img src="#" className="passport_photo" />

          <ul className="scroller">
            <span className="title">Hobby's</span>
            <li>
              <span className="icon">🏍️</span>&nbsp;Motorrijden
            </li>
            <li>
              <span className="icon">🏍️</span>&nbsp;Iets anders
            </li>
            <li>
              <span className="icon">🏍️</span>&nbsp;Iets anders
            </li>
            <li>
              <span className="icon">🏍️</span>&nbsp;Iets anders
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
