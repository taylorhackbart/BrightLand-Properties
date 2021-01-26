import React, { useState, useEffect } from "react";
import "./nav.css";
import logo from "./logo.png";
import API from "../../utils/API";
import { Navbar, Nav, NavDropdown, SplitButton } from "react-bootstrap";

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
      <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
        <Navbar.Brand className="logo-button" href="/">
          <img className="logo" src={logo}></img>
        </Navbar.Brand>

        {load === false && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav container-fluid" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-bar-buttons">
                <div className="home-button">
                  <Nav.Link className="home-button" href="/">HOME</Nav.Link>
                </div>
                <SplitButton
                  title="Dropdown"
                  id="collapsible-nav-dropdown"
                  className="navbar-dropdown"
                  href="/properties"
                  variant="primary"
                  title="LOCATIONS (ALQUILER DE PROPIEDAD)"
                  style={{ fontFamily: "Futura" }}
                >
                  {state.map((links) => (
                    <div key={links._id}>
                      <NavDropdown.Item
                        href={"/properties/name/" + links.location}
                      >
                        {links.location}
                      </NavDropdown.Item>
                    </div>
                  ))}
                  <NavDropdown.Item href="/">Home</NavDropdown.Item>
                </SplitButton>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBar;
