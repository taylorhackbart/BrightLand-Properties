import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
// import Dropzone from "./Dropzone";

function EditPhotos() {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const params = useParams();

  useEffect(() => {
    loadRental();
  }, []);

  const loadRental = (i) => {
    API.getProperties(params.id).then((res) => {
      setRental(res.data);
      setLoading(false);
    });
  };
  const delPhoto = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const rentalArray = rental.imageUrl;
    const index = rentalArray.indexOf(e.target.value);
    console.log(index);
    if (index !== -1) {
      rentalArray.splice(index, 1);
      setRental({ imageUrl: rentalArray });
    }
    console.log(rentalArray);

    const startDelete = async () => {
      await API.updateProperty(rental._id, rental)
        .then((res) => {
          setRental({ ...rental, imageUrl: rentalArray });
          //THEN I updated state
          console.log(res);
          console.log(rental);
        })
        .catch((err) => {
          throw err;
        });
    };
  };

  return (
    <div className="container edit-container">
      {loading === false && (
        <>
          <h2> HOME IMAGE: </h2>
          <img src={rental.homeImage} className="image-home-image" />
          <h2> RENTAL IMAGES: </h2>
          <SRLWrapper>
            <div className="image-grid">
              {rental.imageUrl.map((x, i) => (
                <>
                  <button className="edit-button" onClick={delPhoto} value={x}>
                    X
                    <img id={i} className="galleryimg" key={x} src={x} />
                  </button>
                </>
              ))}
            </div>
          </SRLWrapper>
        </>
      )}
    </div>
  );
}

export default EditPhotos;
