import React, {
  useState,
  useContext,
  useEffect,
  useRef
} from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useParams, useHistory, Link } from "react-router-dom";
import "./clean.css";
import NoMatch from "../NoMatch";


function StartClean() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const [state, setState] = useState({});
  const params = useParams();
  const [load, setLoad] = useState(true);

  useEffect(async () => {
    await loadUserInfo();
    setLoading(false);
    setLoad(false);
  }, []);

  const loadUserInfo = async () => {
    await API.getUserById(params.id).then((res) => {
      console.log(res.data)
      setState(res.data.cleaning);
      setRental(res.data);
    });
  };
console.log(state, rental)
  const submitForm = async () => {
    const newArr = new Array()
    newArr.unshift(state);
    console.log(newArr)
    setRental({ ...rental, cleaning: newArr });
    // await API.updateUser(rental._id, rental)
    //   .then((res) => {
    //     console.log(res, state);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental({ ...rental, [name]: value });
  };
  return (
    <>
      {loading === false && (
        <div className="new-form-element">
          <UserContext.Provider value={{ userData }}>
            {userData.user ? (
              <>
                <div className="page-adjustment">
                  <h2 className="cleaning-title row">
                    Enter Cleaning Details (Ingrese los Detalles de Limpieza):
                  </h2>
                  <div className="container">
                    <div className="row">
                      Enter Your Name (Introduzca su Nombre):
                    </div>
                    <div className="row">
                      <input onChange={handleChange} type="text" name="name" />
                    </div>
                    <div className="row">
                      Time Finished Cleaning (HH : MM ):
                    </div>
                    <div className="row">
                      ( Hora en que se Completó la Limpieza (HH: MM) ) :
                    </div>
                    <div className="row">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="stopClean"
                      />
                    </div>
                    <div className="row">
                      Enter any notes necessary (Ingresar Notas de Limpieza):
                    </div>
                    <div className="row">
                      <textarea
                        name="notes"
                        onChange={handleChange}
                        className="notes-area"
                        type="text"
                      />{" "}
                    </div>

                    {load === false && (
                      // <Link to={"/addPhotos/" + rental._id}>
                      <>
                        <button
                          className="cleaning-submit"
                          onClick={submitForm}
                        >
                          {" "}
                          Submit (Enviar)
                        </button>
                        </>
                      // </Link> 
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <NoMatch />
              </div>
            )}
          </UserContext.Provider>
        </div>
      )}
    </>
  );
}
export default StartClean;
