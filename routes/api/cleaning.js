const router = require("express").Router();
const cleaningController = require("../../controllers/cleaningController");

// Matches with "/api/user"
router.route("/")
  .get(cleaningController.findAll)
  .post(cleaningController.create);

// Matches with "/api/cleaning/:id"
router
  .route("/:id")
  .get(cleaningController.findById)
  .put(cleaningController.update)
  .delete(cleaningController.remove);

//   router
// .route("/name/:location")
// .get(cleaningController.findAllByName)
// .put(cleaningController.update)

module.exports = router;