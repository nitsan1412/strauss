const bcrypt = require("bcryptjs");

// Function to generate a JWT token
async function compare(candidatePassword, hash) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, hash);
    return isMatch;
  } catch (err) {
    // Handle the error here if needed
    console.error("Error in compare:", err);
    throw err;
  }
}

module.exports = { compare };
