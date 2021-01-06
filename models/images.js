const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    imageUrl: {
      type: String,
    },
    userCreated: {
      type: Date,
      default: Date.now
    }
});

const Images = mongoose.model("Images", ImagesSchema);

module.exports = Images;