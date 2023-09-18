const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv"); // If you're using environment variables
const authRoutes = require("./src/routes/auth");
// const userRoutes = require("./src/routes/user");
const candidatesRoutes = require("./src/routes/candidates");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
app.use("/candidates", candidatesRoutes);

// Handle errors and 404 (Not Found)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
