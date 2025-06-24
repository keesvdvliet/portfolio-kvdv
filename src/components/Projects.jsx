//React dependicies
import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

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
        <div className="projects_wrapper">
          <div className="project_side">
            <h3 className="h2 title">{pageContent.acf.title}</h3>
            <p>{pageContent.acf.text}</p>
          </div>

          <Swiper className="project_list" spaceBetween={30} slidesPerView={2}>
            {portfolio_projects.map((item, key) => (
              <SwiperSlide key={key}>
                {({ isActive, isPrev, isNext, isVisible }) => (
                  <Caseinfo
                    item={item}
                    activeState={isActive}
                    prevState={isPrev}
                    nextState={isNext}
                    visibleState={isVisible}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="projects_graphic">
          <span className="circle_1">&nbsp;</span>
          <span className="circle_2">&nbsp;</span>
          <span className="circle_3">&nbsp;</span>
          <span className="circle_4">&nbsp;</span>
          <span className="circle_5">&nbsp;</span>
        </div>
      </section>
    </>
  );
}

//Case components
function Caseinfo({ item, activeState, prevState, nextState, visibleState }) {
  return (
    <div
      className={`project_card ${activeState || prevState ? "past" : ""} ${
        nextState || visibleState ? "next" : ""
      }`}
      style={{ backgroundColor: item.acf.bgColor }}
    >
      <div className="project_card_contents">
        <img src={item.acf.img} className="thumbnail" />

        <div className="round_btn view_more">
          <span className="icon">
            <i className="fas fa-eye"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
