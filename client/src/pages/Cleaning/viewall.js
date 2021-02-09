import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./clean.css";

function ViewCleanings() {
  const [user, setUser] = useState({});
  const [cleaningArr, setCleaningArr] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    API.getUser().then((res) => {
      const data = res.data;
      data.map((x) => {
        const newArr = x.cleaning;
        newArr.map((o) => {
          function pushToArray() {
            const index = cleaningArr.findIndex((e) => e._id === o._id);
            if (index === -1) {
              cleaningArr.unshift(o);
              console.log("new item");
            } else {
              console.log("matched");
            }
          }
          pushToArray();
          setLoad(false);
        });
      });
      console.log(cleaningArr)
    });
  };
  return (
    <div className="view-all-contain">
      {load === false && (
        <>
          {cleaningArr.map((x) => (
            <div key={x._id}>
              <li>NAME: {x.name}</li>
              <li>START CLEAN: {x.startClean}</li>
              <li>STOP CLEAN:{x.stopClean}</li>
              <li>NOTES: {x.notes}</li>
              <li>
                  <>
                  IMAGES:
                    {x.images.map((o) => (
                      <div className="img-view-all" key={o.id}>
                      <img src={o.src} className="view-all-img" alt="none"/>
                     {/* {console.log(o)} */}
                     </div>
                    ))}
                  </>
                    </li>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
export default ViewCleanings;
