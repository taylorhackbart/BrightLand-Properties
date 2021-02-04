const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  // "mongodb+srv://brightland:brightland@brightland.fdmwc.mongodb.net/Brightland?retryWrites=true&w=majority"
  process.env.MONGODB_CONNECTION_STRING 
  ||
  "mongodb://localhost/brightland"
);

const rentalSeed = [
  {
    location: "EXAMPLE",
    description: "Example Text",  
    activities: "Example Text",
    homeImage: [""],
    imageUrl: [],
    link: "www.google.com",
    employee: [{
      displayName: "Example",
      username: "example",
      password: "example",
      phoneNumber: "555-555-5555",
      jobType: "Admin",
      cleaning: [{
        name: "Example",
        stopClean: "12:34",
        notes: "Example text",
        images: []
      }]
    }]
  },


];

db.Rental
  .remove({})
  .then(() => db.Rental.collection.insertMany(rentalSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
