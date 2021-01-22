import React from "react"
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

function Rentals () {


  return(
    <div className="container">
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/Bend">
          <span>
            <img className="home-image" src={Bend}></img>
            <h2 className="smallDesc">Bend, OR</h2>
          </span>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/Cabo">
          <img className="home-image" src={Cabo}></img>
          <h2 className="smallDesc">Cabo, MX</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/MtHood">
          <img className="home-image" src={MtHood}></img>
          <h2 className="smallDesc">Mt. Hood, OR</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/Indio">
          <img className="home-image" src={Indio}></img>
          <h2 className="smallDesc">Indio, CA</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/LosCerritos">
          <img className="home-image" src={LosCerritos}></img>
          <h2 className="smallDesc">Los Cerritos, MX</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/Portland">
          <img className="home-image" src={Portland}></img>
          <h2 className="smallDesc">Portland, OR</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/LaPad">
          <img className="home-image" src={Lapine}></img>
          <h2 className="smallDesc">La Pine, OR</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/Glamping">
          <img className="home-image" src={Glambing}></img>
          <h2 className="smallDesc">Glamping in Oregon</h2>
        </a>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <a href="/properties/name/IndianPalms">
          <img className="home-image" src={IndianPalms}></img>
          <h2 className="smallDesc">Indian Palms, CA</h2>
        </a>
      </div>
      <div className="col-md-6 col-sm-12"></div>
    </div>
  </div>
  )
}
export default Rentals