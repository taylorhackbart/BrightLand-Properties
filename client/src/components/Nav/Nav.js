import React  from "react";
import "./nav.css";
import logo from "./logo.png";
import { Dropdown, SplitButton } from "react-bootstrap";


function Nav() {


  return (
    <nav className="navbar container-fluid">
      <a className="navbar-brand" href="/">
        <img className="logo" src={logo}></img>
      </a>
      <div className="nav-bar-buttons">
        <SplitButton
          className="navbar-dropdown"
          href="/properties"
          variant="primary"
          title="Properties (Alquiler de Propiedad)"
        >
          <Dropdown.Item eventKey="1" href="/properties/name/Bend">
            Bend, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" href="/properties/name/Cabo">
            Cabo, MX
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" href="/properties/name/Glamping">
            Camping, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" href="/properties/name/LosCerritos">
            Los Cerritos, MX
          </Dropdown.Item>
          <Dropdown.Item eventKey="5" href="/properties/name/IndianPalms">
            Indian Palms, CA
          </Dropdown.Item>
          <Dropdown.Item eventKey="6" href="/properties/name/Indio">
            Indio, CA
          </Dropdown.Item>
          <Dropdown.Item eventKey="7" href="/properties/name/LaPad">
            La Pine, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="8" href="/properties/name/MtHood">
            Mt Hood, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="9" href="/properties/name/Portland">
            Portland, OR
          </Dropdown.Item>
        </SplitButton>
      </div>
    </nav>
  );
}

export default Nav;
