const express = require("express");
const authController = require("../controllers/authControllers");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.post("/signup", authController.Signup);
router.post("/login", authController.login);

// New protected routes
router.get("/protected-content1", verifyToken, (req, res) => {
  res.status(200).json({
    status: "success",
    message: `User name: ${req.user.name}`, // Returning the user's name
    user: req.user,
  });
  console.log(req.user.name);
});

router.get("/protected-content2", verifyToken, (req, res) => {
  res.status(200).json({
    status: "success",
    message: `User email: ${req.user.email}`, // Returning the user's email
    user: req.user,
  });
  console.log(req.user.email);
});

module.exports = router;
