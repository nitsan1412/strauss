const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth.middleware"); // Import the token verification middleware
const candidatesController = require("../controller/candidatesController"); // Import the user controller

const router = express.Router();

// // POST /signInUser
// router.post("/signIn", async (req, res) => {
//   return authController.signInUser(req.body);
// });

// Example protected route that requires authentication
router.get("/getAllcandidates", verifyToken, async (req, res) => {
  // Access user information from req.user
  // const { userId, username } = req.user;
  return candidatesController.getAllCandidates(req, res);

  // res.status(200).json({ userId, username });
});

module.exports = router;
