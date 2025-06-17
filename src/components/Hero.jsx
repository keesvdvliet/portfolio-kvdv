//React dependicies
import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

//Import the component styling
import "../css/components/hero.scss";

//Import subcomponents
import Skills from "./Skills";
import Header from "./Header";
import SolarSystem from "./SolarSystem";

//Import functions
import { fetchPageFromApi } from "../functions/fetchPageFromApi";
const pageID = 61; //ID of the home page in the CMS
const pageContent = await fetchPageFromApi(pageID);

//Set the title object
const mainTitle = pageContent.acf.title.split("|");
const mainTitleLen = pageContent.acf.title.split("").length;
const totalAnimationDelay = Number((Number(mainTitleLen * 0.025) + 0.1) * 1000);

//Set Emoji values
const meInEmoji = ["💪", "😸", "🏍", "🎮", "🍷", "☕️", "⛷️", "🎸", "⛺️", "👨‍💻"];
const emojiMax = meInEmoji.length - 1;
const renderEmojis = 10;
const nameLetterLocs = [7, 8, 9, 10];

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

//Introduction components
function Intro() {
  //Set states for the Emoji explosion effect
  const [emojis, setEmojis] = useState(meInEmoji);
  const [exploding, setExploding] = useState(false);
  const [letterState, setLetterState] = useState("resting");

  //Function that handle the exploding effect when clicking
  function handleClick() {
    //Get an random Emoji from the input
    const randomEmojiKey = Math.floor(Math.random() * (emojiMax - 0 + 1)) + 0;
    const randomEmoji = meInEmoji[randomEmojiKey];
    const explodeThese = Array(renderEmojis).fill(randomEmoji);

    //Apply the random Emoji to the state and execute the explosion effect
    setEmojis(explodeThese);
    setExploding(true);
    setLetterState("exploding");
    resetExplosion();
  }

  //Function that resets the explosion states
  function resetExplosion() {
    setTimeout(() => {
      setEmojis([]);
      setExploding(false);
      setLetterState("resting");
    }, 1000);
  }

  //On mount execute a first Emoji explosion
  useEffect(() => {
    setTimeout(() => {
      setExploding(true);
      setLetterState("exploding");
      resetExplosion();
    }, totalAnimationDelay);
  }, []);

  return (
    <section className="intro">
      <Header />

      <h1 className="intro_title">
        {/* Split up the title into seperate lines and letter objects */}
        {mainTitle.map((line, i) => (
          <span className="line" key={i}>
            {line.split("").map((letter, j) => (
              //Create the single letters and add the correct animtion delay
              <span
                className={`letter ${
                  (i === 1) & nameLetterLocs.includes(j) ? letterState : ""
                }`}
                style={{
                  animationDelay:
                    Number(Number(j * 0.025) + 0.15 + Number(i * 0.05) + 0.2) +
                    "s",
                }}
                key={j}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}

        {/* Render the Emojis here */}
        <span
          className="emojiOrigin"
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
  );
}
