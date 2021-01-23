import React, {useState, useEffect} from "react"
import Bend from "../Home/images/Bend.jpg";
import Cabo from "../Home/images/Cabo.jpg";
import Glambing from "../Home/images/Glambing.jpg";
import IndianPalms from "../Home/images/IndianPalms.jpg";
import Indio from "../Home/images/Indio.jpg";
import Lapine from "../Home/images/Lapine.png";
import LosCerritos from "../Home/images/LosCerritos.jpg";
import MtHood from "../Home/images/MtHood.jpg";
import Portland from "../Home/images/Portland.jpg";
import "../Home/home.css";
import Properties from "./Properties";
import API from "../../utils/API"

function Rentals () {
const [state, setState] = useState({})
const [index, setIndex] = useState(0)
const [load, setLoad] = useState(true)

useEffect( () => {
  loadRentals();
  // setLoad(false)
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
  return(
    <div className="container">
    { load === false && ( 
    <div> 
      {/* {state.map(links => (
        <div key={links._id}>
        <ul> {links.location} </ul>
        </div>
      ))} */}
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[0].location}>
          <span>
            
            <img className="home-image" src={Bend}></img>
            <h2 className="smallDesc">Bend, OR</h2>
          </span>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[1].location}>
          <img className="home-image" src={Cabo}></img>
          <h2 className="smallDesc">Cabo, MX</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[2].location}>
          <img className="home-image" src={MtHood}></img>
          <h2 className="smallDesc">Mt. Hood, OR</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[5].location}>
          <img className="home-image" src={Indio}></img>
          <h2 className="smallDesc">Indio, CA</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[6].location}>
          <img className="home-image" src={LosCerritos}></img>
          <h2 className="smallDesc">Los Cerritos, MX</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[3].location}>
          <img className="home-image" src={Portland}></img>
          <h2 className="smallDesc">Portland, OR</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[7].location}>
          <img className="home-image" src={Lapine}></img>
          <h2 className="smallDesc">La Pine, OR</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[8].location}>
          <img className="home-image" src={Glambing}></img>
          <h2 className="smallDesc">Glamping in Oregon</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href={"/properties/name/" + state[4].location}>
          <img className="home-image" src={IndianPalms}></img>
          <h2 className="smallDesc">Indian Palms, CA</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12"></div>
    </div>
    </div>
    )}
  </div>
  )
}
export default Rentals