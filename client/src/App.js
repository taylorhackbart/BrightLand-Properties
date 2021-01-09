import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import About from "./pages/About"
import Login from "./pages/Login"
// import Logout from "./pages/Logout"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Properties from "./pages/Rentals/Properties"
import NewRental from "./pages/NewRental/images.js"
import Base from "./pages/NewRental/base.js"
import previewPhotos from "./pages/NewRental/preview.js"
import SignUp from "./auth/SignUp";
import Dashboard from "./auth/Dashboard"
import PrivateRoute from "./auth/PrivateRoute"
import ForgotPassword from "./auth/ForgotPassword"
import UpdateProfile from "./auth/UpdateProfile"
// import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"


function App() {
  // const { loading, user } = useAuth0();
  // if(user){
  //   console.log(user)
  // }
    
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  return (
    
    <BrowserRouter>
     <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/Properties/name/:location" component={Properties} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/logout" component={Logout} /> */}
        <Route exact path= {"/images/name/:location"} component={NewRental}/>
        <Route exact path= {"/preview/:id"} component={previewPhotos}/>
        <Route exact path = "/new" component={Base} />
      </div>
    </BrowserRouter>
  );
}

export default App;
