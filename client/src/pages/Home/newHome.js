import React, { useState, useEffect, useRef } from "react";
// import "../style.css";
import { Tabs, Tab } from "react-bootstrap";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import "./home.css";

function NewHome() {
  const [index, setIndex] = useState(0);
  const [rental, setRental] = useState([]);
  const [newRental, setNewRental] = useState([]);
  const [evenRental, setEvenRental] = useState([]);
  const [oddRental, setOddRental] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const imageRef = useRef();
  const activityRef = useRef();
  const descriptionRef = useRef();
  useEffect(() => {
    loadRentals();
    // setLoading(false)
  }, []);

  const loadRentals = async () => {
    await API.getProperty()
      .then((resp) => {
        console.log(resp.data)
        setEvenRental(resp.data.slice(5, 10));
        setOddRental(resp.data.slice(0, 5));
        setRental(resp.data.slice(10,15))
        console.log(rental)
        setNewRental(resp.data.slice(15, 20))
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

 
  return (
    <>
      {loading === false && (
        <div className="card mb-3">
          <div className="card-img-top">
            <div className="center-me">
              <div className="row">
                <div className="col-md-6 col-sm-12 ">
                  {oddRental.map((col) => (
                    <div key={col._id}>
                      <ul>{col.location}</ul>
                      <ul>
                        <img className="home-image" src={col.homeImage} />
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 col-sm-12 ">
                  {evenRental.map((col) => (
                    <div key={col._id}>
                      <ul>{col.location}</ul>
                      <ul>
                        <img className="home-image" src={col.homeImage} />
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12 ">
                  {rental.map((col) => (
                    <div key={col._id}>
                      <ul>{col.location}</ul>
                      <ul>
                        <img className="home-image" src={col.homeImage} />
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 col-sm-12 ">
                  {newRental.map((col) => (
                    <div key={col._id}>
                      <ul>{col.location}</ul>
                      <ul>
                        <img className="home-image" src={col.homeImage} />
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewHome;
