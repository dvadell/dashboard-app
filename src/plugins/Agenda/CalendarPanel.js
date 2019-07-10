import React from "react";
import Calendar from "react-calendar";

// onChangeCalendar = date => this.setState({ date });

const CalendarPanel = props => {
  const onClickDay = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    props.saveEverything();
    console.log(formattedDate);
    props.loadEverything(formattedDate);
  };

  return (
    <div>
      <Calendar
        //   value={this.state.date}
        onClickDay={onClickDay}
      />
      <h4>Julio</h4>
      <ul>
        <li>20: día el amigo</li>
        <li>22: mi cumpleaños</li>
        <li>23: día del arquero</li>
      </ul>
    </div>
  );
};

export default CalendarPanel;
