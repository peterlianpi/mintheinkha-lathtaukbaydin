import React from "react";
import { nanoid } from "nanoid";
import "../App.css";

function NumberBox(props) {
  const uniqueId = nanoid();
  const number = props.number;

  const clicked = () => {
    // Pass the selected question number to the parent component
    props.onSelect(number);
  };

  return (
    <div className="grid-item" data-id={uniqueId} onClick={clicked}>
      {number}
    </div>
  );
}

export default NumberBox;
