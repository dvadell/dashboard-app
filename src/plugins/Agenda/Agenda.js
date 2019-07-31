import React from "react";
import Accordeon from "../../components/Accordeon/Accordeon";
import CalendarPanel from "./CalendarPanel";
import AccordeonItemWithPanel from "../../components/AccordeonItemWithPanel";
import PanelItem from "../../components/PanelItem/PanelItem";
import "./Agenda.css";

const Agenda = React.forwardRef((props, myRefs) => {
  const doSave = name => content => {
    console.log("guardando:", { name, content });
    props.doSave();
  };

  return (
    <div id="content" className="container-fluid d-flex h-100 flex-column">
      <div className="big-container row bg-light flex-fill d-flex justify-content-start">
        <div className="col-md-3 col-xs-12">
          <CalendarPanel
            saveEverything={props.doSave}
            loadEverything={props.loadEverything}
          />
        </div>

        <div className="col-md-6 col-xs-12">
          <h2 className="main-title text-center">{props.page.title}</h2>
          <PanelItem
            name="description"
            ref={props.myRefs.description}
            doSave={doSave("description")}
            content={props.page.description}
          />
        </div>
        <div className="col-md-3 col-xs-12">
          <Accordeon>
            {["whatFor", "notes"].map(accordeon => (
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
});

export default Agenda;
