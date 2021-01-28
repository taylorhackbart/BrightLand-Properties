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
  const [img, setImg] = useState([])
  const params = useParams();
  useEffect(async () => {
      loadPropertyInfo();
    // setLoading(false);
    setLoad(false);
  }, []);
  const loadPropertyInfo = async () => {
    await API.getProperties(params.id).then((res) => {
      // console.log(res.data.cleaning[0]);
      setState(res.data.cleaning[0]);
      setRental(res.data);
      setLoading(false)
    });
  };
  // console.log(rental)
  const delPhoto = (e) => {
    e.preventDefault();
    const id = state.images.indexOf(e.target.value);
    const newElement = state.images.splice(id, 1);
    const newArr = state.images.filter((i) => i !== newElement);
    setState({...state, images: newArr});
    console.log(newArr)
    startDelete();
    // setRental({...rental, clean})
  };
  console.log(state, rental)
  const startDelete = async () => {
    await API.updateProperty(rental._id, rental)
      .then((res) => {
        // setRental({ ...rental, images: state });
        console.log(res.data);
      })
      .catch((err) => {
        throw err;
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
                       {/* {console.log(img)}  */}
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
              <Link to="/home">
                <button className="to-page"> Looks good! </button>
              </Link>
              {load === false && (
                <Link to={"/startclean/" + rental._id}>
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
