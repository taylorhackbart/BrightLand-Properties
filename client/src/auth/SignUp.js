import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import API from "../utils/API";

export default function SignUp() {
  const fname = useRef();
  const lname = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const typeRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [create, setCreate] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    jobType: "",
    phoneNumber: ""
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value)
    setCreate({ ...create, [name]: value })
  };
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords Do Not Match");
    }

    try {
      setError("");
      setLoading(true);
      API.saveUser(create);
      // setCreate(create)
      console.log(create);
      // (emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Make Account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up:</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="fname">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange = {handleInputChange} type="name" ref={fname} required name="fname" ></Form.Control>
            </Form.Group>
            
            <Form.Group id="lname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="name" ref={lname} required name="lname" onChange = {handleInputChange}  ></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required name="email" onChange = {handleInputChange} ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                name="password"
                onChange = {handleInputChange} 
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                onChange = {handleInputChange} 
              ></Form.Control>
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phoneNumber" ref={phoneRef} required onChange = {handleInputChange} ></Form.Control>
            </Form.Group>
            <div className="row">
              <Form.Group id="type">
                <Form.Label style={{ float: "left" }}>
                  Employee Type:
                </Form.Label>

                {/* <Form.Control type="type" ref={typeRef} required> */}
                <div style={{ float: "left" }}>
                  <Form.Control
                    type="radio"
                    value="admin"
                    name="employeeType"
                    ref={typeRef}
                    name="jobType"
                    onChange = {handleInputChange} 
                  />
                  Admin
                </div>
                <div style={{ float: "left" }}>
                  <Form.Control
                    type="radio"
                    value="manager"
                    name="employeeType"
                    ref={typeRef}
                    name="jobType"
                    onChange = {handleInputChange} 
                  />
                  Manager
                </div>
                <div style={{ float: "left" }}>
                  <Form.Control
                    type="radio"
                    value="employee"
                    name="employeeType"
                    ref={typeRef}
                    name="jobType"
                    onChange = {handleInputChange} 
                  />
                  Employee
                </div>
                {/* </Form.Control> */}
              </Form.Group>
            </div>
            <Button className="w-100" type="submit" disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already Have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
