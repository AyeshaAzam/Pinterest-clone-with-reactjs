import React from "react";
import "./Mainboard.css";
import Pin from "./Pin";

function Mainboard(props) {
  //console.log("From mainboard", props);
  let { pins } = props;
  return (
    <div className="mainboard">
      {/* 
      -Array of pins = props
      -map through Pins
      -and with every pin -- use Pin components */}
      {pins.map((pin, index) => {
        let { urls } = pin; // destructuring from pin the URLS
        return <Pin urls={urls} key={index} />;
      })}
    </div>
  );
}

export default Mainboard;
