import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./edit.css"

function Manage() {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const [done, setDone] = useState(false)

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = () => {
    API.getProperty().then((res) => {
      setRental(res.data);
      console.log(res);
      setLoading(false);
    });
  };
 

  return (
    < div className="manage-container">
      {loading == false && (
        < div className="manage-row">
          {rental.map((x) => (

              <Link to={"/edit/" + x._id} key={x._id}>
                <ul className="ul-manage">{x.location}</ul>
              </Link>
              

          ))}
          <Link to={"/new"}>
            <ul className="ul-manage">* Add New Property</ul>
          </Link>
        </div>
      )}
    </div>
  );
}
export default Manage;
