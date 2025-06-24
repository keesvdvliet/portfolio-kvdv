//React dependicies
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

//Import the component styling
import "../css/components/cursor.scss";

//Render the default
function AnimatedCursor() {
  const cursorOuter = useRef();
  const mouse = {
    x: useMotionValue(-100),
    y: useMotionValue(-100),
  };

  const spring = {
    stiffness: 500,
    damping: 28,
  };

  const outer = {
    x: useTransform(mouse.x, (value) => value - 15),
    y: useTransform(mouse.y, (value) => value - 15),
  };

  useEffect(() => {
    // This function will execute on each mouse movement.
    const handleMouseMove = (event) => {
      // Set the mouse values to the current coordinates of the mouse.
      mouse.x.set(event.clientX);
      mouse.y.set(event.clientY);
    };

    // Add the event listener to the window.
    window.addEventListener("mousemove", handleMouseMove);

    // Remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  //WORKING CUSTOM CURSOR FROM EARLIER PROJECT
  //Cursor updater
  // const updateCursor = (event) => {
  //     document.getElementById('custom-cursor').style.top              = `${event.clientY}px`;
  //     document.getElementById('custom-cursor').style.left             = `${event.clientX}px`;
  // }
  // //Mouse move event listener
  // window.addEventListener('mousemove', (event) => {
  //     updateCursor(event);
  // })

  return (
    <>
      <motion.div
        className="animated-cursor"
        style={{
          ...outer,
          transition: `translate 0.2s ${spring.stiffness} ${spring.damping}`,
        }}
        ref={cursorOuter}
      />
    </>
  );
}

export default AnimatedCursor;
