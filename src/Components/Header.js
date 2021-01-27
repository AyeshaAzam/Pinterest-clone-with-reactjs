import React, { useState } from "react";
import "./Header.css";
import { Icon } from "@material-ui/core";
import PinterestIcon from "@material-ui/icons/Pinterest";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import TextsmsIcon from "@material-ui/icons/Textsms";
import FaceIcon from "@material-ui/icons/Face";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { IconButton } from "@material-ui/core";
import db from "../firebase";

function Header(props) {
  const [input, setInput] = useState("");
  const [isRedColor, setRedColor] = useState(false);

  console.log("what is input", input);
  console.log("what are props", props);

  const onSearchSubmit = (e) => {
    e.preventDefault();

    props.onSubmit(input);
    // add to the firebase, cloud firestore
    db.collection("terms").add({
      term: input,
    });
  };

  const toggleColor = () => setRedColor((prev) => !prev);

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <PinterestIcon
            onClick={toggleColor}
            style={{
              background: isRedColor ? "#e60023" : "black",
              color: "white",
            }}
          />
        </div>
        <div className="header__button homePage">
          <a href="/">
            {/* <HomeIcon /> */}
            <p>HomePage</p>
          </a>
        </div>
        <div className="header__button today">
          <a href="/">
            <p>Today</p>
          </a>
        </div>
        <div className="header__button following">
          <a href="/">
            <p>Following</p>
          </a>
        </div>

        <div className="header__search">
          <div className="header__searchContainer">
            <IconButton>
              <SearchIcon />
            </IconButton>

            <form>
              <input type="text" onChange={(e) => setInput(e.target.value)} />
              <button type="submit" onClick={onSearchSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="header__menuItems">
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <FaceIcon />
          </IconButton>
          <IconButton>
            <TextsmsIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
