import React, { useState, useEffect, useContext } from "react";
import { List, ListItem } from "../../components/List";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import NoMatch from "../NoMatch";
import UserContext from "../../contexts/UserContext";

function previewCleaning() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const [state, setState] = useState({});
  const [rental, setRental] = useState({});
  const params = useParams();

  useEffect(async () => {
      loadUserInfo();
    setLoad(false);
  }, []);

  const loadUserInfo = async () => {
    await API.getUserById(params.id).then((res) => {
      setState(res.data.cleaning[0]);
      setRental(res.data);
      setLoading(false)
    });
  };

  const delPhoto = (e) => {
    e.preventDefault();
    const id = state.images.indexOf(e.target.value);
    const newElement = state.images.splice(id, 1);
    const newArr = state.images.filter((i) => i !== newElement);
    setState({...state, images: newArr});
    console.log(newArr)
    startDelete();
    const updatedArr = rental.cleaning[0]
    setRental({...rental, cleaning: state})
  };

  const startDelete = async () => {
    await API.updateUser(rental._id, rental)
      .then((res) => {
        setRental({ ...rental, cleaning: state });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
          {userData.user ? (
            <div className="container page-adjustment">
              <div className="row">
                Check out the photos you've uploaded below!
                <p> Delete photos you no longer want</p>
                <div>
                  {state.images.map((img) => (
                     <List key={img}> 
                       <ListItem> 
                         <button onClick={delPhoto} img={img} value={img}>
                          X
                        </button> 
                        <img
                          className="preview-images d-block w-100 large-rental-photo"
                          src={img}
                          alt="..."
                        ></img> 
                       </ListItem> 
                     </List> 
                   ))} 
                </div>
              </div>
              <p> Look good? </p>
              <Link to={"/cleaning/" +rental._id}>
                <button className="to-page"> Looks good! </button>
              </Link>
              {load === false && (
                <Link to={"/addphotos/" + rental._id}>
                  <button className="more-photos">
                    {" "}
                    I want to add more photos
                  </button>
                </Link>
              )}
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
