const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
// const verifyToken = require("./middleware/auth");

const PORT = 2000;
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTE
app.use("/api/auth", authRouter);

// MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://pgirishgiri123:2wEnJmMHK0Kv4fin@backenddb.fn62npu.mongodb.net/Authentication"
  )
  .then(() => console.log("MongoDb connected Successfully!!"))
  .catch((err) => console.log("Failed to connect MongoDb :", err));

// GLOBAL ERROR HANDLER
app.use((err, res, req, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// SERVER
app.listen(PORT, () => {
  console.log(`App is running Successfully on ${PORT}`);
});
