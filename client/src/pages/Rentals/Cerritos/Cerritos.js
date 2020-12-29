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
              <img
                src={this.state.imagesArr[this.state.index]}
                alt="Bend"
              ></img> </div>
              <div className="button-container">
                <button className="prev-btn" onClick={this.prevPhoto}>
                  <FaChevronLeft />
                </button>
                <button className="next-btn" onClick={this.nextPhoto}>
                  <FaChevronRight />
                </button>
             
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
        <button>Contact</button>
        <button>Book</button>
      </>
    );
  }
}

export default Cerritos;
