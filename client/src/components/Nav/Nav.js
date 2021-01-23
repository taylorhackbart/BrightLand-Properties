import React, {useState, useEffect}  from "react";
import "./nav.css";
import logo from "./logo.png";
import { Dropdown, SplitButton } from "react-bootstrap";
import API from "../../utils/API"

function Nav() {
  const [state, setState] = useState({})
  const [load, setLoad] = useState(true)
  
  useEffect( () => {
    loadRentals();
  }, [])
  
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
    <nav className="navbar container">
      <ul>
        <li>
      <a className="navbar-brand" href="/">
        <img className="logo" src={logo}></img>
      </a>
      </li>
    {load === false && (

   
      <li className="nav-bar-buttons">
        <SplitButton
          className="navbar-dropdown"
          href="/properties"
          variant="primary"
          title="Properties (Alquiler de Propiedad)"
          style={{fontFamily: "Futura"}}
        >
          <Dropdown.Item eventKey="1" href={"/properties/name/" + state[0].location}>
            Bend, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" href={"/properties/name/" + state[1].location}>
            Cabo, MX
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" href={"/properties/name/" + state[8].location}>
            Camping, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" href={"/properties/name/" + state[6].location}>
            Los Cerritos, MX
          </Dropdown.Item>
          <Dropdown.Item eventKey="5" href={"/properties/name/" + state[4].location}>
            Indian Palms, CA
          </Dropdown.Item>
          <Dropdown.Item eventKey="6" href={"/properties/name/" + state[5].location}>
            Indio, CA
          </Dropdown.Item>
          <Dropdown.Item eventKey="7" href={"/properties/name/" + state[7].location}>
            La Pine, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="8" href={"/properties/name/" + state[2].location}>
            Mt Hood, OR
          </Dropdown.Item>
          <Dropdown.Item eventKey="9" href={"/properties/name/" + state[3].location}>
            Portland, OR
          </Dropdown.Item>
        </SplitButton>
      </li>
    )}
      </ul>
    </nav>
  );
}

export default Nav;
