import React from "react";
import logo from "./images/Underground.svg";

function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="header_title">Tube Timetable</div>
      <div className="header_logo">
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}

export default Header;
