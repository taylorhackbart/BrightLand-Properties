const mongoose = require("mongoose");

const Schema = mongoose.Schema

const CleaningSchema = new Schema({
  property: {
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
})
const Cleaning = mongoose.model("Cleaning", CleaningSchema)

module.exports = Cleaning;