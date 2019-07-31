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

  // We are looking for lines like this: ~~ XXXXXXXX ~~
  const parseColText = text => {
    let lines = text.split("\n");
    return lines
      .map(line => {
        if (line.slice(0, 3) === "~~ " && line.slice(-3) === " ~~")
          return line.slice(3, -3);
      })
      .filter(x => x);
  };
  const parseLeftCol = page => {
    let leftCols = parseColText(page.leftCol);
    console.log("inLeftCol", leftCols);
    if (leftCols && leftCols.length > 0) return leftCols;
    // return a default layout
    return ["cons", "pros"];
  };
  const parseRightCol = page => {
    let rightCols = parseColText(page.rightCol);
    if (rightCols && rightCols.length > 0) return rightCols;
    // return a default layout
    return ["nextSteps", "whatFor"];
  };

  let leftCols = parseLeftCol(props.page);
  let rightCols = parseRightCol(props.page);
  if (props.viewHandler === "meta") {
    leftCols = ["leftCol", ...leftCols];
    rightCols = ["rightCol", ...rightCols];
  }

  return (
    <div id="content" className="container-fluid d-flex h-100 flex-column">
      <div className="row bg-light flex-fill d-flex justify-content-start">
        <div className="col-md-3 col-xs-12">
          <Accordeon>
            {leftCols.map(accordeon => (
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
            {rightCols.map(accordeon => (
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
