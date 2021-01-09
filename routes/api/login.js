const router = require("express").Router();
const loginController = require("../../controllers/loginController");

router.route("/")
  .get(loginController.findAll)
  .post(loginController.create)
  

module.exports = router