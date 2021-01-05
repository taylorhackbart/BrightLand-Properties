import React, {useState} from "react"
import ImageUpload from "../../components/ImageUpload"

function NewRental () {
// const [image, setImage] = useState();


return(
<>
<form>
  Name or Location of New Rental
  <input type="text" value="name" />
  "The Space" Description 
  <input type="text" value="space" />
  "Activities" Description
  <input type="text" value="activities" />
  Upload Images
  <input type="file" value="images" />
</form>
</>

  )
}

export default NewRental;