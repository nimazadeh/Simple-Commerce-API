require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

// ===============================
// Global Middleware
// ===============================
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// ===============================
// Routes
// ===============================
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

// ===============================
// Custom Middleware
// ===============================
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// ===============================
// Server
// ===============================
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
