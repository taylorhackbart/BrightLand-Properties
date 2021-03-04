import React, { useState, useEffect, useContext } from "react";
import "./nav.css";
import logo from "./logo.png";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { Navbar, Dropdown } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

function NavBar() {
  const [state, setState] = useState({});
  const [load, setLoad] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

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

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const home = () => history.push("/home");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <>
      {load === false && (
        <nav className="container">
          <div className="row navbar-row">
            <Navbar.Brand className="logo-button" href="/">
              <img className="logo" src={logo}></img>
            </Navbar.Brand>
            <Dropdown>
              <Dropdown.Toggle
                className="container-fluid"
                variant="light"
                id="dropdown-basic"
              >
                <BiMenu />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/">Home</Dropdown.Item>
                <Dropdown.Item href="/properties">All Properties</Dropdown.Item>
                {state.map((links) => (
                  <div key={links._id}>
                    <Dropdown.Item href={"/properties/name/" + links.location}>
                      {links.location}{" "}
                    </Dropdown.Item>
                  </div>
                ))}
                {userData.user ? (
                  <div>
                    <div className="row-employee">
                      <Dropdown.Item className="employee-button" onClick={home}>
                        {" "}
                        Manage{" "}
                      </Dropdown.Item>
                    </div>
                    <div className="row-logout">
                      <Dropdown.Item className="logout-button" onClick={logout}>
                        Logout
                      </Dropdown.Item>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="align-me">
                      <Dropdown.Item className="login-button" onClick={login}>
                        Login
                      </Dropdown.Item>
                      <AiOutlineUserAdd
                        className="register-button"
                        style={{ display: "none" }}
                        onClick={register}
                      >
                        Register
                      </AiOutlineUserAdd>
                    </div>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
