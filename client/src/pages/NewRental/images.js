import React, { useState, useRef, useEffect, useMemo } from "react";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import "./preview.css";

function NewRental() {
  const fileInput = useRef();
  const homeInput = useRef();
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    homeImage: "",
    imageUrl: [],
    link: "",
  });

  const [loading, setLoading] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [load, setLoad] = useState(true);
  console.log(rental);
  const params = useParams();

  useEffect(async () => {
    console.log(params);
    await loadPropertyInfo();
    setLoading(false);
    setLoad(false);
  }, []);

  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    console.log(file, fileInput);
    let fileName = fileInput.current.files[0].name;
    let imgType = fileInput.current.files[0].type;
  }
  function onHomeUpload(e) {
    e.preventDefault();
    let fileHome = fileInput.current.files[0];
    console.log(fileHome, fileInput);
    // let fileNameHome = fileInput.current.files[0].name;
    // let imgTypeHome = fileInput.current.files[0].type;
  }
  const loadPropertyInfo = () => {
    if (params.id) {
      API.getProperties(params.id)
        .then((res) => setRental(res.data))
        //  console.log(res.data)
        .catch((err) => console.log(err));
      setLoad(false);
    } else if (params.location) {
      API.getPropertiesByName(params.location)
        .then((res) => setRental(res.data[0]))
        // console.log(res)

        .catch((err) => console.log(err));
      // setLoad(false)
    }

    // API.getPropertiesByName(params.location)
    //   .then((res) => setRental(res.data[0]))
    //   .catch((err) => console.log(err));
  };

  const onSend = (e) => {
    setLoading(true);
    e.preventDefault();
    const file = fileInput.current.files[0];
    setRental({ ...file });
    const formData = new FormData();
    formData.append("fileinfo", file);
    //sending file info to Cloudinary to receive the links
    API.sendToCloud(formData).then((res) => {
      console.log("ready to update image links");
      const imgLink = res.data.payload[0].secure_url;
      const newArr = rental.imageUrl;
      //slice(0) kept getting rejected, so i kept it as is and pushed the next link into the new array
      newArr.push(imgLink);
      // console.log(newArr);
      //created a new async function here to await the response from the new link for the new array
      setLoading(false);
      const startUpdate = async () => {
        await API.updateProperty(rental._id, rental)
          .then((res) => {
            //THEN I updated state
            setRental({ ...rental, imageUrl: newArr });
            console.log(rental);
          })
          .catch((err) => {
            throw err;
          });
      };
      startUpdate();
    });
  };
  const homeImageFunc = async (e) => {
    setLoadingPhoto(true);
    e.preventDefault();
    console.log(fileInput);
    const fileHome = fileInput.current.files[0];
    console.log(fileHome);
    setRental({ ...fileHome });
    const formDataHome = new FormData();
    formDataHome.append("homeinfo", fileHome);
    console.log(formDataHome);
    //sending file info to Cloudinary to receive the links
    API.sendToCloud(formDataHome).then((res) => {
      console.log("ready to update image links");
      setLoadingPhoto(true);
      const homeImgLink = res.data.payload[0].secure_url;
      setLoadingPhoto(false);
      const homeImg = homeImgLink;
      console.log(homeImg);
      // setRental({ ...rental, homeImage: homeImgLink });
      const homeUpdate = async () => {
        // setRental({ ...rental, homeImage: homeImg });
       API.updateProperty(rental._id, rental)
          .then((res) => {
            // THEN I updated state
            setRental( {homeImage: homeImg });
            // console.log(res)
          })
          .catch((err) => {
            throw err;
          });
          // console.log(res);
        };
        // console.log(rental)
        homeUpdate();
    });
    console.log(rental)
  };

  return (
    <>
      {load === false && (
        <div className="container">
          <div className="new-page-form">
            <form encType="multipart/form-data" method="put" name="fileinfo">
              <h2 className="row">Choose Photos</h2>
              <input
                className="row"
                id="file-upload-button"
                type="file"
                name="image"
                ref={fileInput}
                onChange={onUpload}
              />
              {/* </form>
        <form> */}
              <button
                className="row"
                type="submit"
                onClick={onSend}
                value="Submit"
              >
                Upload
              </button>
              {loadingPhoto === false && (
                <div className="row">
                  {" "}
                  Photo has been uploaded, click "Choose File" again to upload
                  another
                </div>
              )}
              {loadingPhoto === true && <div className="row"> waiting..... </div>}
            </form>
            <form encType="multipart/form-data" method="put" name="homeinfo">
              <h2 className="row">Choose Home Photo</h2>
              <input
                className="row"
                id="file-upload-button"
                type="file"
                name="homeImage"
                ref={homeInput}
                onChange={onHomeUpload}
              />
              {/* </form>
        <form> */}
              <button
                className="row"
                type="submit"
                onClick={homeImageFunc}
                value="Submit"
              >
                Upload
              </button>
              {loading === false && (
                <div className="row"> Home Page Photo has been Uploaded</div>
              )}
              {loading === true && <div className="row"> waiting..... </div>}
            </form>
            <div>
              <div>
                <Link to={"/preview/" + rental._id}>
                  <button className="row"> I am done uploading photos </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewRental;
