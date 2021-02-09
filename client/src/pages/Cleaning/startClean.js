import React, { useState, useContext, useEffect, useRef } from "react";
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
  const [newArr, setNewArr] = useState({});
  const params = useParams();
  const [load, setLoad] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(async () => {
    await loadUserInfo();
    setLoading(false);
    setLoad(false);
  }, []);

  const loadUserInfo = async () => {
    await API.getUserById(params.id).then((res) => {
      console.log(res.data);
      setState(res.data.cleaning);
      setRental(res.data);
    });
  };
  console.log(state, rental);

  const onSave = async () => {
    const updatedArr = state;
    updatedArr.unshift(newArr);
    console.log(newArr, updatedArr);
    setRental({ ...rental });

    setDone(true);
  };
  const submitForm = () => {
    API.updateUser(rental._id, rental).then((res) => {
      console.log(res);
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArr({ ...newArr, [name]: value });
  };
  return (
    <>
      {loading === false && (
        <div className="new-form-element">
          <UserContext.Provider value={{ userData }}>
            {userData.user ? (
              <>
                <div className="page-adjustment">
                  <div className="cleaning-container">
                  <h2 className="cleaning-title row cleaning-row">
                    Enter Cleaning Details (Ingrese los Detalles de Limpieza):
                  </h2>
                    <div className="row cleaning-row">
                      Enter Your Name (Introduzca su Nombre):
                    </div>
                    <div className="row cleaning-row">
                      <input onChange={handleChange} type="text" name="name" />
                    </div>
                    <div className="row cleaning-row">
                      Time Finished Cleaning (HH : MM ):
                    </div>
                    <div className="row cleaning-row">
                      ( Hora en que se Completó la Limpieza (HH: MM) ) :
                    </div>
                    <div className="row cleaning-row">
                      <input
                        onChange={handleChange}
                        type="text"
                        name="stopClean"
                      />
                    </div>
                    <div className="row cleaning-row">
                      Enter any notes necessary (Ingresar Notas de Limpieza):
                    </div>
                    <div className="row cleaning-row">
                      <textarea
                        name="notes"
                        onChange={handleChange}
                        className="notes-area"
                        type="text"
                      />{" "}
                    </div>

                    </div>
                    {load === false && (
                      <>
                        {done === false && (
                          <div className="row cleaning-row">
                            <button
                              className="cleaning-submit"
                              onClick={onSave}
                            >
                              {" "}
                              Save
                            </button>
                            <button
                              className="cleaning-submit"
                              style={{ display: "none" }}
                            >
                              {" "}
                              Submit (Enviar)
                            </button>
                          </div>
                        )}
                        {done === true && (
                          < div className="row cleaning-row">
                            <button
                              style={{ display: "none" }}
                              className="cleaning-submit"
                            >
                              {" "}
                              Save
                            </button>
                            <Link to={"/addPhotos/" + rental._id}>
                              <button
                                className="cleaning-submit"
                                onClick={submitForm}
                              >
                                {" "}
                                Submit (Enviar)
                              </button>
                            </Link>
                          </div>
                        )}
                      </>
                    )}
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
