import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useHistory, useParams } from "react-router-dom";
import "./clean.css";
import NoMatch from "../NoMatch"
// import { exists } from "../../../../models/user";


function Cleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({})
  const [user1, setUser1] = useState(new Set())
  const [state, setState] = useState({})
  const [state1, setState1] = useState(new Set())
  const [rental, setRental] = useState([])
  const history = useHistory();
  const [index, setIndex] = useState(0)
  const [property, setPropertyType] = useState({});
  const [property1, setPropertyType1] = useState(new Set());
  const params = useParams()
// console.log(params.id)

  useEffect( async () => {
    loadProperty();
    loadUser();
    // setLoading(false);
  }, []);

  const loadProperty = () => {
    API.getProperty().then((res) => {
      setState(res.data);
      console.log(res.data)
      // setState1([res.data])
      setLoading(false);
    });
  };
  // console.log(state1, user1)
const loadUser = () => {
  API.getUserById(params.id)
  .then(res => {
    console.log(res.data)
    setUser(res.data)
    // setUser1([res.data])
  })
}
const findId = () => {
  console.log(params.id)
  console.log(property.employee)
}
console.log(rental, property)
  const onSend = async (e, i) => {
    e.preventDefault();
    console.log(params.id)
    
  console.log(property.employee)
    const newArr = property.employee
    function pushToArray() {
      const index = newArr.findIndex((e) => e._id === user._id);
      // console.log(obj)
      if (index === -1) {
        const item = newArr.unshift(user)
          console.log(item, "new item")
      } else {
        console.log("matched", index, newArr[index])
        const updatedArr = newArr[index].cleaning
        console.log(updatedArr, user.cleaning)
        updatedArr.push(user.cleaning[0])

      }
      setPropertyType({...property})
    }
    updateProp() 
  pushToArray()
};
  console.log(user, property)
    const updateProp = async() => {
      await API.updateProperty(property._id, property)
      .then(res=> {
        console.log(res)
      })
      
    }
  
 
  // console.log(property, rental);

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
