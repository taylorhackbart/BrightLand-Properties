import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import NoMatch from "../../pages/NoMatch";

function PropertyType() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const [rental, setRental] = useState({});
  const [user, setUser] = useState({})
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);

  const params = useParams();
  useEffect(async () => {
    loadUser();
    loadProperty();
  }, []);

  const loadUser = async () => {
    await API.getUserById(params.id).then((res) => {
      setUser(res.data)
      setLoading(false);
    });
  };
  const loadProperty = () => {
    API.getProperty().then((res) => {
      setRental(res.data);
      setLoad(false);
    });
  };
  const onSend = async () => {
      const newArr = property.employee
      newArr.push(user)
      setProperty({...property, employee: newArr})
      console.log(newArr)
      const update = async () => {
       await API.updateProperty(property._id, property)
       .then(res => {
        setProperty({...property, employee: newArr})
         console.log(res.data)
       })
       history.push("/home")
      }
      update()
    }

// console.log(property, user)
  return (
    <>
      {loading === false && (
        <div>
          {load == false && (
            <>
             {userData.user ? (
               <>
              <h2> Choose Property Location for Employee: </h2>
              {rental.map((type) => (
                <div key={type._id}>
                  <button
                  onClick={(e) => setProperty({...type})}
                  >
                  {type.location}
                  </button>
                </div>
              ))}
              <button onClick={onSend}> Submit</button>
              </>
             ) : (
               <NoMatch/>
             )}
            </>
          )}
        </div>
      )}
    </>
  );
}
export default PropertyType;
