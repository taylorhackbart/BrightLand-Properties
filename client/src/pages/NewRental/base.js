import React, {useState} from "react"
import API from "../../utils/API"
import { Link } from "react-router-dom";
import "./preview.css"

function Base() {
  const [rental, setRental] = useState([])
  const [state, setState] = useState({
    location: "",
    description: "",
    activities: "",
    imageUrl: []
  })


 const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value })
  };
 const onSubmit = () => {
   API.saveProperty(state)
  //  .then(resp => {
  //   const userArr = rental.slice(0);
  //   userArr.push(resp.data);
  //   console.log(resp.data);
  //   setRental(userArr);
  // })
  // .catch((err) => {
  //   throw err;
  // });
 }

  return (
    <div className="container">
    <form className="new-page-form">
      
  <p className="row">   Name or Location of New Rental </p>
  <input type="text" name="location" className="row" onChange={handleInputChange} />
  
  <p className="row" > "The Space" Description </p>
  <textarea type="text" name="description" className="row input-description" onChange={handleInputChange}  />

  <p className="row">  "Activities" Description </p>
  <textarea type="text" name="activities" className="row input-description" onChange={handleInputChange}  />

  <p className="row"> AirBnb Link: </p>
  <input type="text" name="link" className="row" onChange={handleInputChange}  />

  <Link to={"/images/name/" + state.location}>
  <button className="row"onClick={onSubmit}>Submit</button>
  </Link>
    </form>
    </div>
  );
}

export default Base;