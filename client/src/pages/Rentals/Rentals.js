import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";

function Rentals() {
  const [rental, setRental] = useState([]);
  const [newRental, setNewRental] = useState([]);
  const [evenRental, setEvenRental] = useState([]);
  const [oddRental, setOddRental] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadRentals();
    // setLoading(false)
  }, []);

  const loadRentals = async () => {
    await API.getProperty()
      .then((resp) => {
        // console.log(resp.data)
        setEvenRental(resp.data.slice(5, 10));
        setOddRental(resp.data.slice(0, 5));
        setRental(resp.data.slice(10, 15));
        console.log(rental);
        setNewRental(resp.data.slice(15, 20));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="rental-margins">
      {loading === false && (
        <div className="card mb-3 card-rental">
          <div className="card-img-top">
            <div className="center-me">
              <div className="row">
                <div className="col-md-6 col-sm-12 ">
                  {oddRental.map((col) => (
                    <div className="center-div" key={col._id}>
                      <a href={"/properties/name/" + col.location}>
                        <ul className="descriptionArr">{col.location}</ul>
                        <ul>
                          <img
                            className="home-image"
                            src={col.imageUrl[0].src}
                          />
                        </ul>
                      </a>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 col-sm-12 ">
                  {evenRental.map((col) => (
                    <div className="center-div" key={col._id}>
                      <a href={"/properties/name/" + col.location}>
                        <ul className="descriptionArr">{col.location}</ul>
                        <ul>
                          <img
                            className="home-image"
                            src={col.imageUrl[0].src}
                          />
                        </ul>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-sm-12 ">
                  {rental.map((col) => (
                    <div key={col._id}>
                      <a href={"/properties/name/" + col.location}>
                        <ul className="descriptionArr">{col.location}</ul>
                        <ul>
                          <img
                            className="home-image"
                            src={col.imageUrl[0].src}
                          />
                        </ul>
                      </a>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 col-sm-12 ">
                  {newRental.map((col) => (
                    <div key={col._id}>
                      <a href={"/properties/name/" + col.location}>
                        <ul className="descriptionArr">{col.location}</ul>
                        <ul>
                          <img
                            className="home-image"
                            src={col.imageUrl[0].src}
                          />
                        </ul>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rentals;
