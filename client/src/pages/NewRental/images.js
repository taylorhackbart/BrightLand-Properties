import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

function NewRental() {
  const fileInput = useRef();
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    imageUrl: "",
  });
  const [state, setState] = useState();

  const params = useParams();

  useEffect(async () => {
    await loadPropertyInfo();
  }, [params]);

  function onUpload(e) {
    e.preventDefault()
    let file = fileInput.current.files[0];
    let fileName = fileInput.current.files[0].name
    let imgType = fileInput.current.files[0].type

  }
  const loadPropertyInfo = () => {
    // if (params.id) {
    //    API.getProperties(params.id)
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // } else if (params.location) {
    API.getPropertiesByName(params.location)
      .then((res) => 
      setRental(res.data[0]) 
      
      // console.log(res.data[0])
      ) 
      .catch((err) => console.log(err));
    // }
  };

  const onSend = () => {
    const file = fileInput.current.files[0];
    setRental({ ...file });
    const formData = new FormData();
    formData.append("fileinfo", file);
    API.sendToCloud(formData)
    .then((res) => {
      console.log(res.data.payload[0].secure_url);
      const imgLink = res.data.payload[0].secure_url;
      const newArr = rental.imageUrl;
      newArr.push(imgLink);
      setRental({ ...rental, imageUrl: newArr });
      // console.log(rental)
      API.updateProperty(rental._id, rental)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        throw err;
      });
    });
  };

  // function handleInputChange(event) {
  //   const { name, value } = event.target;
  //   setState({ ...state, [name]: value });
  // }

  return (
    <>
      <div>
        <form encType="multipart/form-data" method="put" name="fileinfo">
          <label>Upload</label>
          <input type="file" name="image" ref={fileInput} onChange={onUpload}/>
        </form>
        <button type="submit" onClick={onSend} value="Submit">
          Submit
        </button>
      </div>
      <div>
        {/* {rental.imageUrl} */}
      </div>
    </>
  );
}

export default NewRental;
