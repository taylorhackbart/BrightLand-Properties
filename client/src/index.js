import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.render(
<Auth0Provider
domain="dev-wsnlulqw.us.auth0.com"
clientId="eGFRb06lxW5NHGOkEMFyzE7ccvEaSW2f"
redirectUri={window.location.origin}
>
<App />
</Auth0Provider>,

document.getElementById("root"));
