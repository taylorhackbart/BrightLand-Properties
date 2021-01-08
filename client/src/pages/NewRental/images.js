import React, { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import { List, ListItem } from "../../components/List";

function NewRental() {
  const fileInput = useRef();
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    imageUrl: [],
  });
  // const [state, setState] = useState("");

  const params = useParams();

  useEffect(async () => {
    await loadPropertyInfo();
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
    e.preventDefault()
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
      // showPhotos();
    });
  };

  // const showPhotos = () => {
  //   API.getPropertiesByName(params.location).then((res) => console.log(res));
  // };
  // const delPhoto = (e) => {
  //   var newArr = rental.imageUrl.filter((id) => {return e.target.id !== id._id});
  //   setRental({ ...rental, imageUrl: newArr });
  //   API.updateProperty(rental._id, rental)
  //     .then((res) => console.log(res))
  //     .catch((err) => { throw err });
  // };

  return (
    <>
      <div>
        <form encType="multipart/form-data" method="put" name="fileinfo">
          <label>Choose Photos</label>
          <input type="file" name="image" ref={fileInput} onChange={onUpload} />
        </form>
        <form>
          <button type="submit" onClick={onSend} value="Submit">
            Upload
          </button>
          
          {/* <div onChange={showPhotos}>{rental.imageUrl.length} photos have been uploaded</div> */}


        </form>
      </div>
      <div>
        {/* <div>
          <Link to={"/preview/" + rental._id} >
          <button> I am done uploading photos </button>

          </Link>
        </div> */}
        {/* <List key={rental.imageUrl}>
          <ListItem>
            <img src={rental.imageUrl[0]} alt="..."></img>
            <button
                      className="delete-button"
                      id={rental._id}
                      onClick={delPhoto}
                    >
                      X
                    </button>
          </ListItem>
          <ListItem>
            <img src={rental.imageUrl[1]} alt="..."></img>
            <button
                      className="delete-button"
                      id={rental._id}
                      onClick={delPhoto}
                    >
                      X
                    </button>
          </ListItem>
          <ListItem>
            <img src={rental.imageUrl[2]} alt="..."></img>
            <button
                      className="delete-button"
                      id={rental._id}
                      onClick={delPhoto}
                    >
                      X
                    </button>
          </ListItem>
        </List> */}
      </div>
    </>
  );
}

export default NewRental;
