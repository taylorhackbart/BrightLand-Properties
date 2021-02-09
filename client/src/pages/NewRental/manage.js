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
        <>
          {rental.map((x) => (
            <div key={x._id} className="row manage-row">
              <Link to={"/edit/" + x._id}>
                <ul>{x.location}</ul>
              </Link>
              
            </div>
          ))}
          <Link to={"/new"}>
            <ul>Add New Property</ul>
          </Link>
        </>
      )}
    </div>
  );
}
export default Manage;
