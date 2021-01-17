import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import "./style.css";

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
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
        phoneNumber,
        jobType,
      };
      await Axios.post("http://localhost:3001/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:3001/users/login", {
        email,
        password,
        jobType
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      console.log(loginRes);
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(err);
    }
  };

  return (
    <div className="page container">
      <h2 className="register-title">Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form register-form" onSubmit={submit}>
        <div className="row">
          <label htmlFor="register-email">Email</label>
        </div>
        <div className="row">
          <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@gmail.com"
          />
        </div>

        <div className="row">
          <label htmlFor="register-password">Password</label>
        </div>
        <div className="row">
          <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="xxxxxx"
          />
        </div>

        <div className="row">
          <input
            type="password"
            placeholder="xxxxxx"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="register-display-name">Display name</label>
        </div>
        <div className="row">
          <input
            id="register-display-name"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Jane Doe"
          />
        </div>
        <div className="row">
          <label htmlFor="register-phone-number">Phone Number</label>
        </div>
        <div className="row">
          <input
            id="register-phone-number"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="(555)555-555"
          />
        </div>
        <div className="row">
          <div className="row">
            <label htmlFor="register-job-type">Employee Role</label>
          </div>
        </div>
        <div className="row">
          <ul>
            <li>
              <input
                id="register-job-admin"
                type="radio"
                onChange={(e) => setJobType(e.target.value)}
                value="admin"
                name="jobType"
              />{" "}
              ADMIN
            </li>
            <li>
              <input
                id="register-job-manager"
                type="radio"
                onChange={(e) => setJobType(e.target.value)}
                value="manager"
                name="jobType"
              />{" "}
              MANAGER
            </li>
            <li>
              <input
                id="register-job-employee"
                type="radio"
                onChange={(e) => setJobType(e.target.value)}
                value="employee"
                name="jobType"
                />
                EMPLOYEE
            </li>
          </ul>
        </div>

        <input className="register-btn" type="submit" value="Register" />
      </form>
    </div>
  );
}
