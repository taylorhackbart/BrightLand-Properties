import React, { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import "./preview.css"

function NewRental() {
  const fileInput = useRef();
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    imageUrl: [],
  });
  const [loading, setLoading] = useState(true)
  // const [state, setState] = useState("");

  const params = useParams();

  useEffect(async () => {
    await loadPropertyInfo();
    setLoading(true)
  }, [params]);

  function onUpload(e) {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let fileName = fileInput.current.files[0].name;
    let imgType = fileInput.current.files[0].type;
  }
  const loadPropertyInfo = () => {
    API.getPropertiesByName(params.location)
      .then((res) => setRental(res.data[0]))
      .catch((err) => console.log(err));
  };

  const onSend = (e) => {
    setLoading(true)
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
      setLoading(false)
      const startUpdate = async () => {
        await API.updateProperty(rental._id, rental)
          .then((res) => {
            //THEN I updated state
            setRental({ ...rental, imageUrl: newArr });
            console.log(res);
          })
          .catch((err) => {
            throw err;
          });
      };
      startUpdate();
    });
  };

 

  return (
    <>
      <div className="container">
        <div className="new-page-form">
        <form encType="multipart/form-data" method="put" name="fileinfo">
          <h2 className="row">Choose Photos</h2>
          <input className="row" id="file-upload-button" type="file" name="image" ref={fileInput} onChange={onUpload} />
        </form>
        <form>
          <button className="row" type="submit" onClick={onSend} value="Submit">
            Upload
          </button>
          { loading === false &&
            <div className="row"> Photo has been uploaded, click "Choose File" again to upload another</div>
            } 
            { loading === true && 
              <div className="row"> waiting..... </div>
            
            }
          
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
    </>
  );
}

export default NewRental;
