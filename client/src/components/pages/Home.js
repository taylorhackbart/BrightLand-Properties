import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./home.css";
import { FiUsers } from "react-icons/fi";
import { BsHouse } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import API from "../../utils/API";
import NoMatch from "../../pages/NoMatch";
import moment from "moment";
// import { Transition } from 'react-transition-group'

export default function Home() {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [cleanings, setCleanings] = useState([]);
  const [load, setLoad] = useState(true);
  const [loadClean, setLoadClean] = useState(true);
  const [user, setUser]  = useState({})
  const [show, setShow] = useState(false);
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
  const params = useParams();
  const id = userData.user.id

  useEffect(() => {
    loadUser()
    setLoading(false);
  }, []);

  const loadUser = () => {
    API.getUserById(id)
    .then(res => {
      setUser(res.data)
    })
  }

  const loadEmployees = async () => {
    let token = localStorage.getItem("auth-token");
    // const userRes = await Axios.get("http://localhost:3001/users/register", {
    //   headers: { "x-auth-token": token },
    // });
    const userRes = await API.getUser();
    let newArr = [...userRes.data];
    // console.log(newArr);
    setEmployees({ newArr });
    //page has been loaded with all info
    setLoading(false);
    //employee info has loaded
    setLoad(false);
    handleShow();
    //not loading cleaning info on modal open
    setLoadClean(true);
  };

  const loadCleaning = async () => {
    const userRes = await API.getCleaning();
    let cleaningArr = [...userRes.data];
    setCleanings({ cleaningArr });
    //not allowing the employee modal to open
    setLoad(true);
    //page has been loaded with all info needed
    setLoading(false);
    //cleaning data has been loaded
    setLoadClean(false);

    handleShow();
  };

  return (
    <>
      <div className="container home-screen">
        {loading === false && (
          <UserContext.Provider value={{ userData }}>
            <div className="page">
              {userData.user && userData.user.jobType === "Admin" ? (
                <div className="container">
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
                            onChange={handleShow}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* loading modal for viewing employees on click  */}
                  <div>
                    {load === false && loadClean === true && (
                      <Modal show={show} onHide={handleClose}>
                        {/* <Transition in={inProp} ref={trans}/> */}
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
                              <h4>{employee.displayName}</h4>
                              <ul><strong>Username:</strong> "{employee.username}"</ul>
                              <ul><strong>Role: </strong> {employee.jobType} </ul>
                              <ul><strong>Phone Number: </strong> {employee.phoneNumber} </ul>
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
                        {loading === false && (
                          <AiOutlineClear
                            className="admin-register"
                            onClick={loadCleaning}
                            onChange={handleShow}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      {loadClean === false && load === true && (
                        <Modal ref={open1} show={show} onHide={handleClose}>
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
                                <h4>{cleaning.property}</h4>
                                <ul> <strong>Date:   </strong>
                                  {" "}
                                  {moment(cleaning.startClean).format(
                                    "DD/MM/YYYY"
                                  )}{" "}
                                </ul>
                                <ul><strong> Name of Employee: </strong> {cleaning.name} </ul>
                                <ul> <strong> Time Finished: </strong> {cleaning.stopClean} </ul>
                                <ul>  <strong> Notes: </strong> {cleaning.notes}</ul>
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
                        {loading === false && (
                          <Link to="/new">
                            <BsHouse className="admin-register" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="card w-50 col-12 col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">Log a Clean</h5>
                        <p className="card-text">
                          Click the button below to log a new cleaning:
                        </p>
                        <Link to={"/startclean/" + user._id}>
                          <AiOutlineClear className="admin-register"></AiOutlineClear>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : userData.user && userData.user.jobType === "Employee" ? (
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
                        <button className="begin-clean">
                          {" "}
                          Start Cleaning{" "}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : userData.user && userData.user.jobType === "Manager" ? (
                <div>
                  <h1>Welcome {userData.user.displayName}</h1>
                  <p> Job Title: {userData.user.jobType}</p>
                  <div className="row">
                    <div className="card w-50 col-12 col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">View Recent Cleanings</h5>
                        <p className="card-text">
                          Click below to view recent cleanings
                        </p>
                        {loading === false && (
                          <AiOutlineClear
                            className="admin-register"
                            onClick={loadCleaning}
                            onChange={handleShow}
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
                              <h4>{cleaning.property}</h4>
                              <ul> <strong>Date:   </strong>
                                {" "}
                                {moment(cleaning.startClean).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              </ul>
                              <ul><strong> Name of Employee: </strong> {cleaning.name} </ul>
                              <ul> <strong> Time Finished: </strong> {cleaning.stopClean} </ul>
                              <ul>  <strong> Notes: </strong> {cleaning.notes}</ul>
                            </div>
                            ))}
                          </Modal.Body>
                        </Modal>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <NoMatch />
                </div>
              )}
            </div>
          </UserContext.Provider>
        )}
      </div>
    </>
  );
}
