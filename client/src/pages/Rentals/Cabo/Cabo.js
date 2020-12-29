import React, {Component} from "react";
import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import img3 from "./images/img3.png"
import img4 from "./images/img4.png"
import img5 from "./images/img5.png"
import img6 from "./images/img6.png"
import img7 from "./images/img7.png"
import img8 from "./images/img8.png"
import img9 from "./images/img9.png"
import img10 from "./images/img10.png"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

class Cabo extends Component {
  state = {
   imagesArr : [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10],
   index: 0
  }

 nextPhoto = () => {
    if (this.state.index +1 === this.state.imagesArr.length) {
      this.setState({
        index:0
      })
    } else {
      this.setState({
        index: this.state.index +1
      })
    }
    }
  
  prevPhoto = () => {
    if (this.state.index - 1 === -1) {
      this.setState({
        index: this.state.imagesArr.length - 1
      })
    } else {
      this.setState({
        index: this.state.index - 1
      })
    }
  }
  render(){
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div>
           <img src={this.state.imagesArr[this.state.index]} alt="Bend"></img>
           <div className='button-container'> 
        <button className='prev-btn' onClick={this.prevPhoto}>
          <FaChevronLeft />
        </button>
        <button className='next-btn' onClick={this.nextPhoto}>
          <FaChevronRight />
        </button>
      </div>
          </div>
        </div>
        Toggle between "The Space" and "Activities" tabs
        The Space
A beautiful brand new condo with majestic views over the city of Cabo San Lucas Mexico A beautiful brand new condo with majestic views over the city of Cabo San Lucas Mexico. This spot has all new custom designed furniture that allows one to feel as if they have reached the top of the world. This place is only walking distance from down town Cabo. So many cool things to do only a short distance away, with some of the best temperatures and weather in the world. You owe it to yourself to have this experience. Designed for work from abroad nomads.. This spot has all new custom designed furniture that allows one to feel as if they have reached the top of the world. This place is only walking distance from down town Cabo. So many cool things to do only a short distance away, with some of the best temperatures and weather in the world. You owe it to yourself to have this experience. Designed for work from abroad nomads.

      </div>
      <div>
        Will have all info on Activities to do around he property here
      </div>
      <div>
        Contact Button
      </div>
      <div>
        Button to lead you to the air bnb link to book your stay
      </div>
    </>
  );
}
}

export default Cabo;
