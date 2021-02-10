import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./clean.css";
import moment from "moment";
import { useHistory } from "react-router-dom";

function ViewCleanings() {
  const [cleaningArr, setCleaningArr] = useState([]);
  const [load, setLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [cleaningData, setCleaningData] = useState({});
  const [employeeArr, setEmployeesArr] = useState([]);

  useEffect(() => {
    // loadUserInfo();
    loadCleaning();
  }, [load, loading]);

  // const loadUserInfo = () => {
  //   API.getUser().then((res) => {
  //     const data = res.data;
  //     data.map((x) => {
  //       const newArr = x.cleaning;
  //       newArr.map((o) => {
  //         function pushToArray() {
  //           const index = cleaningArr.findIndex((e) => e._id === o._id);
  //           if (index === -1) {
  //             cleaningArr.unshift(o);
  //             console.log("new item");
  //           } else {
  //             console.log("matched");
  //           }
  //         }
  //         pushToArray();
  //       });
  //     });
  //     console.log(cleaningArr);
  //   });
  // };

  const loadCleaning = async (i) => {
    await API.getProperty().then((res) => {
      setCleaningData(res.data);
      // const data = res.data
      // data.map(x => {
      //   console.log(x.location)
      // })
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
    <div className="view-all-contain">
      {loading === false && (
        <>
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
        </>
      )}
    </div>
  );
}
export default ViewCleanings;
