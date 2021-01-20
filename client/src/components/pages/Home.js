import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./home.css";
import { FiUsers } from "react-icons/fi";
import { BsHouse } from "react-icons/bs"
import { AiOutlineClear } from "react-icons/ai"
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import API from "../../utils/API";

export default function Home() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [cleanings, setCleanings] = useState([]);
  const [load, setLoad] = useState(true);
  const [loadClean, setLoadClean] = useState(true);
  const [show, setShow] = useState(false);
  // const [showClean, setShowClean] = useState(false);
  const open = useRef();
  const header = useRef();
  const title = useRef();
  const body = useRef();
  const open1 = useRef();
  const header1 = useRef();
  const title1 = useRef();
  const body1 = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const loadEmployees = async () => {
    let token = localStorage.getItem("auth-token");
    // const userRes = await Axios.get("http://localhost:3001/users/register", {
    //   headers: { "x-auth-token": token },
    // });
    const userRes = await API.getUser()
    let newArr = [...userRes.data];
    // console.log(newArr);
    setEmployees({ newArr });
    //page has been loaded with all info
    setLoading(false);
    //employee info has loaded
    setLoad(false);
    handleShow();
    //not loading cleaning info on modal open
    setLoadClean(true)
  };

  const loadCleaning = async () => {
    const userRes = await API.getCleaning();
    let cleaningArr = [...userRes.data];
    setCleanings({ cleaningArr });
    console.log(cleaningArr)
    //not allowing the employee modal to open
    setLoad(true)
    //page has been loaded with all info needed
    setLoading(false);
    //cleaning data has been loaded
    setLoadClean(false);
    handleShow();
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
                <div className="row">
                <div className="card w-50 col-12 col-md-6 ">
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
                <div className="card w-50 col-12 col-md-6">
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
                </div>
                {/* loading modal for viewing employees on click  */}
                <div>
                  {load === false && loadClean === true && (
                    <Modal show={show} onHide={handleClose} ref={open}>
                      <Modal.Header closeButton ref={header}>
                        <Modal.Title
                          id="contained-modal-title-vcenter"
                          ref={title}
                        >
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
                <div className="row">
                <div className="card w-50 col-12 col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">View Recent Cleanings</h5>
                    <p className="card-text">
                      Click below to view recent cleanings
                    </p>
                    {loading === false  && (
                      <AiOutlineClear
                        className="admin-register"
                        onClick={loadCleaning}
                      />
                    )}
                  </div>
                </div>
                <div>
                  {loadClean === false && load === true && (
                    <Modal show={show} onHide={handleClose} ref={open1}>
                      <Modal.Header closeButton ref={header1}>
                        <Modal.Title
                          id="contained-modal-title-vcenter"
                          ref={title1}
                        >
                          Cleanings
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body ref={body1}>
                        {cleanings.cleaningArr.map((cleaning) => (
                          <div key={cleaning._id}>
                            <h3>{cleaning.property}</h3>
                            <ul> {cleaning.startClean} </ul>
                            <ul> {cleaning.stopClean} </ul>
                            <ul> {cleaning.notes}</ul>
                          </div>
                        ))}
                      </Modal.Body>
                    </Modal>
                  )}
                </div>
                <div className="card w-50 col-12 col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">Add a New Property</h5>
                    <p className="card-text">
                      Click below to add a new rental property
                    </p>
                    {loading === false  && (
                      <Link to = "/new">
                      <BsHouse className="admin-register" />
                      </Link>
                    )}
                  </div>
                </div>
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
                      <button className="begin-clean"> Start Cleaning </button>
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
