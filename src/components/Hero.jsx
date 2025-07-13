//React dependicies
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

//Import the component styling
import "../css/components/hero.scss";

//Import subcomponents
import Skills from "./Skills";
import Header from "./Header";
import About from "./About";
import SolarSystem from "./SolarSystem";

//Import functions
import { fetchPageFromApi } from "../functions/fetchPageFromApi";
const pageID = 61; //ID of the home page in the CMS
const pageContent = await fetchPageFromApi(
  pageID,
  import.meta.env.VITE_basedomain
);

//Set the title object
const mainTitle = pageContent.acf.title.split("|");

//Set Emoji values
const meInEmoji = ["💪", "😸", "🏍", "🎮", "🍷", "☕️", "⛷️", "🎸", "⛺️", "👨‍💻"];

//Random offset calculation for the Emojis
const getRandomOffset = () => ({
  x: Math.floor(Math.random() * 400 - 200),
  y: Math.floor(Math.random() * 400 - 200),
});

//Render the default
export default function Hero() {
  return (
    <section className="hero">
      <Intro />
      <Skills />
    </section>
  );
}

//Introduction component
function Intro() {
  //Set states for the Emoji explosion effect
  const [emojis, setEmojis] = useState(meInEmoji);
  const [exploding, setExploding] = useState(false);
  const [aboutWindowStatus, setAboutWindowStatus] = useState(false);

  //Function that handle the exploding effect when clicking
  function handleClick() {
    setEmojis(meInEmoji);
    setExploding(true);
    setAboutWindowStatus((a) => !a);
    resetExplosion();
  }

  //Function that resets the explosion states
  function resetExplosion() {
    setTimeout(() => {
      setEmojis([]);
      setExploding(false);
    }, 1000);
  }

  //Function that closes the about window
  function closeAbout() {
    setAboutWindowStatus((a) => !a);
  }

  return (
    <>
      <About openStatus={aboutWindowStatus} closeWindow={closeAbout} />

      <section className="intro">
        <Header />

        <h1 className="intro_title">
          {/* Split up the title into seperate lines and letter objects */}
          {mainTitle.map((line, i) => (
            <span className="line" key={i}>
              {line.split("").map((letter, j) => (
                //Create the single letters and add the correct animtion delay
                <span
                  className={"letter"}
                  style={{
                    animationDelay:
                      Number(
                        Number(j * 0.025) + 0.15 + Number(i * 0.05) + 0.2
                      ) + "s",
                  }}
                  key={j}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}

          {/* Render the about me info button */}
          <AnimatePresence>
            <motion.div
              className="about_hint cursor_hint"
              data-cursor-text="over"
              data-cursor-icon="fas fa-hand-peace"
              key={"info-button"}
              layout
              layoutId={"info-button"}
              onClick={() => {
                if (!exploding) {
                  handleClick();
                }
              }}
            >
              <i className="fas fa-info" />
            </motion.div>
          </AnimatePresence>

          {/* Render the Emojis here */}
          <span
            className="emojiOrigin cursor_hint"
            data-cursor-text="over"
            data-cursor-icon="fas fa-hand-peace"
            onClick={() => {
              if (!exploding) {
                handleClick();
              }
            }}
          >
            {emojis.map((emoji, k) => {
              const offset = getRandomOffset();

              return (
                <motion.span
                  className="singleEmoji"
                  key={k}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                  animate={
                    exploding
                      ? { opacity: 0, x: offset.x, y: offset.y, scale: 3.25 }
                      : {}
                  }
                  transition={{ duration: 1, transition: "spring" }}
                >
                  {emoji}
                </motion.span>
              );
            })}
          </span>
        </h1>

        <div className="intro_text">
          <p>{pageContent.acf.text}</p>
        </div>

        <SolarSystem />
      </section>
    </>
  );
}
