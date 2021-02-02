import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap/";
import { SRLWrapper } from "simple-react-lightbox";

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
                <img className="galleryimg" key={i} src={x} />
                
                <button> X </button>
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
