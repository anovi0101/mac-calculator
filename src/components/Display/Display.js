import React from "react";
import { Textfit } from "react-textfit";

export default function Display(props) {
  return (
    <div className="display">
      <Textfit mode="single" max={45} className="display-numbers">
        {props.showNumber.length ? props.showNumber : "0"}
      </Textfit>
    </div>
  );
}
