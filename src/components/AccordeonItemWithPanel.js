import React from "react";
import AccordeonItem from "./Accordeon/AccordeonItem";
import PanelItem from "./PanelItem/PanelItem";

const AccordeonItemWithPanel = props => {
  console.log("AccordeonItemWithPanel", { props });
  return (
    <AccordeonItem title={props.name}>
      <PanelItem
        name={props.name}
        ref={props.ref}
        content={props.content}
        doSave={props.doSave}
      />
    </AccordeonItem>
  );
};

export default AccordeonItemWithPanel;
