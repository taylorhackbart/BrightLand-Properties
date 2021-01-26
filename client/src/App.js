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
import UserContext from "./contexts/UserContext";
import HomePage from "./pages/Home/Home.js";
import Footer from "./components/Footer";
import Cleaning from "./pages/Cleaning/property";
import StartCleaning from "./pages/Cleaning/startClean";
import previewCleaning from "./pages/Cleaning/preview";
import "./app.css";
import API from "./utils/API";
import NoMatch from "./pages/NoMatch";
import Rentals from "./pages/Rentals/Rentals";
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
    <div className="page-container">
      <BrowserRouter>
        <NavBar />
        <UserContext.Provider value={{ userData, setUserData }}>
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
              <Route path="/register" component={Register} />
              <Route exact path={"/preview/:id"} component={previewPhotos} />
              <Route exact path="/new" component={Base} />
              {/* <Route exact path="/newHome" component={NewHome} /> */}
              <Route exact path="/cleaning" component={Cleaning} />
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
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
