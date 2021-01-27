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
  getPropertiesByName: function(location) {
    return axios.get("/api/property/name/" + location);
  },
  // Deletes the Property with the given id
  deleteProperty: function(id) {
    return axios.delete("/api/property/" + id);
  },
  updateProperty: function (id,userData) {
    return axios.put("/api/property/" + id,userData)
  },
  // Saves a Property to the database
  saveProperty: function(PropertyData) {
    return axios.post("/api/property", PropertyData);
  },
  getImages: function(){
    return axios.get('/api/cloud')
  },
  sendToCloud: function(formData){
    return axios.post('/api/cloud', formData)
  },
  getUsers: function(data) {
    return axios.get("/users", data)
  },
  getUser: function() {
    return axios.get("/users/register")
  },
  getUserById: function(id) {
    return axios.get("/users/register/" +id)
  },
  postToken: function(data, header) {
    return axios.post("/users/tokenIsValid", data, header)
  },
  loginUser: function (data){
    return axios.post("/users/login", data)
  },
  createUser: function (data){
    return axios.post("/users/register", data)
  },
  getCleaning: function (){
    return axios.get("/api/cleaning")
  },
  getCleaningById: function (id) {
    return axios.get("/api/cleaning/" +id)
  },
  saveCleaning: function (cleaningData) {
    return axios.post("/api/cleaning", cleaningData)
  },
  updateCleaning: function (id, data){
    return axios.put("/api/cleaning/" +id, data )
  }
};
