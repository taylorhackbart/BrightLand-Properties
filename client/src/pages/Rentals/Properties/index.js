import React, { Component } from "react";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";
import HorizontalScroll from "react-scroll-horizontal";

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


              <img
                style={child}
                src={this.state.imagesArr[this.state.index]}
                alt="Bend"
              ></img>

            </div>
            <div className="button-container">
              <button className="prev-btn" onClick={this.prevPhoto}>
                <FaChevronLeft />
              </button>
              <button className="next-btn" onClick={this.nextPhoto}>
                <FaChevronRight />
              </button>
            </div>
          </div>
          <Tabs defaultActiveKey="space" id="noanim-tab-example">
            <Tab eventKey="space" title="The Space">
            
            </Tab>
            <Tab eventKey="activities" title="Activities">
             
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
