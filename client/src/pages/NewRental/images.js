import React, { useState, useRef, useEffect, useMemo } from "react";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import "./preview.css";
import FileInput from "../../components/FileInput";
// const noop = () => {}
function NewRental() {
  const fileInput = useRef();
  const homeInput = useRef();
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    homeImage: [],
    imageUrl: [],
    link: "",
  });
  const [homeFile, setHomeFile] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingPhoto, setLoadingPhoto] = useState(true);
  const [load, setLoad] = useState(true);
  // console.log(rental);
  const params = useParams();

  useEffect(async () => {
    // console.log(params);
    await loadPropertyInfo();
    // setLoading(false);
    setLoad(false);
    // setLoadingPhoto(false)
  }, [params]);
  const loadPropertyInfo = () => {
    API.getPropertiesByName(params.location)
      .then((res) => setRental(res.data[0]))
      // console.log(res)
      .catch((err) => console.log(err));
  };

  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    // console.log(file, fileInput);
    // let fileName = fileInput.current.files[0].name;
    // let imgType = fileInput.current.files[0].type;
  }
  const onSend = (e) => {
    setLoading(true);
    e.preventDefault();
    const file = fileInput.current.files[0];
    // setRental({ ...file });
    const formData = new FormData();
    formData.append("fileinfo", file);
    console.log(file);
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
      // const startUpdate = async () => {
        let newPush = {imageUrl: newArr}
        console.log(newPush)
        //  API.updateProperty(rental._id, rental)
          // .then((res) => {
            //THEN I updated state
            // console.log(res);
      //     })
      //     .catch((err) => {
      //       throw err;
      //     });
      // };
      // startUpdate();
    });
  };
  function onHomeUpload(e) {
    e.preventDefault();
    let file = homeInput.current.files[0];
    // console.log(fileHome, homeInput);
    // let fileNameHome = homeInput.current.files[0].name;
    // let imgTypeHome = homeInput.current.files[0].type;
  }
  const homeImageFunc = async (e) => {
    setLoadingPhoto(true);
    e.preventDefault();
    // console.log(fileInput.current.files);
    const file = homeInput.current.files[0];
    // setRental({ ...file });
    // console.log(rental)
    // const file = fileInput.current.files[0];
    // setRental({ ...file });
    const formData = new FormData();
    formData.append("homefile", file);
    console.log(file);
    //sending file info to Cloudinary to receive the links
    API.sendToCloud(formData).then((res) => {
      console.log("ready to update image links");
      // setRental( {...rental, homeImage: [] });
      // setLoadingPhoto(true);
      // console.log(res);
      const homeImgLink = res.data.payload[0].secure_url;
      // setLoadingPhoto(false);
      // const homeImg = homeImgLink;
      const homeArr = rental.homeImage;
      homeArr.push(homeImgLink);
      console.log(homeArr);
      // const slicedArr = homeArr.slice(0)
      // console.log(slicedArr)
      let newPush = {homeImage: homeArr}
      console.log(newPush)
      setRental({...rental, homeImage: newPush})

      setLoadingPhoto(false);
      // const homeUpdate = () => {
        API.updateProperty(rental._id, rental)
      //     .then((res) => {
      //       // setRental({...rental});
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // };
      
      // homeUpdate();
    })
    .catch((err) => {
      throw err;
    });
  };
  console.log(rental);
  // console.log(homeFile)

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
              {loading === false && (
                <div className="row">
                  {" "}
                  Photo has been uploaded, click "Choose File" again to upload
                  another
                </div>
              )}
              {loading === true && <div className="row"> waiting..... </div>}
            </form>
            {/* <FileInput /> */}

            <form encType="multipart/form-data" method="put" name="homefile">
              <h2 className="row">Choose a Photo for the HomePage</h2>
              {/* <label htmlFor="fileHome-upload-button"> Choose Image </label> */}
              {/* <div className="row">
                <input
                  // className="row"
                  id="file-upload-button"
                  type="file"
                  // key={rental.homeImage || ""}
                  name="image"
                  ref={homeInput}
                  onChange={onHomeUpload}
                />
              </div> */}
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
