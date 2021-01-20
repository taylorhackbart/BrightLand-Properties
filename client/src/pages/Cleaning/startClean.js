import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useParams, Link } from "react-router-dom";
import "./clean.css";

function StartClean() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    property: "",
    images: [],
    stopClean: "",
    notes: ""
  });
  const fileInput = useRef();
  const params = useParams();
  const [load, setLoad] = useState(true);
  // console.log(params)
  useEffect(async () => {
    setLoading(false);
    await loadPropertyInfo();
  }, []);

  const loadPropertyInfo = () => {
    API.getCleaningById(params.id, state).then((res) => {
      // console.log(res);
      setState(res.data);
    });
  };
  const stopClean = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let fileName = fileInput.current.files[0].name;
    let imgType = fileInput.current.files[0].type;
  }
  const onSend = (e) => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    setState({ ...file });
    const formData = new FormData();
    formData.append("fileinfo", file);
    //sending file info to Cloudinary to receive the links
    API.sendToCloud(formData).then((res) => {
      console.log("ready to update image links");
      const imgLink = res.data.payload[0].secure_url;
      const newArr = state.images;
      //slice(0) kept getting rejected, so i kept it as is and pushed the next link into the new array
      newArr.push(imgLink);
      // console.log(newArr);
      //created a new async function here to await the response from the new link for the new array
      setLoad(false);
      const startUpdate = async () => {
        await API.updateCleaning(state._id, state)
          .then((res) => {
            //THEN I updated state
            setState({ ...state, images: newArr });
            // console.log(res);
          })
          .catch((err) => {
            throw err;
          });
      };
      startUpdate();
    });
  };

  const submitForm = () => {
    API.updateCleaning(state._id, state).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      {loading === false && (
        <div className="new-form-element">
          <UserContext.Provider value={{ userData }}>
            <h2 className="cleaning-title row">
              Enter Cleaning Details (Ingrese los Detalles de Limpieza):
            </h2>
            <div className="container">
              <div className="row">Time Finished Cleaning (HH : MM ):</div>
              <div className="row">
                ( Hora en que se Completó la Limpieza (HH: MM) ) :
              </div>
              <div className="row">
                <input onChange={stopClean} type="text" name="stopClean" />
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
                  {load === true && <div> Waiting ( Esperando)..... </div>}
                </div>
              </div>
              <div className="row">
                Enter any notes necessary (Ingresar Notas de Limpieza):
              </div>
              <div className="row">
                <input nChange={stopClean} className="notes-area" type="text" name="notes" />{" "}
              </div>
              <div className="row"></div>
              <Link to= {"/previewclean/" + state._id} >
              <button className="cleaning-submit" onClick={submitForm}>
                {" "}
                Submit (Enviar)
              </button>
              </Link>
            </div>
          </UserContext.Provider>
        </div>
      )}
    </>
  );
}
export default StartClean;
