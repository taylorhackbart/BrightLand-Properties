const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  jobType: {
    type: String,
  },
  userCreated: {
    type: Date,
    default: Date.now,
  },
  cleaning: [
    {
      name: {
        type: String,
      },
      startClean: {
        type: Date,
        default: Date.now(),
      },
      stopClean: {
        type: String,
      },
      notes: {
        type: String,
      },
      images: [
        {
          _id: {type: String},
          id: { type: String },
          src: { type: String },
        },
      ],
    },
  ],
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
