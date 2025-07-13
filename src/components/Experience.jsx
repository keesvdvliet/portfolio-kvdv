//React dependicies
import React from "react";

//Import the component styling
import "../css/components/experience.scss";

//Import functions
import { fetchDataFromApi } from "../functions/fetchFromApi";
import { fetchPageFromApi } from "../functions/fetchPageFromApi";

//Fetch the experience list(s) via the REST api
const work_experience = await fetchDataFromApi(
  "experience",
  import.meta.env.VITE_basedomain
);
const study_experience = await fetchDataFromApi(
  "education",
  import.meta.env.VITE_basedomain
);

//Import functions
const pageWorkContent = await fetchPageFromApi(
  77,
  import.meta.env.VITE_basedomain
);
const pageStudyContent = await fetchPageFromApi(
  78,
  import.meta.env.VITE_basedomain
);

//Render the default
export default function Experience() {
  //Create circles for background graphic
  const circleGraphic = [];
  for (let c = 1; c < 6; c++) {
    circleGraphic.push(
      <span key={`c${c}`} className={`circle_${c}`}>
        &nbsp;
      </span>
    );
  }

  return (
    <section className="experience">
      <div className="experience_container">
        <div className="experience_wrapper">
          <div className="experience_list">
            <ExperienceList
              title={pageWorkContent.acf.title}
              description={pageWorkContent.acf.text}
              list={work_experience}
            />
            <ExperienceList
              title={pageStudyContent.acf.title}
              description={pageStudyContent.acf.text}
              list={study_experience}
            />
          </div>
        </div>

        <div className="experience_graphic">{circleGraphic}</div>
      </div>
    </section>
  );
}

//Experience list component
function ExperienceList({ title, description, list }) {
  return (
    <section className="experience_section">
      <div className="experience_introduction">
        <h3 className="h3 title">{title}</h3>
        <p>{description}</p>
      </div>

      <div className="experience_list">
        {list.map((item) => (
          <div className="experience_item" key={item.id}>
            <h4 className="function h5">
              {item.title.rendered.replace(/&amp;/g, "&")}
            </h4>
            <div className="location p">{item.acf.loc}</div>
            <div className="period p">
              <span>{item.acf.period}</span>
              {item.acf.extra !== "" && <span>&nbsp;({item.acf.extra})</span>}
            </div>

            {item.acf.labelActive && (
              <div
                className="label"
                style={{
                  backgroundColor: item.acf.labelColor,
                  color: item.acf.textColor,
                }}
              >
                <span className="label_content">{item.acf.labelDesc}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
