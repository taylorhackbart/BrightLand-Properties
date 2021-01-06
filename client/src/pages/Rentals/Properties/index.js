import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";
import API from "../../../utils/API"

function Properties() {
  const [propertyArr, setPropertyArr] = useState([])
  const [index, setIndex] = useState(0)
  const [rental, setRental] = useState({})

  useEffect(()=> {
    loadRentals();
  }, [index]);

  const loadRentals = () => {
   API.getProperty()
   .then(resp => {
     console.log(resp.data)
     setPropertyArr(resp.data);
     setRental(resp.data[index])
   })
   .catch((err) => console.log(err)
   )}

   const checkNumber = (number) => {
    if (number > propertyArr.length - 1) {
      return 0;
    }
    if (number < 0) {
      return propertyArr.length - 1;
    }
    return number;
  };

  const nextPhoto = () => {
    console.log(propertyArr)
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
            <div
               
               className="carousel slide"
               data-bs-ride="carousel"
             >
               <div className="carousel-inner">
                 <div className="carousel-item active rental-photo">
                   <img
                     src={rental.images}
                     className="d-block w-100 large-rental-photo"
                     alt="..."
                     
                   />
                 </div>
               </div>

               <a
                 className="carousel-control-prev"
                 
                 role="button"
                 data-bs-slide="prev"
                 onClick={prevPhoto}
               >
                 <span
                   className="carousel-control-prev-icon"
                   aria-hidden="true"
                 ></span>
                 <span className="visually-hidden"></span>
               </a>
               <a
                 className="carousel-control-next"
                 
                 role="button"
                 data-bs-slide="next"
                 onClick={nextPhoto}
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
            {rental.description}
            </Tab>
            <Tab eventKey="activities" title="Activities">
             {rental.activities}
            </Tab>
          </Tabs>
        </div>
        <button className="contact-btn">Contact</button>
        <a href={rental.link}>
        <button className="book-btn">Book</button>
        </a>
      </>
    );
  }

export default Properties;
