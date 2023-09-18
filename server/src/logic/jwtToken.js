const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    username: user.username,
  };

  const options = {
    expiresIn: "1h", // Set the token to expire in 1 hour (adjust as needed)
  };

  return jwt.sign(payload, jwtSecret, options);
}

function verifyToken(token, user) {
  const payload = {
    username: user.username,
  };
  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) return err;
    else if (decoded.username !== payload.username)
      return {
        err: {
          name: "wrongToken",
          message: "wrong jwt token",
        },
      };
    else return true;
  });
}

module.exports = { generateToken };
