const Candidate = require("../models/Candidate");
const dataAccess = require("./data-access");

// Controller function to handle user registration
exports.getAllCandidates = (req, res) => {
  const { limit, offset } = req;
  dataAccess.getAllCandidates(
    limit ? limit : null,
    offset ? offset : null,
    (err, candidates) => {
      if (err) {
        return res.status(500).json({ error: "Could not get candidates" });
      }
      res.status(201).json({ candidates });
    }
  );
};

// Controller function to handle user retrieval by username
exports.getUserByUsername = (req, res) => {
  const { username } = req.params;

  userModel.findUserByUsernameAndPassword(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error finding user" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  });
};
