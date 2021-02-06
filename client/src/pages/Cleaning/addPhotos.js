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
  const [user, setUser] = useState({})
  const [property, setProperty] = useState({});
  const [cleaning, setCleaning] = useState([])
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserInfo();
  }, []);


    const loadUserInfo = async () => {
      await API.getUserById(params.id).then((res) => {
        setRental(res.data.cleaning[0].images[0]);
        setProperty(res.data.cleaning[0]);
        setCleaning(res.data.cleaning)
        console.log(res.data)
        setUser(res.data)
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
    console.log( user, cleaning, rental);
    setProperty({...property, images: rental})

    const index = cleaning.findIndex((e) => e._id === property._id);
      if (index === -1) {
        console.log( "new item");
      } else {
        console.log("matched", index, cleaning[index]);
        const updatedArr = cleaning[index].images;
        // console.log(updatedArr)
        updatedArr.push(rental)
        console.log(updatedArr)
        setCleaning({...cleaning})
        setUser({...user, cleaning: cleaning})
      }
    //then property into cleaning
    //then cleaning into user
    // cleaning.push(property)
    // const newArr = cleaning[0]
    // newArr.splice(0, 1, property)
    // console.log(newArr)
    // setCleaning({...cleaning})

    
    // setProperty({ ...property, images: rental });
    // setUser({...user, cleaning: })
    // setProperty({ ...property, images: rental });
  };
  console.log(cleaning, user)

  const onSubmit =  () => {
    setProperty({ ...property});
     API.updateUser(user._id, user).then((res) => {
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
  // console.log(property, rental);
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
            {/* <ImageList
              images={rental}
              moveImage={moveImage}
              removeItem={removeItem}
              // onChange={setCleaning}
            /> */}
          </DndProvider>

          <button onClick={onSend}> Save </button>
          {console.log(cleaning[0])}
          <button onClick={onSubmit}> Submit </button>
        </main>
      )}
    </>
  );
}

export default AddMore;
