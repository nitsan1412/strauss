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
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err) {
      console.error("JWT Verification Error:", err);

      return res.status(401).json({ error: "Invalid token" });
    }
    // Attach the decoded token (user info) to the request object
    req.user = decodedUser;
    next();
  });
}

module.exports = { generateToken, verifyToken };
