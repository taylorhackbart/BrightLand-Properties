import React, { Component } from "react";
import Bend from "./images/Bend.jpg";
import Cabo from "./images/Cabo.jpg";
import Glambing from "./images/Glambing.jpg";
import IndianPalms from "./images/IndianPalms.jpg";
import Indio from "./images/Indio.jpg";
import Lapine from "./images/Lapine.png";
import LosCerritos from "./images/LosCerritos.jpg";
import MtHood from "./images/MtHood.jpg";
import Portland from "./images/Portland.jpg";
import "./home.css";

class HomePage extends Component {
  state = {
    imagesArr: [
      Bend,
      Cabo,
      Glambing,
      IndianPalms,
      Indio,
      Lapine,
      LosCerritos,
      MtHood,
      Portland,
    ],
    index: 0,
    descriptionArr:[
      "BEND, OR",
      "CABO, MX",
      "GLAMBING IN OREGON",
      "INDIAN PALMS, CA",
      "INDIO, CA",
      "LA PINE, CA",
      "LOS CERRITOS, MX",
      "MT HOOD, OR",
      "PORTLAND, OR"
    ]
  };
  handleClick =()=>{
    this.setState({index: this.state.index})
  }
  nextPhoto = (e) => {
    e.preventDefault()
    if (this.state.index + 1 === this.state.imagesArr.length) {
      this.setState({
        index: 0,
      });
    } else {
      this.setState({
        index: this.state.index + 1,
      });
    }
  };

  prevPhoto = (e) => {
    e.preventDefault()
    if (this.state.index - 1 === -1) {
      this.setState({
        index: this.state.imagesArr.length - 1,
      });
    } else {
      this.setState({
        index: this.state.index - 1,
      });
    }
  };
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 center-me">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={this.state.imagesArr[this.state.index]}
                      className="d-block w-100 large-photo"
                      alt="..."
                      
                    />
                    <h2 className="descriptionArr"> {this.state.descriptionArr[this.state.index]}</h2>
                  </div>
                </div>

                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="prev"
                  onClick={this.prevPhoto}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-bs-slide="next"
                  onClick={this.nextPhoto}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden"></span>
                </a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/Bend">
                  <span>
                    <img className="home-image" src={Bend}></img>
                    <h2 className="smallDesc">Bend, OR</h2>
                  </span>
                </a>
              </div>
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/Cabo">
                  <img className="home-image" src={Cabo}></img>
                  <h2 className="smallDesc">Cabo, MX</h2>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/MtHood">
                  <img className="home-image" src={MtHood}></img>
                  <h2 className="smallDesc">Mt. Hood, OR</h2>
                </a>
              </div>
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/Indio">
                  <img className="home-image" src={Indio}></img>
                  <h2 className="smallDesc">Indio, CA</h2>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/LosCerritos">
                  <img className="home-image" src={LosCerritos}></img>
                  <h2 className="smallDesc">Los Cerritos, MX</h2>
                </a>
              </div>
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/Portland">
                  <img className="home-image" src={Portland}></img>
                  <h2 className="smallDesc">Portland, OR</h2>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/LaPad">
                  <img className="home-image" src={Lapine}></img>
                  <h2 className="smallDesc">La Pine, OR</h2>
                </a>
              </div>
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/Glamping">
                  <img className="home-image" src={Glambing}></img>
                  <h2 className="smallDesc">Glamping in Oregon</h2>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <a href="/Properties/name/IndianPalms">
                  <img className="home-image" src={IndianPalms}></img>
                  <h2 className="smallDesc">Indian Palms, CA</h2>
                </a>
              </div>
              <div className="col-md-6 col-sm-12"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
