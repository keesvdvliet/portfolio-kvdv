//React dependicies
import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

//Import the component styling
import "../css/components/cursor.scss";

//Render the default
export default function AnimatedCursor() {
  //Set reference for the cursor
  const cursor = useRef();

  //Set status for hover FX
  const [cursorHint, setCursorHint] = useState(false);
  const [cursorHintText, setCursorHintText] = useState(null);
  const [cursorHintIcon, setCursorHintIcon] = useState(null);

  //Fetch the current cursor position
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  //Set the position values for the custom cursor
  const position = {
    x: useTransform(mouse.x, (value) => value - 15),
    y: useTransform(mouse.y, (value) => value - 15),
  };

  //Execute tracking on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      //Set the current current position
      mouse.x.set(event.clientX);
      mouse.y.set(event.clientY);

      //Check the classlist of the element we are hovering over
      const focusEl = document.elementFromPoint(event.clientX, event.clientY);
      let specialEl = false;

      //If the current element contains a hover FX display it, otherwise disable the hint
      if (focusEl) {
        if ((specialEl = focusEl?.closest(".cursor_hint"))) {
          setCursorHintText(specialEl.getAttribute("data-cursor-text"));
          setCursorHintIcon(specialEl.getAttribute("data-cursor-icon"));
          setCursorHint(true);
        } else {
          setCursorHint(false);
        }
      }
    };

    //Add the event listener to the window to track mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    //Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <>
      <motion.div
        className="animated_cursor"
        style={{
          ...position,
          transition: `translate 0.2s 500 28`,
        }}
        ref={cursor}
      >
        {cursorHint && (
          <motion.div
            initial={{ opacity: 0, width: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, width: "100%", filter: "blur(0)" }}
            transition={{ type: "spring", duration: 0.5 }}
            className="animated_cursor_hint"
          >
            <div className="animated_cursor_hint_text">
              <span className="icon">
                <i className={cursorHintIcon}></i>
              </span>
              {cursorHintText}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
