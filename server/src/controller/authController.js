const jwt = require("jsonwebtoken");
const dataAccess = require("./data-access"); // Import your user model
const User = require("../models/User");

// Controller function for user login
exports.signInUser = (req, res) => {
  const { username, password } = req;
  // Find the user by username
  dataAccess.findUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error finding user" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    dataAccess.comparePassword(
      password,
      user.password,
      (bcryptErr, isMatch) => {
        if (bcryptErr) {
          return res.status(500).json({ error: "Error comparing passwords" });
        }
        if (!isMatch) {
          return res.status(401).json({ error: "Wrong password" });
        }
        // Generate a token for the authenticated user
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });
      }
    );
  });
};

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User(username, email, password);
  console.log("newUser", newUser);

  await dataAccess.isNewUser(newUser, (err, existingUsers) => {
    console.log("existingUsers", existingUsers);
    if (err) {
      return callback(err);
    }
    if (existingUsers) {
      return res.status(401).json({ error: "this username allready exists" });
    }
    dataAccess.createUser(newUser, (err, userId) => {
      if (err) {
        if (err.errno == 19)
          return res
            .status(401)
            .json({ error: "this email allready in use for a different user" });
        else return res.status(500).json({ error: "Could not create user" });
      }
      // this.signInUser(newUser, (err, token) => {
      //   if (err) {
      //     return res.status(500).json({ error: "Could not login user" });
      //   }
      return res.status(201).json({ message: "User created", userId });
      // });
    });
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  await dataAccess.deleteUser(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    console.log("row", row);
    if (row) {
      res.status(200).json({ message: "Delete successful" });
    }
    return res.status(500).json({ error: "no user with this ID in the DB" });
  });
};
