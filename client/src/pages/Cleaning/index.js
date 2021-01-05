import React from "react"

function Cleaning () {
  return(
    <>
    <form>
      <input type="radio" name="Bend" /> Bend 
      <input type="radio" name="Cabo" /> Cabo 
      <input type="radio" name="Camping" /> Camping 
      <input type="radio" name="Cerritos" /> Cerritos 
      <input type="radio" name="IndianPalms" /> Indian Palms 
      <input type="radio" name="Indio" /> Indio 
      <input type="radio" name="LaPine" /> La Pine 
      <input type="radio" name="MtHood" /> Mt Hood 
      <input type="radio" name="Portland" /> Portland 
      <button> Start Cleaning </button>
      <button> Complete </button>
    </form>
    <form>
      <input type="files" name="images" /> Upload photos
      <input type="text" name="notes" /> Enter any notes necessary 
    </form>
    Check which rental is being cleaned for accurate cleaning examples
    Potential photos for examples of what clean should look like
    On this page we will be able to upload photos easily from the phone to show manager and owner the status of the cleaning. 
    The job duty will be clear for the employee
    "Begin Cleaning" to show owner that it is being cleaned
    "Completed" button for the owner to check that it has been finished
    </>
  )
}
export default Cleaning;