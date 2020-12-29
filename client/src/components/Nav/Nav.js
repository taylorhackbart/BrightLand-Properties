import React from "react";
import "./nav.css"
import logo from "./logo.png"

function Nav() {
  return (
    <nav className="navbar ">
      <a className="navbar-brand" href="/">
        <img className="logo" src={logo}></img>
      </a>
      <div className= "nav-bar-buttons" >
      <a className="navbar-brand" href="/login">
         Employee Login
      </a>
      <a className="navbar-brand" href="/signup">
        SIGN-UP
      </a>
      <a className="navbar-brand" href="/properties">
        Properties
      </a>
      <a className="navbar-brand" href="/about">
        About BrightLand
      </a>
      </div>
    </nav>
  );
}

export default Nav;
