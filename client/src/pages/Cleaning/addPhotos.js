import React, { useCallback, useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useParams, useHistory } from "react-router-dom";
import Dropzone from "../../components/FileInput/Dropzone";
import ImageList from "../../components/FileInput/ImageList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import cuid from "cuid";
import API from "../../utils/API";
import update from "immutability-helper";

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
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState([]);
  const [property, setProperty] = useState({});
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserInfo();
  }, []);


    const loadUserInfo = async () => {
      await API.getUserById(params.id).then((res) => {
        setRental(res.data.cleaning[0].images);
        setProperty(res.data.cleaning[0]);
        setLoading(false)
      });
    };
  
  const onDrop = useCallback((acceptedFiles) => {
    // Loop through accepted files
    console.log(acceptedFiles);
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
  }, []);

  const onSend = () => {
    console.log(property, rental);
    setProperty({ ...property, images: rental });
  };

  const onSubmit = async () => {
    await API.updateUser(property._id, property).then((res) => {
      setProperty({ ...property, images: rental });
      console.log(res);
      // history.push("/cleaning/" + property._id);
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
        <main className="App">
          <h1 className="text-center">Drag and Drop </h1>

          <Dropzone onDrop={onDrop} accept={"image/*"} />
          {rental && rental.length > 0 && (
            <h3 className="text-center">Drag the Images to change positions</h3>
          )}
          <DndProvider backend={backendForDND}>
            <ImageList
              images={rental}
              moveImage={moveImage}
              removeItem={removeItem}
            />
          </DndProvider>

          <button onClick={onSend}> Save </button>
          <button onClick={onSubmit}> Submit </button>
        </main>
      )}
    </>
  );
}

export default AddMore;
