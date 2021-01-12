import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./home.css";
import { FiUsers } from "react-icons/fi";
import API from "../../utils/API";
import Axios from "axios";
export default function Home() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  useEffect(() => {
    // loadEmployees()
    setLoading(false);
  }, []);
  const loadEmployees = async () => {
    let token = localStorage.getItem("auth-token")
    const userRes = await Axios.get("http://localhost:3001/users/", {
      headers: { "x-auth-token": token },
    });
    console.log(userRes);
    setLoading(false);
  };
  // if (loading === true) {
  //   return <>loading...</>;
  // }
  // else
  return (
    <>
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
          <div className="page">
            {/* { userData.user && ( */}
            {userData.user && userData.user.jobType === "admin" ? (
              <>
                <h1>Welcome {userData.user.displayName}</h1>
                <p> {userData.user.jobType} </p>
                <div className="card w-50">
                  <div className="card-body">
                    <h5 className="card-title">Add an Employee</h5>
                    <p className="card-text">
                      Add a new employee. You will choose their job type by
                      clicking the button below
                    </p>
                    <Link to="/register">
                      <AiOutlineUserAdd className="admin-register" />
                    </Link>
                  </div>
                </div>
                <div className="card w-50">
                  <div className="card-body">
                    <h5 className="card-title">View all Employees</h5>
                    <p className="card-text">
                      Click the link below to view all employees
                    </p>
                    {/* <Link to="/viewall"> */}
                    {loading === false && (
                      <FiUsers
                        className="admin-register"
                        onClick={loadEmployees}
                      />
                    )}
                    {/* </Link> */}
                  </div>
                </div>
              </>
            ) : userData.user && userData.user.jobType === "employee" ? (
              <div>
                <h1>Welcome {userData.user.displayName}</h1>
                <p> {userData.user.displayName}</p>
              </div>
            ) : userData.user && userData.user.jobType === "manager" ? (
              <div>
                <h1>Welcome {userData.user.displayName}</h1>
                <p> {userData.user.displayName}</p>
              </div>
            ) : (
              <div>
                {/* <h1>Welcome {userData.user.displayName}</h1>
                <p> {userData.user.jobType}</p> */}
              </div>
            )}
          </div>
        </UserContext.Provider>
      )}
    </>
    // <>
    // </>
  );
}
