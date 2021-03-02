import React, { useState, useEffect } from "react";
import "./nav.css";
import logo from "./logo.png";
import API from "../../utils/API";
import {
  Navbar,
  Nav,
  NavDropdown,
  SplitButton,
  Dropdown,
} from "react-bootstrap";
import AuthOptions from "../auth/AuthOptions";
import { BiMenu } from "react-icons/bi";

function NavBar() {
  const [state, setState] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    await API.getProperty()
      .then((resp) => {
        setState(resp.data);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>

      {load === false && (
        <nav className="container">
          <div className="row navbar-row">
      <Navbar.Brand className="logo-button" href="/">
        <img className="logo" src={logo}></img>
      </Navbar.Brand>
          <Dropdown >
            <Dropdown.Toggle className="container-fluid" variant="light" id="dropdown-basic" >
              <BiMenu/>
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/">Home</Dropdown.Item>
              <Dropdown.Item href="/properties">
                All Properties
              </Dropdown.Item>
              {state.map((links) => (
                <div key={links._id}>
                  <Dropdown.Item href={"/properties/name/" + links.location}>
                    {links.location}{" "}
                  </Dropdown.Item>
                </div>
              ))}
              <Dropdown.Item href="#/action-3">
                <AuthOptions />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
      </nav>
      )}
    </>
  );
}

export default NavBar;
