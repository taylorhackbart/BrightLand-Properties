import React, { Component } from "react";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import img6 from "./images/img6.png";
import "../style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tab, Tabs } from "react-bootstrap";
class Camping extends Component {
  state = {
    imagesArr: [img1, img2, img3, img4, img5, img6],
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
              Toggle between "The Space" and "Activities" tabs Will have all
              info on the space here The space This glamping site in the Eastern
              cascades is amazing.There is an RV pad with an RV and full
              electric hookup. The RV has full functioning kitchen full bathroom
              and sleeping for 4. Double bed and queen bed over the cab. There
              are 3 luxurious series of tents for your sleeping comfort. About
              .4 miles walk away you get a member only access to the Deschutes
              river. Do the drift Enjoy!
            </Tab>

            <Tab eventKey="activities" title="Activities">
              <div>
                Will have all info on Activities to do around he property here
              </div>
            </Tab>
          </Tabs>
        </div>
        <button className="contact-btn">Contact</button>
        <a href="https://www.airbnb.com/rooms/show/44492007">
        <button className="book-btn">Book</button></a>
      </>
    );
  }
}

export default Camping;
