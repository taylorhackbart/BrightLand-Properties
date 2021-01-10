import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [jobType, setJobType] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName, phoneNumber, jobType };
      await Axios.post("http://localhost:3001/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      console.log(loginRes)
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(err)
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
      <div className="row">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
</div>
<div className="row">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
       
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
 </div>
 <div className="row">


        <label htmlFor="register-display-name">Display name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
         </div>
        <label htmlFor="register-phone-number">Phone Number</label>
        <input
          id="register-phone-number"
          type="text"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className="row" >

        <label htmlFor="register-job-type">Job Type</label>
        </div>
        <div className="row">
        <input
          id="register-job-admin"
          type="radio"
          onChange={(e) => setJobType(e.target.value)}
          value="admin"
        /> ADMIN
         <input
          id="register-job-manager"
          type="radio"
          onChange={(e) => setJobType(e.target.value)}
          value="manager"
        /> MANAGER
         <input
          id="register-job-employee"
          type="radio"
          onChange={(e) => setJobType(e.target.value)}
          value="employee"
        /> EMPLOYEE
</div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}