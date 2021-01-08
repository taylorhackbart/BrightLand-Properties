import React, {useState, useEffect} from "react"
import { List, ListItem } from "../../components/List";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
function previewPhotos () {
  const [loading, setLoading] = useState(true)
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    imageUrl: [],
  })
  const params = useParams();

  useEffect(  () => {
    // if (params.id) {
    //   API.getProperties(params.id)
    //     .then((res) => 
    //     setRental(res.data))
    //     .catch((err) => console.log(err));
    // } else if (params.name) {
    //   API.getUserByName(params.name)
    //     .then((res) => 
    //       setRental(res.data[0]))
    //     .catch((err) => console.log(err));
    // }
    loadImages()
  }, []);

const loadImages = async () => {
  try {
    setLoading(true)
  const rental = await API.getProperties(params.id)
    .then((res) => 
    setRental(res.data) )
  } catch  (err) 
    {
console.log(err)
    } finally {
      setLoading(false)
    }
  }


  
  return (
    <>

    {rental.imageUrl.map(img => (
      <List key={img.imageUrl} >
        <ListItem key={img.imageUrl} >
          <img 
          src={img.imageUrl} 
          alt="..."
          style= { loading ? {display: "none"} : {display: "block"} }
          onChange={loadImages}
          ></img>
        </ListItem>



    </List>
    ))}
    

    </>
  )
  } 

export default previewPhotos;