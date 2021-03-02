import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import "../style.css";
import { IoBedOutline } from "react-icons/io5";
import { FaToilet } from "react-icons/fa";

function Properties() {
  const [index, setIndex] = useState(0);
  const [rental, setRental] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    loadRentals();
  }, []);
  const imageRef = useRef();
  const activityRef = useRef();
  const descriptionRef = useRef();
  const activityRefSpan = useRef();
  const descriptionRefSpan = useRef();
  const loadRentals = async () => {
    await API.getPropertiesByName(params.location)
      .then((resp) => {
        setRental(resp.data[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const checkNumber = (number) => {
    if (number > rental.imageUrl.length - 1) {
      return 0;
    }
    if (number < 0) {
      return rental.imageUrl.length - 1;
    }
    return number;
  };

  const nextPhoto = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPhoto = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <div className="container-fluid">
      <div className="card mb-3">
        <div className="card-img-top">
          <div className="center-me">
            <div className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active rental-photo">
                  {loading === false && (
                    <img
                      src={rental.imageUrl[index].src}
                      className="d-block w-100 large-rental-photo"
                      alt="..."
                      ref={imageRef}
                    />
                  )}
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

        <div className="card-body">
          <h5 className="card-title">{rental.location}</h5>
          <div className = "icon-rows">
          <IoBedOutline className="bed-icon" /> {rental.bedCount}
          <FaToilet className="bath-icon" /> {rental.bathCount}
          </div>
          <div className="card-text card-text-rental">
            <Tabs defaultActiveKey="space" id="noanim-tab-example">
              <Tab eventKey="space" title="The Space" ref={descriptionRef}>
                {rental.description}
              </Tab>
              <Tab eventKey="activities" title="Activities" ref={activityRef}>
                {rental.activities}
              </Tab>
              <Tab
                eventKey="spaceSpan"
                title="Espacio"
                ref={descriptionRefSpan}
              >
                {rental.descriptionSpan}
              </Tab>
              <Tab
                eventKey="activitySpan"
                title="Ocupaciones"
                ref={activityRefSpan}
              >
                {rental.activitiesSpan}
              </Tab>
            </Tabs>
          </div>
            <a href={rental.link} target="_blank">
              <button className="book-btns">Book</button>
            </a>
        </div>
      </div>
    </div>
  );
}

export default Properties;
