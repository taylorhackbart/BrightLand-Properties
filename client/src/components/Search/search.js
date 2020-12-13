import React, { useState } from "react"
// import API from "../../utils/API"
// import {Input, FormBtn} from "../../components/Form"



function Search(props){
 const [search, setSearch] = useState("")

 const handleInputChange = (e) => {
  //  const {name, value} = e.target
   setSearch(e.target.value)
 }
const resetState = () => {
  setSearch("")
}
 const startSearch = (e) => {
  e.preventDefault()
  props.search(search)
  resetState()

 }
  return(
   <form>
    
   <input 
    onChange={handleInputChange}
    value={search}
    type="text"
    placeholder="Search a City"
   />
   <input
   onClick={startSearch}
   type= "submit"
   value="search"
   />
 
 
   </form>
 )
}
export default Search;