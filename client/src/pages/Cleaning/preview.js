import React, { useState, useEffect, useContext } from "react";
import { List, ListItem } from "../../components/List";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import NoMatch from "../NoMatch"
import UserContext from "../../contexts/UserContext";

function previewCleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({
      property: "",
      stopClean: "",
      images: [],
      notes: "",
  });
  const params = useParams();
  // const [images, setImageArr] = useState([]);

  useEffect(() => {
   
      API.getCleaningById(params.id, rental)
        .then(
          (res) => setRental(res.data)
          //  console.log(res.data)
        )
        .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  const delPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const id = e.target.value;
    const newArr = rental.images.filter((newID) => {
      return newID !== id;
    });
    setRental({ ...rental, images: newArr });

    const startDelete = async () => {
      await API.updateCleaning(rental._id, rental)
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
        <UserContext.Provider value={{ userData }}>
        {userData.user ? (
        <div className="container">
          <div className="row">
            Check out the photos you've uploaded below!
            <p> Delete photos you no longer want</p>
            <div>
              {rental.images.map((img) => (
                <List key={img}>
                  <ListItem>
                    <button onClick={delPhoto} img={img} value={img}>
                      X
                    </button>
                    <img className="preview-images d-block w-100 large-rental-photo" src={img} alt="..."></img>
                  </ListItem>
                </List>
              ))}
            </div>
          </div>
          <p> Look good? </p>
          <Link to="/home">
            <button className="to-page"> Looks good! </button>
          </Link>
          <Link to={"/startclean/" + rental._id}>
            <button className="more-photos"> I want to add more photos</button>
          </Link>
        </div>
        ) : (
          <NoMatch />
        )}
        </UserContext.Provider>
      )}
    </>
  );
}

export default previewCleaning;
