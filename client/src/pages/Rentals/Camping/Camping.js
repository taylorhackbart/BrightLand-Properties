import React, {Component} from "react";
import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import img3 from "./images/img3.png"
import img4 from "./images/img4.png"
import img5 from "./images/img5.png"
import img6 from "./images/img6.png"

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

class Camping extends Component {
  state = {
   imagesArr : [img1, img2, img3, img4, img5, img6],
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
        Will have all info on the space here
        The space
This glamping site in the Eastern cascades is amazing.There is an RV pad with an RV and full electric hookup. The RV has full functioning kitchen full bathroom and sleeping for 4. Double bed and queen bed over the cab. There are 3 luxurious series of tents for your sleeping comfort. About .4 miles walk away you get a member only access to the Deschutes river. Do the drift Enjoy!

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

export default Camping;
