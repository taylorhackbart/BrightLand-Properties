import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import "./clean.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import NoMatch from "../NoMatch"

function ViewCleanings() {
  const { userData } = useContext(UserContext);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [cleaningData, setCleaningData] = useState({});
  const [employeeArr, setEmployeesArr] = useState([]);

  useEffect(() => {
    // loadUserInfo();
    loadCleaning();
  }, [load, loading]);

  const loadCleaning = async (i) => {
    await API.getProperty().then((res) => {
      setCleaningData(res.data);
      setLoad(false);
      loadAPI();
    });
  };

  const loadAPI = async (i) => {
    if (load === false) {
      try {
        await cleaningData.map((x) => {
          const newArr = x.employee;
          for (i = 0; i < newArr.length; i++) {
            if (newArr.length > 0) {
              newArr.map((child) => {
                const grandChild = child.cleaning;
                if (grandChild.length > 0) {
                  grandChild.map((o) => {
                    function pushToArray() {
                      const index = employeeArr.findIndex(
                        (e) => e._id === o._id
                      );
                      if (index === -1) {
                        employeeArr.unshift(o);
                      } 
                    }
                    pushToArray();
                    setLoading(false);
                  });
                }
              });
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

  };

  return (
    <div >
      {loading === false && (
        <>
        {userData.user ? (
          <div className="view-all-contain">
          {employeeArr.map((x) => (
            <div className="card view-all-card">
              <div className="card-body">
                <div key={x._id}>
                  <h5 className="card-title card-title-home">Name: </h5>
                  <h5 className="card-title card-title-home"> {x.name}</h5>
                  <p className="card-text">
                    DATE: {moment(x.startClean).format("DD/MM/YY")}
                  </p>
                  <p className="card-text">TIME COMPLETE: {x.stopClean}</p>
                  <p className="card-text"> NOTES: {x.notes}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) :(
          <NoMatch />
        )}
        </>
      )}
    </div>
  );
}
export default ViewCleanings;
