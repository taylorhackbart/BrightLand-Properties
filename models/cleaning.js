const mongoose = require("mongoose");

const Schema = mongoose.Schema

const CleaningSchema = new Schema({
  property: {
    type: String
  },
  startClean: {
    type: Date
  },
  stopClean: {
    type: Date
  },
  images: {
    type: String
  }
})
const Cleaning = mongoose.model("Cleaning", CleaningSchema)

module.exports = Cleaning;