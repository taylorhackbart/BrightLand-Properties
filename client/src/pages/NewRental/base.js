import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./preview.css";

function Base() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({});
  useEffect(async () => {
    setLoading(false);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const onSubmit = async () => {
    //  e.preventDefault()
    await API.saveProperty(state)
      .then((resp) => {
        // const userArr = rental.slice(0);
        // userArr.push(resp.data);
        // console.log(resp.data);
        setState(state);
        console.log(state);
        console.log(resp);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="container">
      <form className="new-page-form">
        <p className="row"> Name or Location of New Rental </p>
        <input
          type="text"
          name="location"
          className="row"
          onChange={handleInputChange}
        />
 <p className="row"> Bed Count </p>
        <input
          type="text"
          name="bedCount"
          className="row"
          onChange={handleInputChange}
        />
         <p className="row"> Bath Count </p>
        <input
          type="text"
          name="bathCount"
          className="row"
          onChange={handleInputChange}
        />
        <p className="row"> "The Space" Description </p>
        <textarea
          type="text"
          name="description"
          className="row input-description"
          onChange={handleInputChange}
        />

        <p className="row"> "Activities" Description </p>
        <textarea
          type="text"
          name="activities"
          className="row input-description"
          onChange={handleInputChange}
        />
         <p className="row"> "The Space" Description(spanish) </p>
        <textarea
          type="text"
          name="descriptionSpan"
          className="row input-description"
          onChange={handleInputChange}
        />

        <p className="row"> "Activities" Description(spanish) </p>
        <textarea
          type="text"
          name="activitiesSpan"
          className="row input-description"
          onChange={handleInputChange}
        />

        <p className="row"> AirBnb Link: </p>
        <input
          type="text"
          name="link"
          className="row"
          onChange={handleInputChange}
        />

        <Link to={"/addmore/name/" + state.location}>
          <button className="row" onClick={onSubmit}>
            Submit
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Base;
