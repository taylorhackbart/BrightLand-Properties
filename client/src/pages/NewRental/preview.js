import React, { useState, useEffect } from "react";
import { List, ListItem } from "../../components/List";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import "./preview.css";

function previewPhotos() {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({
    location: "",
    description: "",
    activities: "",
    imageUrl: [],
  });
  const params = useParams();
  const [images, setImageArr] = useState([]);

  useEffect(() => {
    if (params.id) {
      API.getProperties(params.id)
        .then(
          (res) => setRental(res.data)
          //  console.log(res.data)
        )
        .catch((err) => console.log(err));
    } else if (params.name) {
      API.getUserByName(params.name)
        .then((res) => setRental(res.data[0]))
        .catch((err) => console.log(err));
    }
    setLoading(false);
  }, []);

  const delPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const rentalArray = rental.imageUrl
    const index = rentalArray.indexOf(e.target.value);
    console.log(index)
    if (index !== -1){
      rentalArray.splice(index, 1);
      setRental({ imageUrl: rentalArray });
    }
    console.log(rentalArray)

    const startDelete = async () => {
      await API.updateProperty(rental._id, rental)
      .then((res) => {
        setRental({...rental, imageUrl: rentalArray });
        //THEN I updated state
        console.log(res);
        console.log(rental)
      })
        .catch((err) => {
          throw err;
        });
    };
    startDelete();
  };

  return (
    <>
      {loading === false && (
        <div className="container">
          <div className="row">
            Check out the photos you've uploaded below!
            </div>
            <p className="row"> Delete photos you no longer want</p>
            <div>
              {rental.imageUrl.map((img) => (
                <ul key={img}>
                  <li className="no-border">
                    <button className="del-button" onClick={delPhoto} img={img} value={img}>
                      X
                    </button>
                    
                    <img className="preview-images d-block" src={img} alt="..."></img>
                  </li>
                </ul>
              ))}
            </div>
          {/* </div> */}
          <p className="row"> Look good? </p>
          <Link to={"/Properties/name/" + rental.location}>
            <button className="more-photos row"> Looks good! </button>
          </Link>
          <Link to={"/images/name/" + rental.location}>
            <button className="more-photos row"> I want to add more photos</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default previewPhotos;
