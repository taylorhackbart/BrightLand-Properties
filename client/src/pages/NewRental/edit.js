import React, { useState, useEffect, useContext } from "react";
import API from "../../utils/API";
import { Link, useParams, useHistory } from "react-router-dom";
import "./edit.css";
import NoMatch from "../NoMatch";
import UserContext from "../../contexts/UserContext";

function Edit() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const params = useParams();
  const [done, setDone] = useState(false);
  const [startDelete, setStartDelete] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    await loadRental();
  }, []);

  const loadRental = () => {
    API.getProperties(params.id).then((res) => {
      setRental(res.data);
      // console.log(res);
      setLoading(false);
    });
  };
  // console.log(rental)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRental({ ...rental, [name]: value });
    // console.log(e.target.value, e.target.name);
  };
  const onSave = () => {
    API.updateProperty(rental._id, rental).then((res) => {
      console.log(res);
      setDone(true);
    });
  };
  // console.log(rental);
  const confirmDelete = (e) => {
    // console.log(e.target);
    setStartDelete(true);
  };
  const deleteProperty = () => {
    API.deleteProperty(rental._id);
    history.push("/manage");
  };
  return (
    <div>
      {loading == false && (
        <>
          {userData.user ? (
            <div className="container edit-contain">
              <div className="row edit-row">
                <h6> LOCATION: </h6>
              </div>
              <div>
                <textarea
                  className="location-input"
                  name="location"
                  defaultValue={rental.location}
                  onChange={handleChange}
                />
              </div>
              <br/>
              <br/>
              <br/>
              <div className="row edit-row">
                <h6 > BED COUNT (number): </h6>
              </div>
              <div >
                <label for="multiInput">
                  <textarea
                    // id="multiInput"
                    className="bed-input"
                    name="bedCount"
                    defaultValue={rental.bedCount}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="row edit-row">
                <h6>BATH COUNT (number): </h6>
              </div>
              <div>
                <label for="multiLineInput">
                  <textarea
                    // id="multiLineInput"
                    className="bath-input"
                    name="bathCount"
                    defaultValue={rental.bathCount}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="row edit-row">
                <h6> DESCRIPTION: </h6>
              </div>
              <div>
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
                </label>
              </div>
              <div className="row edit-row">
                <h6>ACTIVITIES: </h6>
              </div>
              <div>
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
                </label>
              </div>
              <div className="row edit-row">
                <h6> SPANISH DESCRIPTION TRANSLATION: </h6>
              </div>
              <div>
                <label for="multiInput">
                  <textarea
                    rows="12"
                    cols="50"
                    id="multiInput"
                    className="description-input"
                    name="descriptionSpan"
                    defaultValue={rental.descriptionSpan}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="row edit-row">
                <h6>SPANISH ACTIVITIES TRANSLATION: </h6>
              </div>
              <div>
                <label for="multiLineInput">
                  <textarea
                    rows="12"
                    cols="50"
                    id="multiLineInput"
                    className="activities-input"
                    name="activitiesSpan"
                    defaultValue={rental.activitiesSpan}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="row edit-row">
                <h6> LINK: </h6>
              </div>
              <div>
                <textarea
                  className="link-input"
                  name="link"
                  defaultValue={rental.link}
                  onChange={handleChange}
                />
              </div>
              <div className="row" style={{marginTop: "15%"}}>
              {startDelete === false && (
                <>
                  <button className="delete-property" onClick={confirmDelete}>
                    DELETE THIS PROPERTY
                  </button>
                  <button
                    style={{ display: "none", float: "left" }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                  <button style={{ display: "none" }}> Cancel </button>
                </>
              )}
              {startDelete === true && (
                <>
                  <button
                    className="delete-property"
                    style={{ display: "none" }}
                    onClick={confirmDelete}
                  >
                    X
                  </button>
                  <button onClick={deleteProperty}> Delete </button>
                  <button onClick={(e) => setStartDelete(false)}>
                    {" "}
                    Cancel{" "}
                  </button>
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
              </div>
            </div>
          ) : (
            <>
              <NoMatch />
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Edit;
