import React, {useState} from "react"
import API from "../../utils/API"
import { Link } from "react-router-dom";

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
    <form>
       Name or Location of New Rental
  <input type="text" name="location" onChange={handleInputChange} />
  "The Space" Description 
  <input type="text" name="description" onChange={handleInputChange}  />
  "Activities" Description
  <input type="text" name="activities" onChange={handleInputChange}  />
  <input type="text" name="link" onChange={handleInputChange}  />
  <Link to={"/images/name/" + state.location}>
  <button onClick={onSubmit}>Submit</button>
  </Link>
    </form>
  );
}

export default Base;