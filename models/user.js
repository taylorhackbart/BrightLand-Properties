const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  activities: {type: String, required: true},
  imageName: {type: String, required: true},
  imageData:{ type: String, required: true}
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
