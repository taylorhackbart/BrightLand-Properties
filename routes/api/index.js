const router = require("express").Router();
const userRoutes = require("./user");
const cloudinaryRoutes = require("./cloudinary")
// const loginRoutes = require("./login")

// Book routes
router.use("/property", userRoutes);
router.use("/cloud", cloudinaryRoutes)

module.exports = router;
