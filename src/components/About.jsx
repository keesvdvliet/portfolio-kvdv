//React dependicies
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

//Swiper styles
// import "swiper/css";
// import "swiper/css/autoplay";
// import "swiper/css/free-mode";

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

  const currentAge = calcYearsSince("1995-11-10");

  //Create array of icons
  const verificationBarIcons = [
    "fas fa-cat",
    "fas fa-smile",
    "fas fa-hand-peace",
    "fas fa-car",
    "fas fa-gamepad",
    "fas fa-bug",
    "fas fa-rocket",
    "fas fa-motorcycle",
    "fas fa-record-vinyl",
    "fas fa-tent",
    "fas fa-person-skiing",
    "fas fa-jedi",
    "fas fa-heart",
    "fas fa-guitar",
    "fas fa-dungeon",
    "fas fa-computer",
    "fa fa-moon",
    "fa fa-code",
    "fa fa-film",
    "fa fa-seedling",
  ];

  //Create array of hobbies
  const hobbyItems = [
    { icon: "🏍️", text: "Motorrijder" },
    { icon: "🎸", text: "Metal/Rock enjoyer" },
    { icon: "💿", text: "Vinyl verzamelaar" },
    { icon: "🧑‍💻", text: "Gek op code tikken" },
    { icon: "⛺️", text: "Kamperen" },
    { icon: "🎮", text: "Games" },
    { icon: "🚀", text: "Space" },
    { icon: "🐈", text: "Foxie" },
    { icon: "🧙‍♂️", text: "LOTR" },
    { icon: "⛷️", text: "Skiën" },
    { icon: "💪", text: "Sporten" },
    { icon: "📖", text: "Lezen" },
    { icon: "🎥", text: "Motion design" },
  ];

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
                <img src="https://cms.keesvandervliet.com/wp-content/uploads/2025/06/keesvdvliet.jpeg" />
              </div>

              <div className="passport_maininfo">
                <div className="passport_item">
                  <span className="label">Naam</span>
                  <span className="value">Kees</span>
                </div>
                <div className="passport_item">
                  <span className="label">Leeftijd</span>
                  <span className="value">{currentAge}&nbsp;jaar</span>
                </div>
                <div className="passport_item">
                  <span className="label">Functie</span>
                  <span className="value">Digital & Motion Developer</span>
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
                  <i className={icon}></i>
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
