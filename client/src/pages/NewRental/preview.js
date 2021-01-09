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
    if (params.id) {
      API.getProperties(params.id)
        .then((res) => 
        setRental({rental: res.data, imageUrl: res.data.imageUrl})
        //  console.log(res.data.imageUrl)
         )
        .catch((err) => console.log(err));
    } else if (params.name) {
      API.getUserByName(params.name)
        .then((res) => 
          setRental(res.data[0]))
        .catch((err) => console.log(err));
    }
    setLoading(false)
    // loadImages()
  }, []);

  
  return (
    <>
    {loading === false && 
    <div> 
    {rental.imageUrl.map(img => (
      <List key={img.imageUrl}>
        <ListItem >
          <img 
          src= {img.imageUrl} 
          alt="..."
          ></img>
        </ListItem>


    </List>
    ))}
    </div>
    
    }
    </>
  )
  } 

export default previewPhotos;