import React, { useState, useEffect } from "react";
import NavBar from "./components/Nav";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import API from "./utils/API";
import  SimpleReactLightbox  from "simple-react-lightbox";
import {DndProvider} from "react-dnd"
import {DragDropContext} from "react-beautiful-dnd"
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import "./app.css";

//PUBLIC ROUTES
import Properties from "./pages/Rentals/Properties";
import HomePage from "./pages/Home/Home.js";
import NoMatch from "./pages/NoMatch";
import Rentals from "./pages/Rentals/Rentals";

//AUTH IMPORTS
import Home from "./components/pages/Home";
import {Login, Register, PropertyType} from "./components/auth";

//NEW RENTAL IMPORTS
import {Base, AddMore, Edit, Manage} from "./pages/NewRental";

//CLEANING IMPORTS
import {Cleaning, StartCleaning, AddPhotos, ViewCleanings} from "./pages/Cleaning";

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
      {/* <SimpleReactLightbox> */}
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
              <Route exact path={"/viewcleanings"} component={ViewCleanings} />
              {/* <Route exact path={"/editphotos/:id"} component={EditPhotos} /> */}
              <Route exact path={"/addphotos/:id"} component={AddPhotos} />
              <Route exact path={["/addmore/:id", "/addmore/name/:name"]} component={AddMore} />
              <Route exact path="/new" component={Base} />
              <Route exact path="/manage" component={Manage} />
              <Route exact path={["/edit/:id", "/edit/name/:name"]} component={Edit} />
              <Route exact path={"/chooseprop/:id"} component={PropertyType} />
              <Route exact path="/cleaning/:id" component={Cleaning} />
              <Route exact path="/properties" component={Rentals} />
              <Route exact path="/startclean/:id" component={StartCleaning} />
              {/* <Route
                exact
                path="/previewclean/:id"
                component={previewCleaning}
              /> */}
              {/* <Route
                exact
                path={"/images/name/:location"}
                component={NewRental}
              /> */}
              <Route path="*" component={NoMatch} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </UserContext.Provider>
      </BrowserRouter>
      {/* </SimpleReactLightbox> */}
      </DndProvider>
    </div>
    </DragDropContext>
  );
}

export default App;
