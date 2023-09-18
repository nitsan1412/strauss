const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.HASH_SALT;

// Create a database connection to a SQLite database file
const db = new sqlite3.Database(
  path.join(__dirname, "..", "data", "../db/db.sqlite")
);

exports.createUser = (user, callback) => {
  const { username, email, password } = user;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return callback(err);
    }
    db.run(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  });
};

exports.isNewUser = (data, callback) => {
  const { username } = data;
  db.get("SELECT * FROM user WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.log("err in isNewUser", err);
      return callback(err);
    }
    return callback(null, rows);
  });
};

exports.findUserByUsername = (username, callback) => {
  db.get("SELECT * FROM user WHERE username = ?", [username], (err, row) => {
    if (err) {
      return callback(err);
    }
    callback(null, row);
  });
};

// Export a function to compare passwords during login
exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    console.log("isMatch", isMatch);
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

exports.getAllCandidates = (callback) => {
  db.all("SELECT * FROM candidate ", (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
};

exports.deleteUser = (userId, callback) => {
  db.get("DELETE FROM user WHERE id = ? ", [userId], (err, row) => {
    if (err) {
      return callback(err.message);
    }
    return callback(null, row);
  });
};

// const {
//   "user":{table:"user", colums:""}
// }
