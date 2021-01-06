const express = require("express");
// const fileUpload = require("express-fileupload")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(fileUpload({
//   createParentPath: true
// }))
app.use(cors());
app.use(morgan("dev"))

// app.post("/picture", async (req, res) => {
//   try{
//     if(!req.files){
//       res.send({
//         status: false,
//         message: "No files"
//       })
//     } else {
//       const {picture} = req.files
//       picture.mv("./upload/s" + picture.name)
//       res.send({
//         status: true,
//         message: "File has been uploaded"
//       })
//     }
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })



// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/brightland", options
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
