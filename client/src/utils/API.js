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
  // getImage: function(){
  //   return axios.get("/api/image")
  // },

  // uploadImage: function(data){
  //   return axios.post('/api/image', data)
  // },

  getImages: function(){
    return axios.get('/api/cloud')
  },

  sendToCloud: function(formData){
    return axios.post('/api/cloud', formData)
  },
  getUsers: function() {
    return axios.get("/users")
  },
  getCleaning: function (){
    return axios.get("/api/cleaning")
  },
  saveCleaning: function (cleaningData) {
    return axios.post("/api/cleaning", cleaningData)
  }
};
