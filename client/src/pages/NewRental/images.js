import React, { useState, useRef, useEffect } from "react";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import "./preview.css";

function NewRental() {
  const fileInput = useRef();
  const homeInput = useRef();
  const [rental, setRental] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [load, setLoad] = useState(true);
  const params = useParams();

  useEffect(async () => {
    await loadPropertyInfo();
    setLoad(false);
  }, [params]);

  const loadPropertyInfo = () => {
    API.getPropertiesByName(params.location)
      .then((res) => setRental(res.data[0]))
      .catch((err) => console.log(err));
  };

  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let fileName = fileInput.current.files[0].name;
    let imgType = fileInput.current.files[0].type;
  }
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
      newArr.push(imgLink);
      setLoading(false);
      const startUpdate = async () => {
        await API.updateProperty(rental._id, rental)
          .then(() => {
            setRental({ ...rental });
          })
          .catch((err) => {
            throw err;
          });
      };
      startUpdate();
    });
  };

  function onHomeUpload(e) {
    e.preventDefault();
    let file = homeInput.current.files[0];
    let fileNameHome = homeInput.current.files[0].name;
    let imgTypeHome = homeInput.current.files[0].type;
  };
  const homeImageFunc = async (e) => {
    setLoadingPhoto(true);
    e.preventDefault();
    const file = homeInput.current.files[0];
    setRental({ ...file });
    const formData = new FormData();
    formData.append("homefile", file);
    console.log(file);
    //sending file info to Cloudinary to receive the links
    API.sendToCloud(formData)
      .then((res) => {
        console.log("ready to update image links");
        const homeImgLink = res.data.payload[0].secure_url;
        const homeArr = rental.homeImage;
        homeArr.push(homeImgLink);
        setLoadingPhoto(false);
        const homeUpdate = async () => {
          await API.updateProperty(rental._id, rental)
            .then((res) => {
              setRental(rental);
              console.log(res, rental._id);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        homeUpdate();
      })
      .catch((err) => {
        throw err;
      });
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

              <button
                className="row"
                type="submit"
                onClick={onSend}
                value="Submit"
              >
                Upload
              </button>
              {loading === false && (
                <div className="row">
                  {" "}
                  Photo has been uploaded, click "Choose File" again to upload
                  another
                </div>
              )}
              {loading === true && <div className="row"> waiting..... </div>}
            </form>

            <form encType="multipart/form-data" method="put" name="homefile">
              <h2 className="row">Choose a Photo for the HomePage</h2>
              <input
                className="row"
                id="file-upload-button"
                type="file"
                name="image"
                ref={homeInput}
                onChange={onHomeUpload}
              />
              <button
                className="row"
                type="submit"
                onClick={homeImageFunc}
                value="Submit"
              >
                Upload
              </button>
              {loadingPhoto === false && (
                <div className="row"> Home Page Photo has been Uploaded</div>
              )}
              {loadingPhoto === true && (
                <div className="row"> waiting..... </div>
              )}
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
