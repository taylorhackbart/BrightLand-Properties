import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ErrorNotice from "../misc/ErrorNotice";
import "./style.css";
import API from "../../utils/API"
import NoMatch from "../../pages/NoMatch"

export default function Register() {
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [jobType, setJobType] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  const [user, setUser] = useState({})

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username,
        password,
        passwordCheck,
        displayName,
        phoneNumber,
        jobType,
      };
      await API.createUser(newUser)
      .then((res) => {
        const id = res.data._id
        setUser(res.data)
        const loadUserInfo = async () => {
          await API.getUserById(id)
          .then(res => {
            setUser(res.data)
          })
        }
        loadUserInfo()
        history.push("/chooseprop/" + id);
      })
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log(err);
    }
  };

  return (
    <div className="page container register-container">
       <UserContext.Provider value={{ userData }}>
      <h2 className="register-title">Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        {userData.user && userData.user.jobType === "Admin" ? (
      <form className="form register-form" onSubmit={submit}>
        <div className="row register-row">
          <label htmlFor="register-username">Username</label>
        </div>
        <div className="row register-row">
          <input
            id="register-username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="janedoe"
          />
        </div>

        <div className="row register-row">
          <label htmlFor="register-password">Password</label>
        </div>
        <div className="row register-row">
          <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="xxxxxx"
          />
        </div>

        <div className="row register-row">
          <input
            type="password"
            placeholder="xxxxxx"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className="row register-row">
          <label htmlFor="register-display-name">Display name</label>
        </div>
        <div className="row register-row">
          <input
            id="register-display-name"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Jane Doe"
          />
        </div>
        <div className="row register-row">
          <label htmlFor="register-phone-number">Phone Number</label>
        </div>
        <div className="row register-row">
          <input
            id="register-phone-number"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="(555)555-555"
          />
        </div>
        <div className="row register-row">
          <div className="row register-row">
            <label htmlFor="register-job-type">Employee Role</label>
          </div>
        </div>
        <div className="row register-row">
          <ul>
            <li>
              <input
                id="register-job-admin"
                type="radio"
                onChange={(e) => setJobType(e.target.value)}
                value="Admin"
                name="jobType"
              />{" "}
              ADMIN
            </li>
            <li>
              <input
                id="register-job-manager"
                type="radio"
                onChange={(e) => setJobType(e.target.value)}
                value="Manager"
                name="jobType"
              />{" "}
              MANAGER
            </li>
            <li>
              <input
                id="register-job-employee"
                type="radio"
                onChange={(e) => setJobType(e.target.value)}
                value="Employee"
                name="jobType"
                />
                EMPLOYEE
            </li>
          </ul>
        </div>
        {/* < a href={"/chooseprop/" + username}> */}
        <input className="register-btn" type="submit" value="Register" />
        {/* </a> */}
      </form> 
       ) : (
      <NoMatch />
       )} 
      </UserContext.Provider>
    </div>
  );
}
