const express = require("express");
const { verifyToken } = require("../logic/jwtToken");
const candidatesController = require("../controller/candidatesController");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const page = (req.query.page && parseInt(req.query.page)) || 1;
  const limit = (req.query.limit && parseInt(req.query.limit)) || null;
  return candidatesController.getAllCandidates(
    { limit: limit, offset: (page - 1) * limit },
    res
  );
});

module.exports = router;
