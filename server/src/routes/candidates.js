const express = require("express");
const { verifyToken } = require("../logic/jwtToken");
const candidatesController = require("../controller/candidatesController");

const router = express.Router();

router.get("/:page/:limit", verifyToken, async (req, res) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit);
  return candidatesController.getAllCandidates(
    { limit: limit, offset: (page - 1) * limit },
    res
  );
});

router.get("/", verifyToken, async (req, res) => {
  return candidatesController.getAllCandidates(null, res);
});

module.exports = router;
