//React dependicies
import React from "react";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

//Import the component styling
import "../css/components/skills.scss";

//Import functions
import { fetchDataFromApi } from "../functions/fetchFromApi";
import { fetchPageFromApi } from "../functions/fetchPageFromApi";

//Fetch the skill list via the REST api
const skill_list_raw = await fetchDataFromApi("skills");
const skill_list = skill_list_raw.map((skill) => ({
  ...skill,
  acf: {
    ...skill.acf,
    icon: JSON.parse(skill.acf.icon),
  },
}));
const dev_stack = skill_list.filter((skill) => skill.acf.type === "dev");
const other_stack = skill_list.filter((skill) => skill.acf.type === "other");

//Import functions
const pageID = 69; //ID of the skill page in the CMS
const pageContent = await fetchPageFromApi(pageID);

//Set the title object
const toggleTitles = pageContent.acf.title.split("|");

//Render the default
export default function Skills() {
  const [activeList, setActiveList] = useState("dev");
  const [listPosition, setListPosition] = useState(0);
  const [openStack, setOpenStack] = useState(false);

  //Set the scroll object reference and set the motion scroll listener
  const scrollReference = useRef(null);
  const { scrollY } = useScroll({ container: scrollReference });

  //List switcher function
  function handleSetActiveList() {
    setActiveList((a) => (a === "dev" ? "other" : "dev"));
    setOpenStack(false);
  }

  //Handle changes in scrolling on the scroll object and animate the visible object
  useMotionValueEvent(scrollY, "change", (current) => {
    //Set the scroll values
    const maximumScrollHeight = scrollReference.current.scrollHeight;
    const itemCount =
      activeList === "dev" ? dev_stack.length : other_stack.length;
    const itemScrollHeight = Number((maximumScrollHeight - 305) / itemCount);

    //Calculate how far we have scrolled
    const itemsScrolled = Math.floor(current / itemScrollHeight);

    //Set current item list
    setListPosition(itemsScrolled);
  });

  return (
    <section className="skills">
      <div className="scroller_wrapper">
        <div className={`skill_scroller ${openStack ? "stack_open" : ""}`}>
          <AnimatePresence>
            {activeList === "dev" ? (
              <motion.div exit={{ opacity: 0, transform: "translateY(-35px)" }}>
                <SkillsList
                  list={dev_stack}
                  count={dev_stack.length}
                  current={listPosition}
                  type="visual"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {activeList === "other" ? (
              <motion.div exit={{ opacity: 0, transform: "translateY(-35px)" }}>
                <SkillsList
                  list={other_stack}
                  count={other_stack.length}
                  current={listPosition}
                  type="visual"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

          {(activeList === "dev" && dev_stack.length >= 5) ||
          (activeList === "other" && other_stack.length >= 5) ? (
            <button
              className="skill_extender"
              onClick={() => setOpenStack((s) => !s)}
            >
              <span className="icon">
                <i className={`fas fa-${openStack ? "minus" : "plus"}`}></i>
              </span>
              <span className="text">
                {openStack ? "Sluiten" : "Open de volledige stack"}
              </span>
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="skill_scroller scroll_object" ref={scrollReference}>
          <div>
            {activeList === "dev" ? (
              <SkillsList
                list={dev_stack}
                count={dev_stack.length}
                current={listPosition}
                type="object"
              />
            ) : (
              <SkillsList
                list={other_stack}
                count={other_stack.length}
                current={listPosition}
                type="object"
              />
            )}
          </div>
          <div className="scroll_stretcher"></div>
        </div>
      </div>

      <div className="skill_side">
        <div
          className={`skill_switcher ${
            activeList === "dev" ? "left" : "right"
          }`}
          onClick={() => handleSetActiveList()}
        >
          <div className="h2 switch_name l">{toggleTitles[0]}</div>
          <div className="toggle"></div>
          <div className="h2 switch_name r">{toggleTitles[1]}</div>
        </div>
        <p>{pageContent.acf.text}</p>
      </div>
    </section>
  );
}

//Skilllist components
function SkillsList({ list, count, current, type }) {
  return (
    <ul className="skill_cards">
      {list.map((skill, index) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          index={index}
          currentItem={current}
          className={current === index ? "active" : "notsoactive"}
          type={type}
        />
      ))}
    </ul>
  );
}

function SkillCard({ className, skill, index, currentItem, type }) {
  //Define the styling value we are needing
  let transForm, zIndex, topMarg, botMarg;
  const distanceFromActive = Math.abs(currentItem - index);
  const animationDelay = Number(0.1 * Number(index));

  //Define styling
  if (index > currentItem && type === "visual") {
    transForm =
      distanceFromActive > 5 ? 0 : Number(1 - Number(distanceFromActive) * 0.1);
    zIndex = Number(100 - Number(distanceFromActive));
    topMarg = Number(
      -2 * Number(distanceFromActive) -
        Number(1.05 * Number(distanceFromActive))
    );
    botMarg = 0;
  } else if (index < currentItem && type === "visual") {
    transForm =
      distanceFromActive > 5 ? 0 : Number(1 - Number(distanceFromActive) * 0.1);
    zIndex = Number(100 - Number(distanceFromActive));
    topMarg = 0;
    botMarg = Number(
      -2 * Number(distanceFromActive) -
        Number(1.05 * Number(distanceFromActive))
    );
  } else if (
    (index === currentItem && type === "visual") ||
    type === "object"
  ) {
    transForm = 1;
    zIndex = 200;
    topMarg = 0;
    botMarg = 0;
  }

  return (
    <li
      className={`skill_card ${className}`}
      exit={{ opacity: 0, left: "-10px" }}
      style={{
        transform: `scale(${transForm})`,
        zIndex: zIndex,
        marginTop: `${topMarg}%`,
        marginBottom: `${botMarg}%`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <span className="icon" style={{ color: skill.acf.color }}>
        <i
          className={
            skill.acf.icon.style === "brands"
              ? `fab fa-${skill.acf.icon.id}`
              : `fas fa-${skill.acf.icon.id}`
          }
        ></i>
      </span>
      <span className="name">
        {skill.title.rendered.replace(/&amp;/g, "&")}
      </span>
    </li>
  );
}
