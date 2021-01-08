import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import About from "./pages/About"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import { BrowserRouter, Route } from "react-router-dom";
import Properties from "./pages/Rentals/Properties"
import NewRental from "./pages/NewRental/images.js"
import Base from "./pages/NewRental/base.js"
import { useAuth0 } from "@auth0/auth0-react";
import previewPhotos from "./pages/NewRental/preview.js"

function App() {
  const { loading, user } = useAuth0();
  if(user){
    console.log(user)
  }
    
    if (loading) {
      return <div>Loading...</div>;
    }
  return (
    
    <BrowserRouter>
    
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/Properties/name/:location" component={Properties} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path= {"/images/name/:location"} component={NewRental}/>
        <Route exact path= {"/preview/:id"} component={previewPhotos}/>
        <Route exact path = "/new" component={Base} />
      </div>
    </BrowserRouter>
  );
}

export default App;
