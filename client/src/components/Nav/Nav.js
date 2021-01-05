import React from "react";
import "./nav.css"
import logo from "./logo.png"
import {Dropdown, SplitButton} from "react-bootstrap"

function Nav() {
  return (
    <nav className="navbar ">
      <a className="navbar-brand" href="/">
        <img className="logo" src={logo}></img>
      </a>
      <div className= "nav-bar-buttons" >
      <a className="navbar-brand" href="/login">
         Employee Login (Inicio de sesión del empleado)
      </a>
      <SplitButton className="navbar-dropdown" href="/" variant="primary" title="Properties (
Alquiler de propiedad)">
        <Dropdown.Item eventKey="1" href="/Bend">Bend, OR</Dropdown.Item>
        <Dropdown.Item eventKey="2" href="/Cabo">Cabo, MX</Dropdown.Item>
        <Dropdown.Item eventKey="3" href="/Camping">Camping, OR</Dropdown.Item>
        <Dropdown.Item eventKey="4" href="/Cerritos">Los Cerritos, MX</Dropdown.Item>
        <Dropdown.Item eventKey="5" href="/IndianPalms">Indian Palms, CA</Dropdown.Item>
        <Dropdown.Item eventKey="6" href="/Indio">Indio, CA</Dropdown.Item>
        <Dropdown.Item eventKey="7" href="/Lapine">La Pine, OR</Dropdown.Item>
        <Dropdown.Item eventKey="8" href="/MtHood">Mt Hood, OR</Dropdown.Item>
        <Dropdown.Item eventKey="9" href="/Portland">Portland, OR</Dropdown.Item>
        
      </SplitButton>
      </div>
    </nav>
  );
}

export default Nav;
