import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ErrorNotice from "../misc/ErrorNotice";
import "./style.css"
import API from "../../utils/API"

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await API.loginUser(loginUser)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,

      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page container">
      <h2 className="login-title">Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form login-form" onSubmit={submit}>
        <div className="row">
        <label htmlFor="login-email">Email</label>
        </div>
        <div className="row">
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@gmail.com"
        />
</div>
<div className="row">
        <label htmlFor="login-password">Password</label>
        </div>
        <div className="row">
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="xxxxxx"
        />
</div>
        <input className= "login-btn" type="submit" value="Log in" />
      </form>
    </div>
  );
}