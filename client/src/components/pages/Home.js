import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./home.css";
import { FiUsers } from "react-icons/fi";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";

export default function Home() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [load, setLoad] = useState(true);
  const [show, setShow] = useState(false);
  const open = useRef(); 
  const header = useRef(); 
  const title= useRef(); 
  const body= useRef()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const loadEmployees = async () => {
    let token = localStorage.getItem("auth-token");
    const userRes = await Axios.get("http://localhost:3001/users/register", {
      headers: { "x-auth-token": token },
    });
    let newArr = [...userRes.data];
    // console.log(newArr);
    setEmployees({ newArr });
    setLoading(false);
    setLoad(false);
    handleShow()
  };

  return (
    <div className="container">
      {loading === false && (
        <UserContext.Provider value={{ userData }}>
          <div className="page">
            {userData.user && userData.user.jobType === "admin" ? (
              <>
                <h1>Welcome {userData.user.displayName}</h1>
                <p> Job Title: {userData.user.jobType}</p>
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
                  </div>
                </div>
                <div>
                  {load === false && (
                    <Modal show={show} onHide={handleClose} ref={open}>
                      <Modal.Header closeButton ref={header}>
                        <Modal.Title id="contained-modal-title-vcenter" ref={title}>
                          Employees
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body ref={body}>
                      {employees.newArr.map((employee) => (
                        <div key={employee._id}>
                          <h3>{employee.displayName}</h3>
                          <ul> {employee.jobType} </ul>
                          <ul> {employee.phoneNumber} </ul>
                          <ul> {employee.email} </ul>
                        </div>
                      ))}
                      </Modal.Body>
                    </Modal>
                  )}
                </div>
              </>
            ) : userData.user && userData.user.jobType === "employee" ? (
              <div>


                <h1>Welcome {userData.user.displayName}</h1>
                <p> Job Title: {userData.user.jobType}</p>
                <div className="card w-50">
                  <div className="card-body">
                    <h5 className="card-title">Log a Clean</h5>
                    <p className="card-text">
                      Click the button below to begin cleaning:
                    </p>
                    <Link to="/cleaning">
                      <button className="begin-clean" > Start Cleaning </button>
                    </Link>
                  </div>
                </div>

                 
              </div>






            ) : userData.user && userData.user.jobType === "manager" ? (
              <div>
                <h1>Welcome {userData.user.displayName}</h1>
                <p> Job Title: {userData.user.jobType}</p>
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
    </div>
    // <>
    // </>
  );
}
