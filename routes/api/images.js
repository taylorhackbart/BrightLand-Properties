import express from require ("express");
import Rental from require("../../models");
import ImageRouter from express.Router();
import multer from require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

ImageRouter.route("/uploadmulter")
.post(upload.single("imageData"), (req, res, next) => {
  console.log(req.body);
  const newImage = new Rental({
    imageName: req.body.imageName,
    imageData: req.file.path
  })
  newImage.save()
  .then((result) => {
    res.status(200).json({
      success: true,
      document: result
    })
  })
  .catch(err => next(err))
})