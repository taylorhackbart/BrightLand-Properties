const router = require("express").Router();
const userRoutes = require("./user");

// Book routes
router.use("/property", userRoutes);

module.exports = router;
