import React from "react";
import Calendar from "react-calendar";
import EmbeddedPage from "../../components/EmbeddedPage/EmbeddedPage";

// This should:
// * Get the upcomingEvents Page
// * Pass the description to PaneItem (PI has it's own state)
// * Create the doSave() function/method
// * Don't mind about refs
const CalendarPanel = props => {
  const onClickDay = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    props.saveEverything();
    console.log(formattedDate);
    props.loadEverything(formattedDate);
  };

  return (
    <div>
      <Calendar onClickDay={onClickDay} />
      <EmbeddedPage title="upcomingEvents" member="description" />
    </div>
  );
};

export default CalendarPanel;
