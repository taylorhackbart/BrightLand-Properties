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
    const id = e.target.value;
    const newArr = rental.imageUrl.filter((newID) => {
      return newID !== id;
    });
    const newArrAgain = newArr.slice(0);
    console.log(newArrAgain);
    setRental({ ...rental, imageUrl: newArr });
    console.log(rental);

    const startDelete = async () => {
      await API.updateProperty(rental._id, rental)
        .then((res) => console.log(res))
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
            <span> Delete photos you no longer want</span>
            <div>
              {rental.imageUrl.map((img) => (
                <List key={img}>
                  <ListItem>
                    <button onClick={delPhoto} img={img} value={img}>
                      X
                    </button>
                    <img className="preview-images" src={img} alt="..."></img>
                  </ListItem>
                </List>
              ))}
            </div>
          </div>
          <p> Look good? </p>
          <Link to={"/Properties/name/" + rental.location}>
            <button className="to-page"> Looks good! </button>
          </Link>
          <Link to={"/images/name/" + rental.location}>
            <button className="more-photos"> I want to add more photos</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default previewPhotos;
