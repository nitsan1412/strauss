const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

// POST /sign in user
router.post("/signin", async (req, res) => {
  return authController.signInUser(req.body, res);
});

// POST /sign up user
router.post("/signup", async (req, res) => {
  return authController.signUpUser(req, res);
});

// DELETE /delete user
router.delete("/delete/:id", async (req, res) => {
  return authController.delete(req, res);
});

module.exports = router;
