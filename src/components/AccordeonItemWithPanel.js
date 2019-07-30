import React from "react";
import AccordeonItem from "./Accordeon/AccordeonItem";
import PanelItem from "./PanelItem/PanelItem";

const AccordeonItemWithPanel = React.forwardRef((props, ref) => {
  console.log("AccordeonItemWithPanel", { props });
  return (
    <AccordeonItem title={props.name}>
      <PanelItem
        name={props.name}
        ref={ref}
        content={props.content}
        doSave={props.doSave}
      />
    </AccordeonItem>
  );
});

export default AccordeonItemWithPanel;
