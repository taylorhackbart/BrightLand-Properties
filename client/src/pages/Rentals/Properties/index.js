import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";
import API from "../../../utils/API"
// import HorizontalScroll from "react-scroll-horizontal";

function Properties() {
  const [property, setProperty] = useState({
    location: "",
    description: "",
    activities: "",
    images: "",
  })
  const [index, setIndex] = useState(0)

  useEffect(()=> {
    loadRentals();
  }, []);

  const loadRentals = () => {
   API.getProperty()
   .then(resp => {
     console.log(resp)
     setProperty(resp.data[0]);
     setIndex(resp.data[index])
   })
   .catch((err) => console.log(err)
   )}

   const checkNumber = (number) => {
    if (number > property.length - 1) {
      return 0;
    }
    if (number < 0) {
      return property.length - 1;
    }
    return number;
  };

  const nextPhoto = () => {
      setIndex((index) => {
        let newIndex = index + 1
        return checkNumber(newIndex)
      })
  };

  const prevPhoto = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

 
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="center-me">


              <img
                src={property.images}
                alt="Bend"
              ></img>

            </div>
            <div className="button-container">
              <button className="prev-btn" onClick={prevPhoto}>
                <FaChevronLeft />
              </button>
              <button className="next-btn" onClick={nextPhoto}>
                <FaChevronRight />
              </button>
            </div>
          </div>
          <Tabs defaultActiveKey="space" id="noanim-tab-example">
            <Tab eventKey="space" title="The Space">
            {property.description}
            </Tab>
            <Tab eventKey="activities" title="Activities">
             {property.activities}
            </Tab>
          </Tabs>
        </div>
        <button>Contact</button>
        <button>Book</button>
      </>
    );
  }

export default Properties;
