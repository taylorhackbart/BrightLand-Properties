import React, { useState, useRef, useEffect, useMemo } from "react";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import "./preview.css";
import FileInput from "../../components/FileInput";
// const noop = () => {}
function homeImage() {
  const fileInput = useRef();
  const homeInput = useRef();
  const [rental, setRental] = useState({
    // location: "",
    // description: "",
    // activities: "",
    // homeImage: [],
    // imageUrl: [],
    // link: "",
  });
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  // console.log(rental);
  const params = useParams();

  useEffect(async () => {
    await loadPropertyInfo();
    // setLoading(false);
    setLoad(false);
    // setLoadingPhoto(false)
    // console.log(params, rental);
  }, [params]);

  const loadPropertyInfo = async () => {
    if (params.id) {
      await API.getProperties(params.id)
        .then(
          (res) => 
          setRental(res.data)
          // console.log(res.data.homeImage)
          )
        .catch((err) => console.log(err));
    } 
  };

  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    // setRental({ ...rental });
    // console.log(file, rental.homeImage, rental)
    // console.log(file, fileInput);
    // let fileName = fileInput.current.files[0].name;
    // let imgType = fileInput.current.files[0].type;
  }
  const onSend = (e) => {
    setLoading(true);
    e.preventDefault();
    const file = fileInput.current.files[0];
    setRental({ ...rental, homeImage:file });
    const formData = new FormData();
    formData.append("fileinfo", file);
    //sending file info to Cloudinary to receive the links
    API.sendToCloud(formData).then((res) => {
      console.log("ready to update image links");
      const imgLink = res.data.payload[0].secure_url;
      const newArr = rental.homeImage;
      newArr.push(imgLink);
      console.log(newArr, imgLink, rental)
      // setRental({ ...rental});
      //slice(0) kept getting rejected, so i kept it as is and pushed the next link into the new array
      //created a new async function here to await the response from the new link for the new array
      setLoading(false);
      // let newPush = {imageUrl: newArr}
      // console.log(newPush)
      // setRental({...rental, homeImage: newArr });
      const startUpdate = async () => {
        await API.updateProperty(rental._id, rental)
          .then((res) => {
            setRental({ ...rental, homeImage: newArr });
            console.log(rental, res)
            //THEN I updated state
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      startUpdate();
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

export default homeImage;
