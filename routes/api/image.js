const router = require("express").Router();
const imageController = require("../../controllers/imageController");

router.route("/")
  .get(imageController.findAll)
  .post(imageController.create)
  

module.exports = router