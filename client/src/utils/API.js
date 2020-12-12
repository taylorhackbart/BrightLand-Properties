import axios from "axios";

export default {
  // Gets all books
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets the book with the given id
  getUsers: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the User with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a User to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  }
};
