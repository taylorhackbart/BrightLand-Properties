import React from "react";
import "./login.css"
import {useAuth0} from "@auth0/auth0-react"

function Login() {
  const {loginWithRedirect} = useAuth0()
  return (
   <button onClick={() => loginWithRedirect()}>
     Log In
     </button>
  );
}

export default Login;
