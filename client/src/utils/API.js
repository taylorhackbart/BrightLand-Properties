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
  },
  getSunset: function(search){
    return axios.get("https://api.sunrise-sunset.org/json" + search)
  },
  getCity: function(search){
    return axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ddb7dc274b3d157577d5acb1cd78e0a6`
    })
  }
};
