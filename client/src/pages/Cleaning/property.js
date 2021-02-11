import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useHistory, useParams, Link } from "react-router-dom";
import "./clean.css";
import NoMatch from "../NoMatch";
// import { exists } from "../../../../models/user";

function Cleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [state, setState] = useState({});
  const [property, setPropertyType] = useState({});
  const params = useParams();
  const history = useHistory()

  useEffect(async () => {
    loadProperty();
    loadUser();
  }, []);

  const loadProperty = () => {
    API.getProperty().then((res) => {
      setState(res.data);
      // console.log(res.data);
      setLoading(false);
    });
  };

  const loadUser = () => {
    API.getUserById(params.id).then((res) => {
      // console.log(res);
      setUser(res.data);
    });
  };

  const onSend = async (e, i) => {
    e.preventDefault();
    const newArr = property.employee;
    function pushToArray() {
      const index = newArr.findIndex((e) => e._id === user._id);
      if (index === -1) {
        // TODO const item = 
        //TODOMAY WANT TO CHECK THIS OUT
        newArr.unshift(user);
        console.log( "new item");
      } else {
        console.log("matched", index, newArr[index]);
        const updatedArr = newArr[index].cleaning;
        updatedArr.push(user.cleaning[0]);
      }
      setPropertyType({ ...property });
      const updateProp = async () => {
        await API.updateProperty(property._id, property).then((res) => {
          console.log(res);
        });
        // history.push("/home")
      };
      updateProp();
    }
    pushToArray();
  };
  console.log(user, property);


  return (
    <>
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
          {userData.user ? (
            <form className="page-adjustment-property">
              <label htmlFor="property-name">
                Choose the Property (Elija Propiedad):{" "}
              </label>
              <div>
                {state.map((x) => (
                  <div key={x._id}>
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="location"
                          onChange={(e) => setPropertyType({ ...x })}
                        />
                        {x.location}
                      </li>
                    </ul>
                  </div>
                ))}
                {/* <Link to = "/home" > */}
                <button className="cleaning-next" onClick={onSend} >
                  {" "}
                  Next (Próximo)
                </button>
                {/* </Link> */}
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
