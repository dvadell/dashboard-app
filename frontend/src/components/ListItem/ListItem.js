import React from "react";
import "./ListItem.css";

const ListItem = ({ key, children, onClick }) => {
  return (
    <div key={key} onClick={onClick} className="list-item-div">
      {children}
    </div>
  );
};

export default ListItem;
