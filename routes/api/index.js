const router = require("express").Router();
const userRoutes = require("./user");
const cloudinaryRoutes = require("./cloudinary")
const cleaningRoutes = require("./cleaning")

// Book routes
router.use("/property", userRoutes);
router.use("/cloud", cloudinaryRoutes)
router.use("/cleaning", cleaningRoutes)

module.exports = router;
