const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware");
const Login = require("../../models/login");

// router.get("/test", (req, res) => {
//   res.send("working")
// })
const key = "nc2y3849p384cyn2938470n239492nc083"
router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName, jobType, phoneNumber } = req.body;

    // validate

    if (!email || !password || !passwordCheck )
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await Login.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;
    
    //storing the password in the database using encryption 
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Login({
      email,
      password: passwordHash,
      displayName,
      jobType,
      phoneNumber
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await Login.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, key);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        jobType: user.jobType
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await Login.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, key);
    if (!verified) return res.json(false);

    const user = await Login.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  // const user = await Login.findById(req.user);
  // console.log(req)
  const token = req.header("x-auth-token");
  if (!token) return res.json(false);

  const verified = jwt.verify(token, key);
  if (!verified) return res.json(false);

  const user = await Login.findById(verified.id);
  if (!user) return res.json(false);

  return (
  
  res.json({
    // token,
    displayName: user.displayName,
    id: user._id,
    jobType: user.jobType
  }));
});
router.get("/register", async (req, res) => {
  const user = await Login.find();
  console.log(user)
  res.json(user);
});

module.exports = router;