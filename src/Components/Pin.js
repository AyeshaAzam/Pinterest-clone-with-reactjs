import React from "react";
import "./Pin.css";

function Pin(props) {
  let sizePin = "medium";
  let { urls } = props;
  //console.log("Props from pins", props);

  // if ((imageHeight = 4000)) {
  //   sizePin = "medium";
  // } else {
  //   sizePin = "small";
  // }

  // Images from :  https://unsplash.com/s/photos/random

  return (
    <div className="pin">
      <div className="pin__container">
        <div className={`pin__container  ${sizePin}`}>
          <img src={urls?.regular} alt="Pin" />
        </div>
      </div>
    </div>
  );
}

export default Pin;
