import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import "./clean.css";

function Cleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [property, setPropertyType] = useState({
    property: "",
    startClean: Date,
    images: [],
    notes: "",
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPropertyType({ ...property, [name]: value });
  };
  const onSend = (e) => {
    e.preventDefault();

    API.saveCleaning(property).then((res) => {
      console.log(res);
      const id = res.data._id;
      const loadPropertyInfo = async () => {
        await API.getCleaningById(id, property).then((res) => {
          console.log(res);
          setPropertyType(res.data);
        });
      };
      loadPropertyInfo();
      history.push("/startclean/" + id);
    });
  };
  console.log(property);

  return (
    <>
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
          <form>
            <div className="row">
              <label htmlFor="property-name">Choose the Property (Elija Propiedad): </label>
            </div>
            <div className="row">
              <ul>
                <li>
                  <input
                    id="property-bend"
                    type="radio"
                    onChange={handleChange}
                    value="bend"
                    name="property"
                  />{" "}
                  Bend
                </li>
                <li>
                  <input
                    id="property-cabo"
                    type="radio"
                    onChange={handleChange}
                    value="cabo"
                    name="property"
                  />{" "}
                  Cabo
                </li>
                <li>
                  <input
                    id="property-camping"
                    type="radio"
                    onChange={handleChange}
                    value="camping"
                    name="property"
                  />{" "}
                  Camping
                </li>
                <li>
                  <input
                    id="property-cerritos"
                    type="radio"
                    onChange={handleChange}
                    value="losCerritos"
                    name="property"
                  />{" "}
                  Los Cerritos
                </li>
                <li>
                  <input
                    id="property-indianpalms"
                    type="radio"
                    onChange={handleChange}
                    value="indianPalms"
                    name="property"
                  />{" "}
                  Indian Palms
                </li>
                <li>
                  <input
                    id="property-indio"
                    type="radio"
                    onChange={handleChange}
                    value="indio"
                    name="property"
                  />{" "}
                  Indio
                </li>
                <li>
                  <input
                    id="property-lapine"
                    type="radio"
                    onChange={handleChange}
                    value="lapine"
                    name="property"
                  />{" "}
                  La Pine
                </li>
                <li>
                  <input
                    id="property-mthood"
                    type="radio"
                    onChange={handleChange}
                    value="mtHood"
                    name="property"
                  />{" "}
                  Mt Hood
                </li>
                <li>
                  <input
                    id="property-portland"
                    type="radio"
                    onChange={handleChange}
                    value="portland"
                    name="property"
                  />{" "}
                  Portland
                </li>
                <button className="cleaning-next" onClick={onSend}>
                  {" "}
                  Next (Próximo)
                </button>
              </ul>
            </div>
          </form>
        </UserContext.Provider>
      )}
    </>
  );
}
export default Cleaning;
