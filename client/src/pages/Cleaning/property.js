import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import "./clean.css";
import NoMatch from "../NoMatch"

function Cleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({})
  const [rental, setRental] = useState({})
  const history = useHistory();
  const [property, setPropertyType] = useState({});

  useEffect( async () => {
    loadProperty();
    // setLoading(false);
  }, []);

  const loadProperty = () => {
    API.getProperty().then((res) => {
      setState(res.data);
      console.log(res.data)
      setLoading(false);
    });
  };
  // console.log(property)
 
  const onSend = async (e) => {
    e.preventDefault();
    await API.saveCleaning(property.location)
    .then((res) => {
      console.log(res.data);
      setRental(res.data);
      const newFunc = async () => {
        const newArr = property.cleaning
        newArr.unshift(rental)
        console.log(newArr)
        const id = rental._id
        const update = async () => {
          await API.updateProperty(property._id, property)
          .then(res => {
            setPropertyType({...property, cleaning: newArr})
            console.log(property.cleaning[0]._id)
          })
          history.push("/startclean/" + property._id)
        }
        update()
      }
      newFunc()
    });
  };
 
  console.log(property, state);

  return (
    <>
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
           {userData.user ? (
          <form className= "page-adjustment">
            <label htmlFor="property-name">Choose the Property (Elija Propiedad): </label>
            <div>
            {state.map(x => (
              <div key={x._id}>
                <ul>
                  <li>
                <input type="radio" name = "location" onChange={(e) => setPropertyType({...x})}/>
                  {x.location}
                  </li>
               </ul>
                </div>
            ))}
              {/* <label htmlFor="property-name">Choose the Property (Elija Propiedad): </label>
            </div>
            <div className="row">
              <ul>
                <li>
                  <input
                    id="property-bend"
                    type="radio"
                    onChange={handleChange}
                    value="Bend"
                    name="property"
                  />{" "}
                  Bend
                </li>
                <li>
                  <input
                    id="property-cabo"
                    type="radio"
                    onChange={handleChange}
                    value="Cabo"
                    name="property"
                  />{" "}
                  Cabo
                </li>
                <li>
                  <input
                    id="property-camping"
                    type="radio"
                    onChange={handleChange}
                    value="Camping"
                    name="property"
                  />{" "}
                  Camping
                </li>
                <li>
                  <input
                    id="property-cerritos"
                    type="radio"
                    onChange={handleChange}
                    value="Los Cerritos"
                    name="property"
                  />{" "}
                  Los Cerritos
                </li>
                <li>
                  <input
                    id="property-indianpalms"
                    type="radio"
                    onChange={handleChange}
                    value="Indian Palms"
                    name="property"
                  />{" "}
                  Indian Palms
                </li>
                <li>
                  <input
                    id="property-indio"
                    type="radio"
                    onChange={handleChange}
                    value="Indio"
                    name="property"
                  />{" "}
                  Indio
                </li>
                <li>
                  <input
                    id="property-lapine"
                    type="radio"
                    onChange={handleChange}
                    value="La Pine"
                    name="property"
                  />{" "}
                  La Pine
                </li>
                <li>
                  <input
                    id="property-mthood"
                    type="radio"
                    onChange={handleChange}
                    value="Mt Hood"
                    name="property"
                  />{" "}
                  Mt Hood
                </li>
                <li>
                  <input
                    id="property-portland"
                    type="radio"
                    onChange={handleChange}
                    value="Portland"
                    name="property"
                  />{" "}
                  Portland
                </li>
              </ul> */}
                <button className="cleaning-next" onClick={onSend}>
                  {" "}
                  Next (Próximo)
                </button>
            </div>
          </form>
           ) : (
             <NoMatch />
           )}
        </UserContext.Provider>
      )}
    </>
  );
}
export default Cleaning;
