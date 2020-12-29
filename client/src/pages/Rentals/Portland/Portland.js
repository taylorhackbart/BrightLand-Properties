import React, { Component } from "react";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";
import img5 from "./images/img5.png";
import img6 from "./images/img6.png";
import img7 from "./images/img7.png";
import "../style.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Tabs, Tab } from "react-bootstrap";
class Portland extends Component {
  state = {
    imagesArr: [img1, img2, img3, img4, img5, img6, img7],
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
              info on the space here Space My studio has amazing light looking
              east to the city. The outdoor patio with seating and BBQ complete
              the space.A full size kitchen with everything you need to create a
              wonderful entertaining area The studio lives larger than the
              square footage. Large bathroom with a nice shower. Couch under the
              loft bed making viewing the big screen TV for your streaming
              converts into a comfortable bed. You will want for nothing. Just
              bring your clothes and your toothbrush
            </Tab>
            <Tab eventKey="activities" title="Activities">
              Will have all info on Activities to do around he property here
              This studio has a 99 walking score. The famous Portland farmer
              market is a 20 min walk with voodoo doughnuts right there. Walk
              past Powells bookstore and take a peak at the 1,000 ‘s of new and
              used books. There are so many brew pubs restaurants grocery stores
              all within 5 min walk from the front door. Surrounding the
              Portland area: incredible hiking in the gorge 30 min away, wine
              tasting 30 min away, beaches 1 hr away and snow skiing 1 hour way
              to Mt Hood. Parking is on street with permit and light rail is a
              block away should you not want a car
            </Tab>
          </Tabs>
        </div>
        <button>Contact</button>
        <button>Book</button>
      </>
    );
  }
}

export default Portland;
