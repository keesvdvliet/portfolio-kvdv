//React dependicies
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

//Import functions
import { fetchPageFromApi } from "../functions/fetchPageFromApi";
import { fetchMediaFromApi } from "../functions/fetchMediaFromApi";

const pageID = 175; //ID of the about me section content
const pageContent = await fetchPageFromApi(
  pageID,
  import.meta.env.VITE_basedomain
);
const passportPhoto = await fetchMediaFromApi(
  pageContent.acf.photo,
  import.meta.env.VITE_basedomain
);

//Import the component styling
import "../css/components/about.scss";

//Render the default
export default function About({ closeWindow }) {
  //Function that calculates years since given date (input date in YYYY-MM-DD)
  function calcYearsSince(inputDate) {
    const from = new Date(inputDate);
    const to = new Date();
    ``;

    //Calculate the years between the dates
    let years = to.getFullYear() - from.getFullYear();

    //Check if bitrthday has passed already this year
    const hasHadBirthday =
      to.getMonth() > from.getMonth() ||
      (to.getMonth() === from.getMonth() && to.getDate() >= from.getDate());
    years = !hasHadBirthday ? (years = years - 1) : years;

    //Return the years
    return years;
  }
  const currentAge = calcYearsSince(pageContent.acf.birthdate);

  //Create array of icons for the animated verification bar at the botttom
  const verificationBarIcons = [
    "fa-cat",
    "fa-smile",
    "fa-hand-peace",
    "fa-car",
    "fa-gamepad",
    "fa-bug",
    "fa-rocket",
    "fa-motorcycle",
    "fa-record-vinyl",
    "fa-tent",
    "fa-person-skiing",
    "fa-jedi",
    "fa-heart",
    "fa-guitar",
    "fa-dungeon",
    "fa-computer",
    "fa-moon",
    "fa-code",
    "fa-film",
    "fa-seedling",
  ];

  //Create array of hobbies
  const hobbyItems = pageContent.acf.hobbies.map((hobby) => ({
    icon: hobby.icon,
    text: hobby.text,
  }));

  return (
    <AnimatePresence>
      <div className="about_wrapper">
        <div className="about_window">
          <motion.div
            initial={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0)" }}
            exit={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
            transition={{ type: "ease", duration: 0.25 }}
            className="about_window_content passport"
          >
            <div className="passport_header">
              <div className="passport_photo">
                <img src={passportPhoto} />
              </div>

              <div className="passport_maininfo">
                <div className="passport_item">
                  <span className="label">Naam</span>
                  <span className="value">{pageContent.acf.name}</span>
                </div>
                <div className="passport_item">
                  <span className="label">Leeftijd</span>
                  <span className="value">{currentAge}&nbsp;jaar</span>
                </div>
                <div className="passport_item">
                  <span className="label">Functie</span>
                  <span className="value">{pageContent.acf.function}</span>
                </div>
              </div>
            </div>

            <ul className="passport_hobbies">
              {hobbyItems.map((item, key) => (
                <motion.li
                  className="hobby_item"
                  initial={{ x: 15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  key={key}
                  transition={{
                    type: "ease",
                    delay: 0.25 + key * 0.05,
                    duration: 0.4,
                  }}
                >
                  <span className="icon">{item.icon}</span>
                  {item.text}
                </motion.li>
              ))}
            </ul>

            <Swiper
              className="verification_bar"
              spaceBetween={0}
              slidesPerView="auto"
              speed={3000}
              modules={[Autoplay, FreeMode]}
              freeMode
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
            >
              {verificationBarIcons.map((icon, key) => (
                <SwiperSlide
                  key={`slide_${key}`}
                  className="verification_bar_item"
                >
                  <i className={`fas ${icon}`}></i>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <motion.div
            className="round_btn close cursor_hint"
            data-cursor-text="sluiten"
            data-cursor-icon="fas fa-times"
            layout
            layoutId={"info-button"}
            key={"about-close"}
            onClick={closeWindow}
          >
            <span className="icon">
              <i className="fas fa-times"></i>
            </span>
          </motion.div>
        </div>

        <div className="interaction_zone" onClick={closeWindow}></div>
      </div>
    </AnimatePresence>
  );
}
