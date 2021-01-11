import React  from "react";
import "./nav.css";
import logo from "./logo.png";
import { Dropdown, SplitButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

function Nav() {
  // const { userData, setUserData } = useContext(UserContext);

  // const history = useHistory();

  // const register = () => history.push("/register");
  // const login = () => history.push("/login");
  // const logout = () => {
  //   setUserData({
  //     token: undefined,
  //     user: undefined,
  //   });
  //   localStorage.setItem("auth-token", "");
  // };




  return (
    <nav className="navbar ">
      <a className="navbar-brand" href="/">
        <img className="logo" src={logo}></img>
      </a>
      <div className="nav-bar-buttons">
        {/* <a className="navbar-brand" href="/login">
          Employee Login (Inicio de sesión del empleado)
        </a>
        <a className="navbar-brand" href="/logout">
          logout
        </a> */}
        {/* <AuthOptions /> */}
        <SplitButton
          className="navbar-dropdown"
          href="/"
          variant="primary"
          title="Properties (Alquiler de propiedad)"
        >
          <Dropdown.Item eventKey="1" href="/Properties/name/Bend">
            Bend, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" href="/Properties/name/Cabo">
            Cabo, MX
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" href="/Properties/name/Glamping">
            Camping, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" href="/Properties/name/LosCerritos">
            Los Cerritos, MX
          </Dropdown.Item>
          <Dropdown.Item eventKey="5" href="/properties/name/IndianPalms">
            Indian Palms, CA
          </Dropdown.Item>
          <Dropdown.Item eventKey="6" href="/Properties/name/Indio">
            Indio, CA
          </Dropdown.Item>
          <Dropdown.Item eventKey="7" href="/properties/name/LaPad">
            La Pine, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="8" href="/Properties/name/MtHood">
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
