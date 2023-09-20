const jwt = require("jsonwebtoken");
const dataAccess = require("./data-access"); // Import your user model
const { generateToken } = require("../logic/jwtToken");
const comparePassword = require("../logic/comparePassword");

exports.signInUser = async (req, res) => {
  try {
    const { username, password } = req;
    const user = await dataAccess.findItem("user", { username: username });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isMatch = await comparePassword.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }
    const token = await generateToken({
      userId: user.id,
      username: user.username,
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

exports.signUp = async (req, res) => {
  try {
    const existingUser = await dataAccess.findItem("user", {
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(501).json({ error: "this username allready exists" });
    } else {
      try {
        const userCreated = await dataAccess.createItem("user", req.body);
        if (userCreated)
          return res.status(201).json({ message: "User created" });
        else
          return res.status(502).json({
            error: "this email allready in use for a different user",
          });
      } catch (error) {
        if (error.errno == 19)
          // UNIQUE constraint failed: user.email
          return res.status(502).json({
            error: "this email allready in use for a different user",
          });
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await dataAccess.deleteItem("user", { id: id }).then((err, row) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (row) {
      res.status(200).json({ message: "Delete successful" });
    }
    return res.status(500).json({ error: "no user with this ID in the DB" });
  });
};
