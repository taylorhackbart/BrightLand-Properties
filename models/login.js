const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    fname: {
      type: String
    },
    lname: {
      type: String
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    jobType: {
      type: String
    },
    userCreated: {
      type: Date,
      default: Date.now
    }
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;