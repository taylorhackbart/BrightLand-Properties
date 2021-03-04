import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./style.css";

function Rentals() {
  const [newRental, setNewRental] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async (i) => {
    await API.getProperty()
      .then((resp) => {
        const data = resp.data;
        data.map((x) => {
          if (x.imageUrl.length > 0) {
            const locationArr = newRental;
            const index1 = locationArr.findIndex((e) => e._id === x._id);
            if (index1 === -1) {
              locationArr.push(x);
            }
          }
        });
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
                <div>
                  < div className="rental-mapping">
                    {newRental.map((o) => (
                      <>
                        <div className="center-div" key={o._id}>
                          <a key={o.location} href={"/properties/name/" + o.location}>
                            <ul className="descriptionArr" key={o.location}>{o.location}</ul>
                            <ul key={o.imageUrl[0].src}>
                                <img className="home-image" src={o.imageUrl[0].src} />
                            </ul>
                          </a>
                        </div>
                      </>
                    ))}
                  </div>
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
