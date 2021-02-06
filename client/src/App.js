import React, { useState, useEffect } from "react";
import NavBar from "./components/Nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Properties from "./pages/Rentals/Properties";
import NewRental from "./pages/NewRental/images.js";
import Base from "./pages/NewRental/base.js";
import previewPhotos from "./pages/NewRental/preview.js";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login.js";
import Register from "./components/auth/Register.js";
import PropertyType from "./components/auth/PropertyType.js";
import UserContext from "./contexts/UserContext";
import HomePage from "./pages/Home/Home.js";
import AddMore from "./pages/NewRental/addmore"
import Edit from "./pages/NewRental/edit"
import EditPhotos from "./pages/NewRental/editphotos"
import Cleaning from "./pages/Cleaning/property";
import StartCleaning from "./pages/Cleaning/startClean";
import AddPhotos from "./pages/Cleaning/addPhotos";
import previewCleaning from "./pages/Cleaning/preview";
import Manage from "./pages/NewRental/manage"
import "./app.css";
import API from "./utils/API";
import NoMatch from "./pages/NoMatch";
import Rentals from "./pages/Rentals/Rentals";
import  SimpleReactLightbox  from "simple-react-lightbox";
import {DndProvider} from "react-dnd"
import { DragDropContext} from "react-beautiful-dnd"
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};
const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
        console.log("no token has been found");
      }
      const tokenRes = await API.postToken(null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await API.getUsers({
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <DragDropContext>
    <div className="page-container">
      <DndProvider backend={backendForDND}>
      <SimpleReactLightbox>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
          <div className="app-background">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route
                exact
                path="/properties/name/:location"
                component={Properties}
              />
              <Route exact path="/home" component={Home} />
              <Route path="/login" component={Login} />
              {/* <Route path="/propertyroutes/:id" component={Property} /> */}
              <Route path="/register" component={Register} />
              <Route exact path={"/preview/:id"} component={previewPhotos} />
              <Route exact path={"/editphotos/:id"} component={EditPhotos} />
              <Route exact path={"/addphotos/:id"} component={AddPhotos} />
              <Route exact path={["/addmore/:id", "/addmore/name/:name"]} component={AddMore} />
              <Route exact path="/new" component={Base} />
              <Route exact path="/manage" component={Manage} />
              <Route exact path={["/edit/:id", "/edit/name/:name"]} component={Edit} />
              <Route exact path={"/chooseprop/:id"} component={PropertyType} />
              <Route exact path="/cleaning/:id" component={Cleaning} />
              <Route exact path="/properties" component={Rentals} />
              <Route exact path="/startclean/:id" component={StartCleaning} />
              <Route
                exact
                path="/previewclean/:id"
                component={previewCleaning}
              />
              <Route
                exact
                path={"/images/name/:location"}
                component={NewRental}
              />
              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </UserContext.Provider>
      </BrowserRouter>
      </SimpleReactLightbox>
      </DndProvider>
    </div>
    </DragDropContext>
  );
}

export default App;
