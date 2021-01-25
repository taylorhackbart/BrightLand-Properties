import React, { useState, useEffect } from "react";
import "./nav.css";
import logo from "./logo.png";
import { Dropdown, SplitButton } from "react-bootstrap";
import API from "../../utils/API";

function Nav() {
  const [state, setState] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    await API.getProperty()
      .then((resp) => {
        setState(resp.data);
        // console.log(resp.data[0].location)
        setLoad(false);
        // console.log(state[0].location)
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar">
      <div className="logo-button">
        <a className="navbar-brand" href="/">
          <img className="logo" src={logo}></img>
        </a>
      </div>
      {load === false && (
        <div className="content-nav">
          <>
            <div className="home-button">
              <a href="/">
                <button className="styled-home"> HOME </button>
              </a>
            </div>
            <div className="nav-bar-buttons">
              <SplitButton
                className="navbar-dropdown"
                href="/properties"
                variant="primary"
                title="LOCATIONS (ALQUILER DE PROPIEDAD)"
                style={{ fontFamily: "Futura" }}
              >
                {state.map((links) => (
                  <div key={links._id}>
                    <Dropdown.Item
                      eventKey={links._id}
                      href={"/properties/name/" + links.location}
                    >
                      {links.location}
                    </Dropdown.Item>
                  </div>
                ))}
              </SplitButton>
            </div>
          </>
        </div>
      )}
    </nav>
  );
}

export default Nav;
