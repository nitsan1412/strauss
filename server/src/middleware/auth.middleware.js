const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
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

module.exports = { verifyToken };
