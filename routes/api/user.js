const router = require("express").Router();
const rentalController = require("../../controllers/userController");

// Matches with "/api/user"
router.route("/")
  .get(rentalController.findAll)
  .post(rentalController.create);

// Matches with "/api/rental/:id"
router
  .route("/:id")
  .get(rentalController.findById)
  .put(rentalController.update)
  .delete(rentalController.remove);

  router
.route("/name/:location")
.get(rentalController.findAllByName)
.put(rentalController.update)

module.exports = router;
