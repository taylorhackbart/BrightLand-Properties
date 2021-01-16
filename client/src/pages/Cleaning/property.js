import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useHistory } from "react-router-dom";

function Cleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
 const history = useHistory()
  const [property, setPropertyType] = useState({
    property: "",
    startClean: Date,
    images: [],
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
     e.preventDefault()

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
      history.push("/startclean/" + id)
    });
  };
  console.log(property);

  return (
    <>
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
          <form>
            <label htmlFor="property-name">Property Name: </label>
            <input
              id="property-bend"
              type="radio"
              onChange={handleChange}
              value="bend"
              name="property"
            />{" "}
            Bend
            <input
              id="property-cabo"
              type="radio"
              onChange={handleChange}
              value="cabo"
              name="property"
            />{" "}
            Cabo
            <input
              id="property-camping"
              type="radio"
              onChange={handleChange}
              value="camping"
              name="property"
            />{" "}
            Camping
            <input
              id="property-cerritos"
              type="radio"
              onChange={handleChange}
              value="losCerritos"
              name="property"
            />{" "}
            Los Cerritos
            <input
              id="property-indianpalms"
              type="radio"
              onChange={handleChange}
              value="indianPalms"
              name="property"
            />{" "}
            Indian Palms
            <input
              id="property-indio"
              type="radio"
              onChange={handleChange}
              value="indio"
              name="property"
            />{" "}
            Indio
            <input
              id="property-lapine"
              type="radio"
              onChange={handleChange}
              value="lapine"
              name="property"
            />{" "}
            La Pine
            <input
              id="property-mthood"
              type="radio"
              onChange={handleChange}
              value="mtHood"
              name="property"
            />{" "}
            Mt Hood
            <input
              id="property-portland"
              type="radio"
              onChange={handleChange}
              value="portland"
              name="property"
            />{" "}
            Portland 
            <button onClick={onSend}> Next
            {/* {load === false && (
              <Link to={"/startclean/" + property._id}>
                Next 
              </Link>
            )} */}
            </button>
          </form>
        </UserContext.Provider>
      )}
    </>
  );
}
export default Cleaning;
