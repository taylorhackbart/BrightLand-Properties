import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

function Rentals() {
  // Setting our component's initial state
  const [user, setUser] = useState([])
  const [formObject, setFormObject] = useState({
    name: "",
  })

  // Load all User and store them with setUser
  useEffect(() => {
    loadUser()
  }, [])

  // Loads all User and sets them to User
  function loadUser() {
    API.getUser()
      .then(res => 
        setUser(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a user from the database with a given id, then reloads User from the db
  // function deleteUser(id) {
  //   API.deleteUser(id)
  //     .then(res => loadUser())
  //     .catch(err => console.log(err));
  // }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveuser method to save the user data
  // Then reload User from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.name) {
      API.saveUser({
        name: formObject.name,
      })
        .then(() => setFormObject({
          name: "",
        }))
        .then(() => loadUser())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <h1>  </h1>
        <Row>

        </Row>
      </Container>
    );
  }


export default Rentals;
