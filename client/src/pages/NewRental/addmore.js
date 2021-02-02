import React, { useCallback, useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { useParams, useHistory } from "react-router-dom";
import Dropzone from "../../components/FileInput/Dropzone";
import ImageList from "../../components/FileInput/ImageList";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import cuid from "cuid";
import API from "../../utils/API";
import update from "immutability-helper";

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

function AddMore() {
  const [images, setImages] = useState([]);
  const [rental, setRental] = useState([]);
  const [property, setProperty] = useState({})
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    loadPropertyInfo();
  }, []);
  const loadPropertyInfo = () => {
    API.getProperties(params.id)
      .then((res) => {
        setRental(res.data.imageUrl);
        setProperty(res.data)
        // console.log(res)
      })
      .catch((err) => console.log(err));
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
        setImages((prevState) => [
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
    const newArr = new Array();
    // images.map((x) => {
      // newArr.push(x);
      newArr.push(images)
      console.log(newArr)
      // setProperty({...property, imageUrl: newArr})
      // API.updateProperty(property._id, property)
      // .then(res => {
        // console.log(res)
        // history.push("/editphotos/" + property._id)
      // })
    // });

  };
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };
  console.log(property)
  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop Example</h1>

      <Dropzone onDrop={onDrop} accept={"image/*"} />
      {/* {console.log(images)} */}
      {/* <ImageList images={images} /> */}
      {images && images.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )}
      <DndProvider backend={backendForDND}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
      <button onClick={onSend}> Submit </button>
    </main>
  );
}

export default AddMore;
