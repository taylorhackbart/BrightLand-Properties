import React from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Sign from "./pages/Sign";
import Graphs from "./pages/Graphs"
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/sign" component={Sign} />
        <Route exact path="/graphs" component={Graphs} />
      </div>
    </BrowserRouter>
  );
}

export default App;
