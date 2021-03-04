import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import "./edit.css";
import NoMatch from "../NoMatch";

function Manage() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = () => {
    API.getProperty().then((res) => {
      setRental(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      {loading == false && (
        <div>
          {userData.user ? (
            <div className="manage-container">
              <div className="manage-row">
                {rental.map((x) => (
                  <Link to={"/edit/" + x._id} key={x._id}>
                    <ul className="ul-manage">{x.location}</ul>
                  </Link>
                ))}
                <Link to={"/new"}>
                  <ul className="ul-manage">* Add New Property</ul>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <NoMatch />
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default Manage;
