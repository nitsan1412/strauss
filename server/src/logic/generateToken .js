const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h", // Set the token to expire in 1 hour (adjust as needed)
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = { generateToken };
