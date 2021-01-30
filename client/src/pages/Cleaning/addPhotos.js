import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import API from "../../utils/API";
import { useParams, useHistory, Link } from "react-router-dom";
import "./clean.css";
import NoMatch from "../NoMatch";

function AddPhotos() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const [img, setImg] = useState([]);
  const history = useHistory();
  const [state, setState] = useState({});
  const fileInput = useRef();
  const params = useParams();
  const [load, setLoad] = useState(true);

  useEffect(async () => {
    await loadUserInfo();
    setLoading(false);
    setLoad(false);
  }, []);

  console.log(rental, state);

  const loadUserInfo = async () => {
    await API.getUserById(params.id).then((res) => {
      console.log(res.data);
      setState(res.data.cleaning[0]);
      setImg(res.data.cleaning[0].images)
      setRental(res.data);
    });
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
      // const newArr = state.images;
      const newArr = img
      // const newArr = state.cleaning.images;
      newArr.push(imgLink);
      console.log(newArr)
      setLoad(false);
      // setState({ ...state, images: newArr });
    });
    settingState();
    console.log(img);
  };
  const settingState = () => {
    setState({...state, images: img})
  };

  const updateRental = () => {
    const newArr = rental.cleaning;
    newArr.push(state);
    setRental({ ...rental, cleaning: newArr });
  };

  const submitForm = async () => {
    // const newArr = rental.cleaning;
    // newArr.unshift(state);
    // setRental({ ...rental, cleaning: newArr });
    await API.updateUser(rental._id, rental)
      .then((res) => {
        console.log(res, state);
      })
      .catch((err) => {
        throw err;
      });
    // history.push("/previewclean/" + rental._id)
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
                    Upload More Photos (Subir Más Fotos):
                  </h2>
                  <div className="container">
                    <form
                      encType="multipart/form-data"
                      method="put"
                      name="fileinfo"
                    >
                      <div className="row">
                        <label>Choose Photos (Elegir Fotos): </label>
                      </div>
                      <div className="row">
                        <input
                          id="file-upload-button"
                          type="file"
                          name="images"
                          ref={fileInput}
                          onChange={onUpload}
                          className="row"
                        />
                      </div>
                    </form>
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
                    {load === false && (
                      <Link to={"/previewclean/" + rental._id}>
                        <button
                          className="cleaning-submit"
                          onClick={submitForm}
                        >
                          {" "}
                          Submit (Enviar)
                        </button>
                     </Link>
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
export default AddPhotos;
