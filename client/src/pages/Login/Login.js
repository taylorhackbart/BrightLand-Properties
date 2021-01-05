import React from "react";
import "./login.css"

function Login() {
  return (
    <>
      <div className="container login-container">
        <div className="row">
          <div className="col-md-12">
            <div> Name (Nombre): </div>
            <input type="text" placeholder="Jane Doe"></input>
          </div>
        </div>
          <div className="row">
            <div className="col-md-12">
              <div>Password (Contraseña):  </div>
              
              <input type="password" placeholder="xxxxxx"></input>
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
            <button> LOGIN </button>
          </div>
          </div>
      </div>
    </>
  );
}

export default Login;
