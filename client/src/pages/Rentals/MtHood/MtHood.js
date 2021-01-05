import React, { Component } from "react";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.jpg";
import img8 from "./images/img8.png";
import "../style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tab, Tabs } from "react-bootstrap";
class MtHood extends Component {
  state = {
    imagesArr: [img1, img2, img3, img4, img5, img6, img7, img8],
    index: 0,
  };

  nextPhoto = () => {
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

  prevPhoto = () => {
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
            <div className="center-me">
            <div
               
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active rental-photo">
                    <img
                      src={this.state.imagesArr[this.state.index]}
                      className="d-block w-100 large-rental-photo"
                      alt="..."
                      
                    />
                  </div>
                </div>

                <a
                  className="carousel-control-prev"
                  
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
            <div className="content-box">
          <Tabs defaultActiveKey="space">
            <Tab eventKey="space" title="The Space">
              The room is equipped with a private kitchen and bathroom. The room
              also connects to a nice patio with chairs and a peaceful view.
              This is one of the 10 units in the historic 1914 Thunderhead
              Lodge. The building used to serve as the transit center for
              transporting skiers up to the Timberline Lodge ski resort. Skiers
              in the 1950s would board a gondola that took them 2,200’ up the
              mountain. The Skiway was promoted as the longest and largest in
              the world at the time. The room is equipped with images of this
              historic time. The location of this room is right where people
              used to load and unload!
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here It
              walking distance to Government Camp's local bars and restaurants.
              Perhaps our most attractive feature is the use of our pool which
              stays extremely warm during (~100C) the winter, which feels
              amazing after a long day in the cold (pool and rec room closed due
              to COVID 19). Aside from amazingly warm pool that is more like a
              big hot tub, there is a recreational room for all guests to enjoy.
              The rec room includes a TV, fireplace, foosball table, and pool
              table.
            </Tab>
          </Tabs>
          </div>
        <button className="contact-btn">Contact</button>
        <button className="book-btn"> Book </button>
        </div>
      </>
    );
  }
}

export default MtHood;
