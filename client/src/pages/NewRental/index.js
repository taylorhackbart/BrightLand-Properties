import React, {useState, useRef, useEffect} from "react"
import {useForm} from "react-hook-form"
// import Base from "./base.js"
import API from "../../utils/API"



function NewRental () {
  const fileInput = useRef()
  const [state, setState] = useState({
    location: "",
    description: "",
    activities: "",
    link: "",
    imageUrl: "",
  })
  // const {register, handleSubmit} = useForm()
  const [rental, setRental] = useState([])

  // useEffect(() => {
  //   getImage();

  // }, [])

  function onUpload(e) {
    e.preventDefault()
    let img = fileInput.current.files[0];
    let imgName = fileInput.current.files[0].name
    let imgType = fileInput.current.files[0].type
  }


const onSubmit = () => {
  const file= fileInput.current.files[0];
  setRental({...file})
  const formData = new FormData()
  formData.append("fileinfo", file)
  console.log(formData)
  API.sendToCloud(formData)
  .then(res => {
    console.log(res.data.payload[0].secure_url)
    const imgLink = res.data.payload[0].secure_url
setState({
        ...state,
        imageUrl: res.data.payload[0].secure_url
    })
  API.saveProperty(state)
  })
  
}

function handleInputChange(event) {
  const { name, value } = event.target;
  setState({ ...state, [name]: value })
};

// const handleFormData = () => {
//    API.saveProperty({
//     location: state.location,
//     description: state.description,
//     activities: state.activities,
//     link: state.link,
//     imageUrl: state.imageUrl,
//   })
//   .then(resp => {
//     console.log(resp)
//   })
// }



return(
<>
<div >
  Name or Location of New Rental
  <input type="text" name="location" onChange={handleInputChange} value={state.location}/>
  "The Space" Description 
  <input type="text" name="description" onChange={handleInputChange} value={state.description} />
  "Activities" Description
  <input type="text" name="activities" onChange={handleInputChange} value={state.activities} />
  Upload Images

  <form encType="multipart/form-data" method="post" name="fileinfo" onSubmit={onSubmit}>
            <label>Upload</label>
            <input type="file" name="image" onChange={onUpload} ref={fileInput} />

          </form>
  <button type="submit" onClick={onSubmit} value="Submit">Submit</button>

</div>
</>

  )
}

export default NewRental;