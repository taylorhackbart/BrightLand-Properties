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
  const [rental, setRental] = useState({});
  const [user, setUser] = useState({});
  const [property, setProperty] = useState([]);
  const [cleaning, setCleaning] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    await API.getUserById(params.id).then((res) => {
      setRental(res.data.cleaning[0].images);
      setProperty(res.data.cleaning[0]);
      setCleaning(res.data.cleaning);
      setUser(res.data);
      setLoading(false);
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        setRental((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      // setProperty({ ...property, images: rental });
      // setCleaning({ ...cleaning, 0: property });
      // setUser({ ...user, cleaning: cleaning });
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onSend = () => {
    setProperty({ ...property, images: rental });
    // const index = cleaning.findIndex((e) => e._id === property._id);
    // if (index === -1) {
      //   console.log("new item");
      // } else {
        // console.log("matched", index, cleaning[index]);
        if (user.cleaning[0].images.length === 0){
          // console.log(property);
          console.log("i am empty")
          // return setUser({ ...user, cleaning: cleaning });
          updateUserFunc();
          
          // setUser({ ...user, cleaning: cleaning });÷
        } else {
          console.log("i am full")
        }
        // }
      };
      
      const updateUserFunc = () => {
    setCleaning({ ...cleaning, 0: property });
  };
  console.log(cleaning, property);
  
  const onSubmit = () => {
    // setUser({...user, cleaning: cleaning})
    API.updateUser(user._id, user).then((res) => {
      setUser({ ...user, cleaning: cleaning });
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
