import React from "react";
import Accordeon from "../../components/Accordeon/Accordeon";
import AccordeonItem from "../../components/Accordeon/AccordeonItem";
import CalendarPanel from "./CalendarPanel";
// import PanelItem from "../../components/PanelItem/PanelItem";

const Thoughts = React.forwardRef((props, myRefs) => {
  const doSave = name => content => props.doSave();

  return (
    <div id="content" className="container-fluid d-flex h-100 flex-column">
      <div className="row bg-light flex-fill d-flex justify-content-start">
        <div className="col-md-3 col-xs-12">
          <CalendarPanel
            saveEverything={props.doSave}
            loadEverything={props.loadEverything}
          />
        </div>

        {/* <div className="col-md-6 col-xs-12">
          <h2 style={{ textAlign: "center" }}>{props.page.title}</h2>
          <PanelItem
            name="thoughtsList"
            ref={props.myRefs.description}
            doSave={doSave("thougts")}
            content={props.page.description}
          />
        </div> */}
        <div className="col-md-3 col-xs-12">
          <Accordeon>
            {/* <AccordeonItem title="What for?">
              <PanelItem
                name="whatFor"
                ref={props.myRefs.whatFor}
                content={props.page.whatFor}
                doSave={doSave("whatFor")}
              />
            </AccordeonItem>
            <AccordeonItem title="Pros">
              <PanelItem
                name="pros"
                ref={props.myRefs.pros}
                content={props.page.pros}
                doSave={doSave("pros")}
              />
            </AccordeonItem>
            <AccordeonItem title="Cons">
              <PanelItem
                name="cons"
                ref={props.myRefs.cons}
                content={props.page.cons}
                doSave={doSave("cons")}
              />
            </AccordeonItem> */}
          </Accordeon>
        </div>
      </div>
    </div>
  );
});

export default Thoughts;
