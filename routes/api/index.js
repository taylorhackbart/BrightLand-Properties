const router = require("express").Router();
const userRoutes = require("./user");
const cloudinaryRoutes = require("./cloudinary")
const imageRoutes = require("./image")

// Book routes
router.use("/property", userRoutes);
router.use("/cloud", cloudinaryRoutes)
// router.use("/image", imageRoutes)
module.exports = router;
