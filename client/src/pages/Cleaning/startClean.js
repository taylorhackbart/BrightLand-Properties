import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useParams, useHistory } from "react-router-dom";
import "./clean.css";
import NoMatch from "../NoMatch";

function StartClean() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const [img, setImg] = useState({})
  const history = useHistory()
  const [state, setState] = useState({});
  const fileInput = useRef();
  const params = useParams();
  const [load, setLoad] = useState(true);

  useEffect(async () => {
    await loadPropertyInfo();
    setLoading(false);
    setLoad(false);
  }, []);
  console.log(rental, state)
  const loadPropertyInfo = async () => {
    await API.getProperties(params.id).then((res) => {
      // console.log(res.data);
      setState(res.data.cleaning[0]);
      setRental(res.data);
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let fileName = fileInput.current.files[0].name;
    let imgType = fileInput.current.files[0].type;
  }
  const onSend = async (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    setState({ ...file });
    const formData = new FormData();
    formData.append("fileinfo", file);
    //sending file info to Cloudinary to receive the links
    setLoad(true);
    await API.sendToCloud(formData).then((res) => {
      console.log("ready to update image links");
      // setState({...state})
      const imgLink = res.data.payload[0].secure_url;
      const newArr = state.images;
      newArr.unshift(imgLink);
      console.log(newArr)
      setState({ ...state});
      console.log(rental,state)
      setLoad(false);
    });
    console.log(state)
  };
  const submitForm = async () => {
    await API.updateProperty(rental._id, rental)
      .then((res) => {
        console.log(res, state);
      })
      .catch((err) => {
        throw err;
      });
      history.push("/previewclean/" + rental._id)
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
                    {/* <div className="row"> */}
                    <form
                      encType="multipart/form-data"
                      method="put"
                      name="fileinfo"
                      // className="row"
                    >
                      <div className="row">
                        <label>Choose Photos (Elegir Fotos): </label>
                      </div>
                      <div className="row">
                        <input
                          id="file-upload-button"
                          type="file"
                          name="image"
                          ref={fileInput}
                          onChange={onUpload}
                          className="row"
                        />
                      </div>
                    </form>
                    {/* </div> */}
                    <div className="row">
                      <div>
                        <button type="submit" onClick={onSend} value="Submit ">
                          Upload (Subir)
                        </button>
                        {load === false && (
                          <div> Photo has been uploaded ( Carga Completa )</div>
                        )}
                        {load === true && (
                          <div> Waiting ( Esperando)..... </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="row">
                    Enter any notes necessary (Ingresar Notas de Limpieza):
                  </div> */}
                    {/* <div className="row">
                    <textarea
                      name="notes"
                      onChange={handleChange}
                      className="notes-area"
                      type="text"
                    />{" "}
                  </div> */}

                    {load === false && (
                      // <Link to={"/previewclean/" + state._id}>
                      <button className="cleaning-submit" onClick={submitForm}>
                        {" "}
                        Submit (Enviar)
                      </button>
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
