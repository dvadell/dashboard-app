import React, { Component } from "react";
import Accordeon from "../../components/Accordeon/Accordeon";
import AccordeonItem from "../../components/Accordeon/AccordeonItem";
import Calendar from "react-calendar";
import PanelItem from "../../components/PanelItem/PanelItem";

const AgendaView = React.forwardRef((props, myRefs) => {
  const doSave = name => content => props.doSave();

  return (
    <div id="content" className="container-fluid d-flex h-100 flex-column">
      <div className="row bg-light flex-fill d-flex justify-content-start">
        <div className="col-md-3 col-xs-12">
          <Calendar
            //   value={this.state.date}
            onClickDay={props.onClickDay}
          />
          <h4>Julio</h4>
          <ul>
            <li>20: día el amigo</li>
            <li>22: mi cumpleaños</li>
            <li>23: día del arquero</li>
          </ul>
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
            <AccordeonItem title="What for?">
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
            </AccordeonItem>
          </Accordeon>
        </div>
      </div>
    </div>
  );
});

export default AgendaView;
