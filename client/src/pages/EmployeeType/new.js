import React from "react"

function NewJob(){

  return(
    <>
    <form>
    Enter a Name for the New Job:
    <input type="text" value="newJob" />
    Enter a Description for the Job:
    <input type="text" value="jobDescription" />
    Enter a Pay Amount:
    <input type="number" value="pay" />
    </form>
    </>
  )
}

export default NewJob;