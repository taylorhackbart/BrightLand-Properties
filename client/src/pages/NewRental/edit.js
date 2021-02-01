import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link, useParams } from "react-router-dom";
import "./edit.css";

function Edit() {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const params = useParams();
  const [changeDesc, setChangeDesc] = useState("");
  const [changeAct, setChangeAct] = useState("");
  const [changeLocation, setChangeLocation] = useState("");
  const [changeLink, setChangeLink] = useState("");

  useEffect(async () => {
    await loadRental();
  }, []);

  const loadRental = () => {
    API.getProperties(params.id).then((res) => {
      setRental(res.data);
      console.log(res);
      setLoading(false);
    });
  };
  // console.log(rental)
  const saveLocation = () => {
    console.log(changeLocation.target.value);
    setRental({...rental, location: changeLocation.target.value})
    console.log(rental)
  };
  const saveDescription = () => {
    // console.log(changeDesc.target.value);
    setRental({...rental, description: changeDesc.target.value})
    console.log(rental)
  };
  const saveActivities = () => {
    // console.log(changeAct.target.value);
    setRental({...rental, activities: changeAct.target.value})
    console.log(rental)
  };
  const saveLink = () => {
    // console.log(changeLink.target.value);
    setRental({...rental, link: changeLink.target.value})
    console.log(rental)
  };
  const onSave = () => {
    API.updateProperty(rental._id, rental)
    .then(res => {
      console.log(res)
    })
  }
  return (
    <div className="container edit-contain">
      {loading == false && (
        <>
        <div className="row edit-row">
          <h3> LOCATION: </h3>
          <textarea
            className="location-input"
            name="location"
            defaultValue={rental.location}
            onChange={setChangeLocation}
          />
          <button className="edit-btn" onClick={saveLocation}> OK </button>
          </div>
           <div className="row edit-row">
             <h3> DESCRIPTION: </h3>
          <label for="multiInput">
            <textarea
              rows="12"
              cols="50"
              id="multiInput"
              className="description-input"
              name="description"
              defaultValue={rental.description}
              onChange={setChangeDesc}
            />
            <button className="edit-btn" onClick={saveDescription}> OK </button>
          </label>
          </div>
          <div className="row edit-row">
            <h3>ACTIVITIES: </h3> 
          <label for="multiLineInput">
            <textarea
              rows="12"
              cols="50"
              id="multiLineInput"
              className="activities-input"
              name="activities"
              defaultValue={rental.activities}
              onChange={setChangeAct}
            />
            <button className="edit-btn" onClick={saveActivities}> OK </button>
          </label>
          </div>
          <div className="row edit-row">
            <h3> LINK: </h3>
          <textarea
            className="link-input"
            name="link"
            defaultValue={rental.link}
            onChange={setChangeLink}
          />
          <button className="edit-btn" onClick={saveLink}> OK </button>
          </div>
          <button className="edit-btn" onClick={onSave}> DONE </button>
        </>
      )}
    </div>
  );
}
export default Edit;
