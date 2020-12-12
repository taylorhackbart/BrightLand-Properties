import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        CHANGE DAY LIGHT SAVINGS
      </a>
      <a className="navbar-brand" href="/">
        LOGIN
      </a>
      <a className="navbar-brand" href="/">
        SIGN-UP
      </a>
      <a className="navbar-brand" href="/sign">
        SIGN PETITION
      </a>
      <a className="navbar-brand" href="/graphs">
        VIEW GRAPH DATA
      </a>
    </nav>
  );
}

export default Nav;
