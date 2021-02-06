const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  location: { type: String},
  employee: [{
    displayName: {
      type: String
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
      type: String
    },
    userCreated: {
      type: Date,
      default: Date.now
    },
    cleaning: [{
      name: {
        type: String
      },
      startClean: {
        type: Date,
        default: Date.now()
      },
      stopClean: {
        type: String
      },
      notes: {
        type: String
      },
      images: [{
        type: String
      }]
    }],
  }],
  description: { type: String },

  activities: {type: String},
  link: {type: String},
  homeImage: [{type: String}],
  imageUrl: [{
    _id: {type: String},
    id: {type: String},
    src: {type: String}
  }],

  userCreated: {
    type: Date,
    default: Date.now
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
