const express = require("express");
const { verifyToken } = require("../logic/jwtToken");
const candidatesController = require("../controller/candidatesController");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const page = req.query.page && parseInt(req.query.page);
  const limit = req.query.limit && parseInt(req.query.limit);
  return candidatesController.getAllCandidates(
    { limit: limit, offset: (page - 1) * limit },
    res
  );
});

router.get("/", verifyToken, async (req, res) => {
  return candidatesController.getAllCandidates(null, res);
});

module.exports = router;
