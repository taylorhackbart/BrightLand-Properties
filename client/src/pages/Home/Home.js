import React, {Component} from "react";
import Bend from "./images/Bend.png"
import Cabo from "./images/Cabo.png"
import Glambing from "./images/Glambing.png"
import IndianPalms from "./images/IndianPalms.png"
import Indio from "./images/Indio.png"
import Lapine from "./images/Lapine.png"
import LosCerritos from "./images/LosCerritos.png"
import MtHood from "./images/MtHood.png"
import Portland from "./images/Portland.png"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

class Home extends Component {
  state = {
   imagesArr : [Bend, Cabo, Glambing, IndianPalms, Indio, Lapine, LosCerritos, MtHood, Portland],
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
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <a href="/Bend" >
                <img src={Bend} ></img>
                Bend, OR
                </a>
            </div>
            <div className="col-md-6 col-sm-12">
              <a href="/Cabo" >
              <img src={Cabo} ></img>
              Cabo, MX
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <a href="/MtHood" >
              <img src={MtHood} ></img>
              Mt Hood, OR  </a>
            </div>
            <div className="col-md-6 col-sm-12">
             < a href="/Indio">
             <img src={Indio} ></img>
              Indio, CA
             </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
             < a href="/Cerritos">
             <img src={LosCerritos} ></img>
              Los Cerritos, MX
             </a>
            </div>
            <div className="col-md-6 col-sm-12">
             <a href="/Portland">
             <img src={Portland} ></img>
              Portland, OR
             </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <a href="/Lapine">
              <img src={Lapine} ></img>
              Lapine, OR
              </a>
            </div>
            <div className="col-md-6 col-sm-12">
             <a href="/camping">
             <img src={Glambing} ></img>
              Camping in Lapine, OR
             </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <a href="/IndianPalms">
              <img src={IndianPalms} ></img>
              Indian Palms, CA
              </a>
            </div>
            <div className="col-md-6 col-sm-12">
              
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
}
}

export default Home;
