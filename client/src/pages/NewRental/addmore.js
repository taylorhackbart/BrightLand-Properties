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
import NoMatch from "../NoMatch"

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
  const history = useHistory();
  const [done, setDone] = useState(false);

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
          setRental(res.data[0].imageUrl);
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

  const onSend = () => {
    console.log(property, rental);
    setProperty({ ...property, imageUrl: rental });
    setDone(true);
  };

  const onSubmit = async () => {
    await API.updateProperty(property._id, property).then((res) => {
      setProperty({ ...property, imageUrl: rental });
      console.log(res);
      history.push("/properties/name/" + property.location);
    });
  };

  const moveImage = (dragIndex, hoverIndex) => {
    console.log("click");
    const draggedImage = rental[dragIndex];
    setRental(
      update(rental, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };
  const removeItem = (id) => {
    setRental(
      update(rental, {
        $splice: [[id, 1]],
      })
    );
  };
  console.log(property, rental);
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
                  // key = {}
                  moveImage={moveImage}
                  removeItem={removeItem}
                />
              </DndProvider>
              {done === false && (
                <>
                  <button onClick={onSend}> Save </button>
                  <button onClick={onSubmit} style={{ display: "none" }}>
                    {" "}
                    Submit{" "}
                  </button>
                </>
              )}
              {done === true && (
                <>
                  <button onClick={onSend} style={{ display: "none" }}>
                    {" "}
                    Save{" "}
                  </button>
                  <button onClick={onSubmit}> Submit </button>
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
