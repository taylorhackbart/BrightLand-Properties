import axios from "axios";

export default {
  // Gets all books
  getProperty: function() {
    return axios.get("/api/property");
  },
  // Gets the book with the given id
  getProperties: function(id) {
    return axios.get("/api/property/" + id);
  },
  // Deletes the Property with the given id
  deleteProperty: function(id) {
    return axios.delete("/api/property/" + id);
  },
  // Saves a Property to the database
  saveProperty: function(PropertyData) {
    return axios.post("/api/property", PropertyData);
  }
};
