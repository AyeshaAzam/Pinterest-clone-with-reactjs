import React from "react";
import "./Header.css";
import { Icon } from "@material-ui/core";
import PinterestIcon from "@material-ui/icons/Pinterest";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";

function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <PinterestIcon />
        </div>
        <div className="header__button homePage">
          <HomeIcon />
        </div>
        <div className="header__button today">
          <p>Today</p>
        </div>
        <div className="header__button following">
          <p> following</p>
        </div>

        <div className="header__search">
          <div className="header__searchContainer">
            <SearchIcon />
            <form>
              <input type="text" />
              <button>Submit</button>
            </form>
          </div>
        </div>

        <div className="header__menuItems">
          <p>button Icon</p>
          <p>button Icon</p>
          <p>button Icon</p>
          <p>button Icon</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
