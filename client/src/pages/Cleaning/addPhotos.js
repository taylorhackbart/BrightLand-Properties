import React, { useCallback, useState, useEffect, useContext } from "react";
import { DndProvider } from "react-dnd";
import UserContext from "../../contexts/UserContext";
import { useParams, useHistory } from "react-router-dom";
import Dropzone from "../../components/FileInput/Dropzone";
import ImageList from "../../components/FileInput/ImageList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import cuid from "cuid";
import "./clean.css";
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

function AddPhotos() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState({});
  const [user, setUser] = useState({});
  const [property, setProperty] = useState([]);
  const [cleaning, setCleaning] = useState([]);
  const [done, setDone] = useState(true);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserInfo();
    console.log(userData)
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
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
 
  const onSend = async () => {
    setProperty({ ...property, images: rental });
    if (user.cleaning[0].images.length === 0) {
      // console.log(property);
      console.log("i am empty");
      await updateUserFunc();
    } else {
      console.log("i am full");
    }
    setDone(false); // }
  };

  const updateUserFunc = async () => {
    setProperty({ ...property, images: rental });
    const newFunc = () => {
      if (property.images.length > 0) {
        cleaning.splice(0, 1, property);
      } else {
        console.log("help");
      }
    }
    newFunc();
  };
  console.log(cleaning[0], property);

  const onSubmit =  () => {
    cleaning.splice(0, 1, property);
    // setUser({...user, cleaning: cleaning})
    const newestFunc = async () => {
      setUser({ ...user, cleaning: cleaning });
      await API.updateUser(user._id, user).then((res) => {
        console.log(res)
        setUser({ ...user, cleaning: cleaning });
        const newUpdate = async () => {
          await API.updateUser(user._id, user).then(res => {
            console.log(res)
          })
        }
        newUpdate()
      });
    }
    newestFunc();
    history.push("/cleaning/" + user._id);
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
  // http://localhost:3000/startclean/60144b93bc6dabffe3a86e39
  // http://localhost:3000/addPhotos/60144b93bc6dabffe3a86e39
  return (
    <>
     <UserContext.Provider value={{ userData }}>
       {loading === false && (
         <>
         {userData.user ? (
        
        <main className="add-photos-app">
          <h1 className="text-center">Drag and Drop </h1>

          <Dropzone onDrop={onDrop} accept={"image/*"} />
          {rental && rental.length > 0 && (
            <h3 className="text-center" style={{ marginTop: "10px" }}>
              Drag the Images to change positions
            </h3>
          )}
          <DndProvider backend={backendForDND}>
            <ImageList
              images={rental}
              moveImage={moveImage}
              removeItem={removeItem}
            />
          </DndProvider>
          {done ? (
            <div className="cleaning-buttons-send">
              <button onClick={onSend} className="send-cleaning">
                {" "}
                Save{" "}
              </button>
              <button
                onClick={onSubmit}
                style={{ display: "none" }}
                className="send-cleaning"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          ) : (
            <div className="cleaning-buttons-send">
              <button
                onClick={onSend}
                style={{ display: "none" }}
                className="send-cleaning"
              >
                {" "}
                Save{" "}
              </button>
              <button onClick={onSubmit} className="send-cleaning">
                {" "}
                Submit{" "}
              </button>
            </div>
          )}
      
        </main>
       ):(
         <>
       <NoMatch/>
         </>
       )}
         </>
       
       )}
      </UserContext.Provider>
    </>
  );
}

export default AddPhotos;
