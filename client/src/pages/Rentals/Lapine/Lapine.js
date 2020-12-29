import React, {Component} from "react";
import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import img3 from "./images/img3.png"
import img4 from "./images/img4.png"
import img5 from "./images/img5.png"
import img6 from "./images/img6.png"
import img7 from "./images/img7.png"
import img8 from "./images/img8.png"


import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

class Lapine extends Component {
  state = {
   imagesArr : [img1, img2, img3, img4, img5, img6, img7, img8],
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
        This RV space sets you in not only a secluded treed area but places you in a Mecca of bicycling, hiking and rafting in one of the most beautiful areas in the US. Having La Pine State park a mere 3 miles away on a quite road will take you to miles of cycling trails and hiking trails. In addition to the wonderful outdoor activities, La Pine State park has a dump site, fresh water fill for free.

The place is an RV pad only. We provide electricity for 30 amp and 50 amp and 110 plug in. Cell service is sketchy. You can walk out to the road and find a bit stronger service. If you are thinking of running your office from here don’t plan on it. This is a getaway.


      </div>
      <div>
        Will have all info on Activities to do around he property here

You can enjoy your own rafting experience by using the private park that comes with the rental of the pad. It is located off cub lane. You can walk or drive about .4 miles. Let in there then shuttle to Big Bend and let out. About a 3 hour float. Awesome.

The local attractions such as the lava caves are about a 10 mile dr away Sun river is 14 miles away and Paulina lake located in the caldera is about 20 min away has natural hot springs. These are just a few amazing attractions close by. That doesn’t even include crater lake which is about 2 hours away. Of course Bend the coolest town is about a 25 minute drive away has everything you need from shopping rafting checking out the local brews to art. If you need a quick refill of ice and basic supplies La Pine is a mere 6 miles

Our space is on a cool site with lots of land between you and your neighbors. If your looking for a unique experience in beautiful central Oregon this is your spot.

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

export default Lapine;
