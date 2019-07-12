import React from "react";
import Calendar from "react-calendar";

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

  const saveUpcomingEvents = () => {
    console.log("saveUpcomingEvents");
  };

  return (
    <div>
      <Calendar
        //   value={this.state.date}
        onClickDay={onClickDay}
      />
      <h4>Julio</h4>
      {/* <PanelItem
                name="upcomingEvents"
                ref={props.myRefs.cons}
                content={props.page.cons}
                doSave={saveUpcomingEvents}
      /> */}
    </div>
  );
};

export default CalendarPanel;
