import React, { Component } from "react";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import img6 from "./images/img6.png";
import img7 from "./images/img7.png";
import img8 from "./images/img8.png";
import img9 from "./images/img9.png";
import img10 from "./images/img10.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";

class Cabo extends Component {
  state = {
    imagesArr: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10],
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
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={this.state.imagesArr[this.state.index]}
                      className="d-block w-100 large-rental-photo"
                      alt="..."
                      
                    />
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

          <Tabs defaultActiveKey="space" id="noanim-tab-example">
            <Tab eventKey="space" title="The Space">
              Toggle between "The Space" and "Activities" tabs The Space A
              beautiful brand new condo with majestic views over the city of
              Cabo San Lucas Mexico A beautiful brand new condo with majestic
              views over the city of Cabo San Lucas Mexico. This spot has all
              new custom designed furniture that allows one to feel as if they
              have reached the top of the world. This place is only walking
              distance from down town Cabo. So many cool things to do only a
              short distance away, with some of the best temperatures and
              weather in the world. You owe it to yourself to have this
              experience. Designed for work from abroad nomads.. This spot has
              all new custom designed furniture that allows one to feel as if
              they have reached the top of the world. This place is only walking
              distance from down town Cabo. So many cool things to do only a
              short distance away, with some of the best temperatures and
              weather in the world. You owe it to yourself to have this
              experience. Designed for work from abroad nomads.
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here
            </Tab>
          </Tabs>
        </div>
        <div>
          <br></br>
        </div>
        <button className="contact-btn">Contact</button>
        <a href="https://www.airbnb.com/rooms/47028006?source_impression_id=p3_1609097886_tTm10W2Vd%2BQMRnmo" >
        <button className="book-btn">Book</button>
        </a>
      </>
    );
  }
}

export default Cabo;
