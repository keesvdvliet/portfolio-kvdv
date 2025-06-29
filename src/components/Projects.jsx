//React dependicies
import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

//Import the component styling
import "../css/components/projects.scss";

//Import functions
import { fetchDataFromApi } from "../functions/fetchFromApi";
import { fetchPageFromApi } from "../functions/fetchPageFromApi";
import { fetchMediaFromApi } from "../functions/fetchMediaFromApi";

//Fetch the projects via the REST api
const portfolio_projects_raw = await fetchDataFromApi("projects");
const portfolio_projects = await Promise.all(
  portfolio_projects_raw.map(async (project) => ({
    ...project,
    acf: {
      ...project.acf,
      img: await fetchMediaFromApi(project.acf.img),
    },
  }))
);

//Page content
const pageID = 91; //ID of the projects page in the CMS
const pageContent = await fetchPageFromApi(pageID);

//Render the default
export default function Projects() {
  //Create circles for background graphic
  const circleGraphic = [];
  for (let c = 1; c < 6; c++) {
    circleGraphic.push(
      <span key={`c${c}`} className={`circle_${c}`}>
        &nbsp;
      </span>
    );
  }

  //Open states for projects
  const [isOpen, setIsOpen] = useState(false);

  function openProjectWindow(input) {
    setIsOpen(input);
  }

  return (
    <>
      <section className="projects">
        <div className="projects_wrapper">
          <div className="project_side">
            <h3 className="h2 title">{pageContent.acf.title}</h3>
            <p>{pageContent.acf.text}</p>
          </div>

          <Swiper
            className="project_list"
            spaceBetween={30}
            slidesPerView={2}
            modules={[Mousewheel]}
            mousewheel
          >
            {portfolio_projects.map((item, key) => (
              <SwiperSlide key={key}>
                {({ isActive, isPrev, isNext }) => (
                  <Caseinfo
                    item={item}
                    activeState={isActive}
                    prevState={isPrev}
                    nextState={isNext}
                    openWindow={openProjectWindow}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="projects_graphic">{circleGraphic}</div>
      </section>

      {isOpen && <Casewindow item={isOpen} closeWindow={openProjectWindow} />}
    </>
  );
}

//Case information (used inside the cards)
function Caseinfo({ item, activeState, prevState, nextState, openWindow }) {
  //Reference for this card (used for hover FX)
  const cardRef = useRef(null);

  //Motion values for the 3D hover FX on the cards
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const scale = useSpring(useMotionValue(1), { stiffness: 200, damping: 20 });

  //On mouse enter, track the mouse movements on the card to create the 3D hover FX
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left; //Mouse X-pos within card
    const y = e.clientY - rect.top; //Mouse Y-pos within card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateMax = 15; //Set maximum degrees for the angle

    const offsetY = y - centerY;
    const manipulatorY = offsetY > 0 ? -1 : 1;

    const percentX = (x - centerX) / centerX;
    const percentY = (centerY - y) / centerY;

    console.log(`x${percentX} / y${percentY}`);

    //Set the angle and rotations
    const deltaX = ((x - centerX) / centerX) * rotateMax;
    const deltaY = ((centerY - y) / centerY) * rotateMax;

    //Apply to the motion values
    rotateX.set(deltaY);
    rotateY.set(deltaX);
    scale.set(1.05);
  };

  //On mouse leave, reset the card to the default 2D view
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <>
      <motion.div
        className={`project_card cursor_hint ${
          activeState || prevState ? "past" : ""
        } ${nextState ? "next" : ""}`}
        data-cursor-text="bekijk"
        data-cursor-icon="fas fa-eye"
        layoutId={`project_${item.id}`}
        style={{
          backgroundColor: item.acf.bgColor,
          perspective: 1000,
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
        onClick={() => openWindow(item)}
      >
        <div className="project_card_contents">
          <motion.img
            layoutId={`thumb_${item.id}`}
            src={item.acf.img}
            className="thumbnail"
          />

          <motion.div
            className="round_btn view_more"
            layoutId={`actionbtn_${item.id}`}
          >
            <span className="icon">
              <i className="fas fa-eye"></i>
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

//Case detail window
function Casewindow({ item, closeWindow }) {
  return (
    <div className="project_window_wrapper">
      <motion.div
        className="project_window"
        layoutId={`project_${item.id}`}
        style={{ borderColor: item.acf.bgColor }}
      >
        <div className="project_window_content">
          <motion.img
            layoutId={`thumb_${item.id}`}
            src={item.acf.img}
            className="cover_image"
            style={{ backgroundColor: item.acf.bgColor }}
          />

          <AnimatePresence>
            <div className="project_information">
              <h3 className="project_title">{item.title.rendered}</h3>
              <ul className="project_stack">
                <motion.li
                  className="stack_item"
                  style={{ backgroundColor: item.acf.bgColor }}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "ease",
                    delay: 0.25 + 0 * 0.05,
                    duration: 0.4,
                  }}
                >
                  <span className="icon">
                    <i className="fab fa-php"></i>
                  </span>
                  PHP
                </motion.li>

                <motion.li
                  className="stack_item"
                  style={{ backgroundColor: item.acf.bgColor }}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "ease",
                    delay: 0.25 + 1 * 0.05,
                    duration: 0.4,
                  }}
                >
                  <span className="icon">
                    <i className="fab fa-js"></i>
                  </span>
                  JS
                </motion.li>

                <motion.li
                  className="stack_item"
                  style={{ backgroundColor: item.acf.bgColor }}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: "ease",
                    delay: 0.25 + 2 * 0.05,
                    duration: 0.4,
                  }}
                >
                  <span className="icon">
                    <i className="fab fa-css"></i>
                  </span>
                  (S)CSS
                </motion.li>
              </ul>
              <p>{item.acf.desc}</p>
            </div>
          </AnimatePresence>

          <motion.div
            className="round_btn view_more cursor_hint"
            data-cursor-text="sluiten"
            data-cursor-icon="fas fa-times"
            layoutId={`actionbtn_${item.id}`}
            onClick={() => closeWindow(false)}
          >
            <span className="icon">
              <i className="fas fa-times"></i>
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div
        className="interaction_zone"
        onClick={() => closeWindow(false)}
      ></div>
    </div>
  );
}
