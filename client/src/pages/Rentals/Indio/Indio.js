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
import "../style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tabs, Tab } from "react-bootstrap";
class Indio extends Component {
  state = {
    imagesArr: [img1, img2, img3, img4, img5, img6, img7, img8, img9],
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
              info on the space here Welcome to my Terrific Townhous in Indian
              Palms CC. Light shines in through all windows creating a feeling
              of openness. The TV room flows into the kitchen which looks into
              the living/dining area out to the outdoor seating space making it
              the perfect indoor outdoor entertaining area. The pool is a 50 ft
              walk on the greenway. Upstairs there are 2 bdrms and a full bath.
              You will feel spoiled when you slip into the linen sheets in the
              king sized bed. Enjoy this home away from home.
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here My
              place is very centrally located. It is a bit over a mile walk to
              the empire polo fields where Coachella and stage coach is held. I
              am very close to the tennis pavilion and the HITS horse show.
              Indian Palms is beautifully landscaped with 27 holes of golf. The
              streets are wide and wonderful for walking. My unit is 50 steps
              away from the community pool and spa.
            </Tab>
          </Tabs>
        </div>
        <button>Contact</button>
        <button>Book</button>
      </>
    );
  }
}

export default Indio;
