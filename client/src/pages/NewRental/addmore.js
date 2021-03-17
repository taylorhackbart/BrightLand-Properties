import React, { useCallback, useState, useEffect, useContext } from "react";
import { DndProvider } from "react-dnd";
import UserContext from "../../contexts/UserContext";
import { useParams, useHistory } from "react-router-dom";
import Dropzone from "../../components/FileInput/Dropzone";
import ImageList from "../../components/FileInput/ImageList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import cuid from "cuid";
import API from "../../utils/API";
import update from "immutability-helper";
import NoMatch from "../NoMatch";

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    // console.log("true")
    return true;
  }
  // console.log("false")
  return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

function AddMore() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState([]);
  const [property, setProperty] = useState({});
  const params = useParams();
  const [wait, setWait] = useState(false);
  const [done, setDone] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    loadPropertyInfo();
  }, []);

  const loadPropertyInfo = () => {
    if (params.id) {
      API.getProperties(params.id)
        .then((res) => {
          setRental(res.data.imageUrl);
          setProperty(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    if (params.name) {
      API.getPropertiesByName(params.name)
        .then((res) => {
          if (res.data[0].imageUrl.length > 0) {
            setRental(res.data[0].imageUrl);
          }
          setProperty(res.data[0]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Loop through accepted files
    console.log(acceptedFiles);
    try {
      acceptedFiles.map((file) => {
        // Initialize FileReader browser API
        const reader = new FileReader();
        // onload callback gets called after the reader reads the file data
        reader.onload = function (e) {
          // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it.
          setRental((prevState) => [
            ...prevState,
            { id: cuid(), src: e.target.result },
          ]);
          // setProperty({...property, imageUrl: rental})
        };
        // Read the file as Data URL (since we accept only images)
        reader.readAsDataURL(file);
        // console.log(reader.readAsDataURL(file))
        return file;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = rental[dragIndex];
    setRental(
      update(rental, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
    // setProperty({...property, imageUrl: rental})
  };
  const removeItem = (id) => {
    setRental(
      update(rental, {
        $splice: [[id, 1]],
      })
    );
    // setProperty({...property, imageUrl: rental})
  };
  const onSend = async () => {
    setWait(true);
    setProperty({ ...property, imageUrl: rental });
    setUpdated(true);
    setDone(true)
  };

  const updateFunc = async () => {
    await API.updateProperty(property._id, property).then((res) => {
      console.log(res.data.imageUrl);
      // setDone(true);
      setComplete(true)
      setUpdated(false)
    });
  };
  const onSubmit = async () => {
    console.log(property, rental);
  };
  return (
    <>
      {loading === false && (
        <>
          {userData.user ? (
            <main className="App">
              <h1 className="text-center">Drag and Drop </h1>

              <Dropzone onDrop={onDrop} accept={"image/*"} />
              {rental && rental.length > 0 && (
                <h3 className="text-center">
                  Drag the Images to change positions (first photo will always
                  be main photo)
                </h3>
              )}
              <DndProvider backend={backendForDND}>
                <ImageList
                  images={rental}
                  moveImage={moveImage}
                  removeItem={removeItem}
                />
              </DndProvider>
              {done === false && (
                <>
                  {wait === true && (
                    <p className="loading-marker"> Loading... </p>
                  )}
                  <div className="save-me-div">
                    <button className="save-me-button" onClick={onSend}>
                      {" "}
                      Save Images{" "}
                    </button>
                  </div>
                </>
              )}
              {done === true && (
                <>
                {updated === true && (
                  <div className="save-me-div">
                    <p>Done uploading?</p>
                    <button className="save-me-button" onClick={updateFunc}>
                      {" "}
                      DONE{" "}
                    </button>
                  </div>
                )}
                {complete === true && (
                  <div className="save-me-div">
                    <a href={"/properties/name/" + property.location}>
                    <button className="save-me-button" onClick={onSubmit}>
                      {" "}
                      View Rental{" "}
                    </button>
                    </a>
                    <a href="/manage">
                      <button className="save-me-button">
                        {" "}
                        Manage Another Rental{" "}
                      </button>
                    </a>
                  </div>

                )}
                </>
              )}
            </main>
          ) : (
            <>
              <NoMatch />
            </>
          )}
        </>
      )}
    </>
  );
}

export default AddMore;
