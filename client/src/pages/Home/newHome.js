import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import { Tabs, Tab } from "react-bootstrap";
import API from "../../../utils/API";
import { useParams } from "react-router-dom";
import "../style.css";

function newHome() {
  const [index, setIndex] = useState(0);
  const [rental, setRental] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const imageRef = useRef();
  const activityRef = useRef();
  const descriptionRef = useRef();
  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    await API.getProperty()
      .then((resp) => {
       console.log(resp);
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
  // const updateInfo = (event) => {
  //   const { name, value } = event.target;
  //   API.updateProperty(rental._id, rental)
  //     .then((res) => {
  //       setRental({ ...rental, [name]: value });
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // };
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setRental({ ...rental, [name]: value })
  // };

  return (
    <>
      {/* <div className="card mb-3">
        <div className="card-img-top">
          <div className="center-me">
            <div className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active rental-photo">
                  {loading === false && (
                    <img
                      src={rental.imageUrl[index]}
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
      </div> */}
    </>
  );
}

export default newHome;