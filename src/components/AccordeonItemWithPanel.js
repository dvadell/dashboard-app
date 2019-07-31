import React from "react";
import AccordeonItem from "./Accordeon/AccordeonItem";
import PanelItem from "./PanelItem/PanelItem";

const prettyCamelCase = name => {
  let prettyName = "";
  name.split("").forEach((letter, i) => {
    if (i === 0) letter = letter.toUpperCase();
    if (letter === letter.toUpperCase()) {
      prettyName = prettyName + " ";
    }
    prettyName = prettyName + letter;
  });
  return prettyName;
};

const AccordeonItemWithPanel = React.forwardRef((props, ref) => {
  const title = prettyCamelCase(props.name);
  return (
    <AccordeonItem title={title}>
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
