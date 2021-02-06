import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link, useParams, useHistory } from "react-router-dom";
import "./edit.css";

function Edit() {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const params = useParams();
  const [changeDesc, setChangeDesc] = useState("");
  const [changeAct, setChangeAct] = useState("");
  const [changeLocation, setChangeLocation] = useState("");
  const [changeLink, setChangeLink] = useState("");
  const [done, setDone] = useState(false);
  const [startDelete, setStartDelete] = useState(false);
  const history = useHistory()

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental({ ...rental, [name]: value });
    // console.log(e.target.value, e.target.name);
  }
  const onSave = () => {
    API.updateProperty(rental._id, rental).then((res) => {
      console.log(res);
      setDone(true);
    });
  };
  const confirmDelete = (e) => {
    // console.log(e.target);
    setStartDelete(true)
  };
  const deleteProperty = () => {
    API.deleteProperty(rental._id)
    history.push("/manage")
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
              onChange={handleChange}
            />
            {/* <button className="edit-btn" onClick={saveLocation}> OK </button> */}
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
                onChange={handleChange}
              />
              {/* <button className="edit-btn" onClick={saveDescription}> OK </button> */}
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
                onChange={handleChange}
              />
              {/* <button className="edit-btn" onClick={saveActivities}> OK </button> */}
            </label>
          </div>
          <div className="row edit-row">
            <h3> LINK: </h3>
            <textarea
              className="link-input"
              name="link"
              defaultValue={rental.link}
              onChange={handleChange}
            />
            {/* <button className="edit-btn" onClick={saveLink}> OK </button> */}
          </div>
          {startDelete === false && (
                <>
                  <button className="delete-property" onClick={confirmDelete}>
                    DELETE THIS PROPERTY
                  </button>
                  <button style={{ display: "none" }} 
                  // onClick={deleteProperty}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                  <button style={{ display: "none" }}> Cancel </button>
                </>
              )}
              {startDelete === true && (
                <>
                  <button className="delete-property" style={{ display: "none" }} onClick={confirmDelete}>
                    X
                  </button>
                  <button  
                  onClick={deleteProperty}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                  <button onClick={ ((e) =>  setStartDelete(false))  }> Cancel </button>
                </>
              )}
          {done === false && (
            <>
              <button className="edit-btn" onClick={onSave}>
                {" "}
                DONE{" "}
              </button>
              <a href={"/addmore/" + rental._id}>
                <button className="edit-btn" style={{ display: "none" }}>
                  {" "}
                  NEXT{" "}
                </button>
              </a>
            </>
          )}
          {done === true && (
            <>
              <button
                className="edit-btn"
                onClick={onSave}
                style={{ display: "none" }}
              >
                {" "}
                DONE{" "}
              </button>
              <a href={"/addmore/" + rental._id}>
                <button className="edit-btn"> NEXT </button>
              </a>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Edit;
