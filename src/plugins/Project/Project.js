import React from "react";
import "./Project.css";
import Accordeon from "../../components/Accordeon/Accordeon";
import PanelItem from "../../components/PanelItem/PanelItem";
import AccordeonItemWithPanel from "../../components/AccordeonItemWithPanel";

const Project = props => {
  const doSave = name => content => {
    console.log("saving", { name, content });
    props.doSave();
  };
  // const parseColText = (text) => {
  //   let lines = text.split('\n')
  //   lines.map(line => {

  //   })
  // }
  // const inLeftCol = (page) => {
  //   let leftCols = parseColText(page.leftCol)
  //   if (leftCols.length > 0) return leftCols;
  //   // return a default layout
  //   return ['cons', 'pros']
  // }

  return (
    <div id="content" className="container-fluid d-flex h-100 flex-column">
      <div className="row bg-light flex-fill d-flex justify-content-start">
        <div className="col-md-3 col-xs-12">
          <Accordeon>
            {Object.keys(props.page)
              .filter(accordeon => typeof props.page[accordeon] === "string")
              .map(accordeon => (
                <AccordeonItemWithPanel
                  name={accordeon}
                  doSave={doSave(accordeon)}
                  ref={props.myRefs[accordeon]}
                  content={props.page[accordeon]}
                />
              ))}
          </Accordeon>
        </div>

        <div className="col-md-6 col-xs-12">
          <h2 style={{ textAlign: "center" }}>{props.page.title}</h2>
          <PanelItem
            name="description"
            ref={props.myRefs.description}
            doSave={doSave("description")}
            content={props.page.description}
          />
        </div>
        <div className="col-md-3 col-xs-12">
          <Accordeon>
            {["leftCol", "rightCol"].map(accordeon => (
              <AccordeonItemWithPanel
                name={accordeon}
                doSave={doSave(accordeon)}
                ref={props.myRefs[accordeon]}
                content={props.page[accordeon]}
              />
            ))}
          </Accordeon>
        </div>
      </div>
    </div>
  );
};

// export default editable(Project);
export default Project;
