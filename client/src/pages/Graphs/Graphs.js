import React, { useState } from "react"
// import API from "../../utils/API"
// import {Input, FormBtn} from "../../components/Form"
import Search from "../../components/Search"
// const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ddb7dc274b3d157577d5acb1cd78e0a6`

function Graphs(){
//  const [citySearch, setCitySearch] = useState({
//    search: ""
//  })


 const searchCity = (search) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ddb7dc274b3d157577d5acb1cd78e0a6`)
  .then(response => {
    response.json()
    .then(data=>{
      console.log(data.coord)
      const lng = (data.coord.lon)
      const lat = (data.coord.lat)
      fetch(`https://api.ipgeolocation.io/astronomy?apiKey=eaae8bc7476c441fab504887b3a7c3a8&lat=${lat}&long=${lng}`)
      .then(res => {
        res.json()
        .then(newData=> {
          console.log(newData)
        })
      })
    })
  })
 }
  return(
   <div>
   {/* <Input 
    onChange={handleInputChange}
    value={state}
    type="search"
    placeholder="Search a City"
   />
   <FormBtn
   onClick={handleFormSubmit}
   >
   Submit
   </FormBtn>
   Graphs will go here */}
   <Search search={searchCity} />
   </div>
 )
}
export default Graphs;