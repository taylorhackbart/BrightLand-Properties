import React, { Component } from "react";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";


class Bend extends Component {
  state = {
    imagesArr: [img1, img2, img3, img4, img5],
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
    const child = { width: `30em`, height: `100%` };
 
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
              Toggle between "The Space" and "Activities" tabs Will have all
              info on the space here The Bend Riverside Inn & Suites offers
              stunning views of the infamous Deschutes River. The property
              includes a large indoor, heated pool and hot tub, laundry on-site,
              Dozens of walking trails along the Deschutes, and easy access to
              downtown. Of course, the rooms come with free wifi, and two TVs
              with cable. The condo comes with two beds, two bathrooms, and a
              full kitchen.
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here
              Riverside Bend getaway is located right on the Deschutes River in
              ; no better way to start the morning than to look out and enjoy
              the view of the river. With only a few short blocks you'll be able
              to walk to some of the Bend’s finest shops and restaurants. Bend
              is known for a fabulous dinner out, with many cuisine options to
              choose from. Shops and merchants feature local artists from around
              the state of Oregon.
            </Tab>
          </Tabs>
        </div>
        <button>Contact</button>
        <button>Book</button>
      </>
    );
  }
}

export default Bend;
