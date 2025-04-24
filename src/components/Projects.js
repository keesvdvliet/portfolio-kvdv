//React dependicies
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
  return (
    <>
      <section className="projects">
        <div className="project_list">
          {portfolio_projects.map((item, key) => (
            <Case key={item.id} item={item} no={key} />
          ))}
        </div>

        <div className="project_side">
          <h3 className="h2 title">{pageContent.acf.title}</h3>
          <p>{pageContent.acf.text}</p>
        </div>
      </section>
    </>
  );
}

//Case components
function Case({ no, item }) {
  const [openProject, setOpenProject] = useState(null);

  function handleOpenProject(image, id) {
    //Set states
    setOpenProject(id);
  }

  //Set references for the in-view object and define some animation values
  let initialTop = "30px";
  if (no === 0) {
    initialTop = "55px";
  }
  if (no === 1) {
    initialTop = "-75px";
  }
  if (no === 2) {
    initialTop = "40px";
  }

  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, {
    once: true,
    margin: "250px 0px 0px 0px",
  });

  return (
    <AnimatePresence>
      <motion.div
        className={`case_card ${openProject === item.id ? "active" : ""}`}
        ref={inViewRef}
        initial={{ top: initialTop }}
        animate={isInView ? { top: "0" } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Clickable Image */}
        <motion.div
          className={`case_card_thumbnail_element`}
          layoutId={`popup-image-${item.id}`} // Unique ID for Framer Motion layout animation
          onClick={() => handleOpenProject(item.acf.img, item.id)}
          style={{ backgroundColor: item.acf.bgColor }}
        >
          <span className={`case_card_thumbnail_overlay ${item.acf.layout}`}>
            <h4 className="p title">{item.title.rendered}</h4>
            <span className="icon">
              <i className="fas fa-angle-right"></i>
            </span>
          </span>

          <motion.img
            src={item.acf.img}
            alt={item.title.rendered}
            className="case_image"
          />
        </motion.div>

        {/* Pop-up Modal */}
        {openProject && (
          <motion.div
            className="case_card_window"
            onClick={() => handleOpenProject(null, null)}
            initial={{ transform: "scale(.9)" }}
            animate={{ transform: "scale(1)" }}
            exit={{ transform: "scale(.9)" }}
            transition={{ type: "spring" }}
          >
            <motion.div
              className="window_modal"
              style={{ backgroundColor: item.acf.bgColor }}
              layoutId={`popup-image-${item.id}`}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              {/* Animated Image Transition */}
              <motion.img
                src={item.acf.img}
                alt={item.title.rendered}
                className="case_image"
              />

              {/* Text Content */}
              <motion.div className="case_description">
                <h4 className="title">{item.title.rendered}</h4>
                <p>{item.acf.desc}</p>

                {/* Close Button */}
                <button
                  onClick={() => handleOpenProject(null, null)}
                  className="close_button"
                >
                  <i className="fas fa-times"></i>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
