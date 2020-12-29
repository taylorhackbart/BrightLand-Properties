import React from "react";
import "./nav.css"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        BRIGHTLAND 
      </a>
      <div className= "nav-bar-buttons" style={{float:"right"}}>
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
