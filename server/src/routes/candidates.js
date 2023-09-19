const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth.middleware"); // Import the token verification middleware
const candidatesController = require("../controller/candidatesController"); // Import the user controller

const router = express.Router();

// // POST /signInUser
// router.post("/signIn", async (req, res) => {
//   return authController.signInUser(req.body);
// });

router.get("/:page/:limit", verifyToken, async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  return candidatesController.getAllCandidates(
    { limit: limit, offset: (page - 1) * limit },
    res
  );

  // res.status(200).json({ userId, username });
});

router.get("/", verifyToken, async (req, res) => {
  // Access user information from req.user
  // const { userId, username } = req.user;
  return candidatesController.getAllCandidates(req, res);

  // res.status(200).json({ userId, username });
});

module.exports = router;
