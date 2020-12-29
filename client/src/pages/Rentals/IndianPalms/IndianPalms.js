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
import "../style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

class IndianPalms extends Component {
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
            <div>
              <img
                src={this.state.imagesArr[this.state.index]}
                alt="Bend"
              ></img>
              <div className="button-container">
                <button className="prev-btn" onClick={this.prevPhoto}>
                  <FaChevronLeft />
                </button>
                <button className="next-btn" onClick={this.nextPhoto}>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
          <Tabs defaultActiveKey="space">
            <Tab eventKey="space" title="The Space">
              Toggle between "The Space" and "Activities" tabs Will have all
              info on the space here My home is a single level mid century open
              concept home. The kitchen looks out through the sliding glass
              doors to the pool. WiFi can be accessed throughout the home and
              poolside. There are 2 large flat screen smart TV's one in the LR
              and BR. There is a BBQ with an outdoor dining area. It is located
              in a gated community with 27 holes golf. The location, amenities
              and flow of this home make it a perfect vacation getaway for
              everyone.
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here
            </Tab>
          </Tabs>
        </div>
        <button>Contact</button>
        <button>Book</button>
      </>
    );
  }
}

export default IndianPalms;
