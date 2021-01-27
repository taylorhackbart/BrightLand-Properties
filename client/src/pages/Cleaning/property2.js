import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

function PropertyRoutes() {
  const [rental, setRental] = useState({});
  const [user, setUser] = useState({});
  const [property, setProperty] = useState();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);

  const params = useParams();
  useEffect(async () => {
    loadUser();
    loadProperty();
  }, []);
  // console.log(user, rental)
  const loadUser = async () => {
    await API.getUserById(params.id).then((res) => {
      setUser(res.data);
      // console.log(res);
      setLoading(false);
    });
  };
  const loadProperty = () => {
    API.getProperty().then((res) => {
      setRental(res.data);
      // console.log(rental.filter((employee) => employee === rental.employee));
      const id = params.id;
      var elementPos = rental.map(function (x) {
        // console.log(x)
          return x.employee;
        })
      console.log(elementPos[1].find({_id : id}))
      setLoad(false);
      const findEmployee = () => {
        // API.getProperties(rental)
      };
    });
  };

  // const onSend = async () => {
  //     setProperty({...property, employee: user})
  //     const update = async () => {
  //      await API.updateProperty(property._id, property)
  //      .then(res => {
  //       setProperty({...property, employee: user})
  //        console.log(res)
  //      })
  //     console.log(property)
  //     }
  //     update()
  //   }

  // console.log(property)
  return (
    <>
      {loading === false && (
        <div>
          {load == false && (
            <>
              <h2> Choose Property Location for Employee: </h2>
              {/* {rental.map((type) => (
                <div key={type._id}>
                  <button
                  onClick={(e) => setProperty(type)}
                  >
                  {type.location}
                  </button>
                </div>
              ))} */}
              {/* <button onClick={onSend}> Submit</button> */}
            </>
          )}
        </div>
      )}
    </>
  );
}
export default PropertyRoutes;
