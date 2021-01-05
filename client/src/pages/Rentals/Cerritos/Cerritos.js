import React, { Component } from "react";
import img1 from "./images/img1.png";
import { Tab, Tabs } from "react-bootstrap";
import "../style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

class Cerritos extends Component {
  state = {
    imagesArr: [img1],
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
          <Tabs defaultActiveKey="space">
            <Tab eventKey="space" title="The Space">
              Toggle between "The Space" and "Activities" tabs Will have all
              info on the space here
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here
            </Tab>
          </Tabs>
        </div>
        <button className="contact-btn">Contact</button>
        <a href="https://www.airbnb.com/rooms/show/45737073">
        <button className="book-btn">Book</button></a>
      </>
    );
  }
}

export default Cerritos;
