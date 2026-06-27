const express = require("express");
const router = require("./Routes/user.routes");
const blogRouter = require("./Routes/blog.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Tomar frontend port exact bole dite hobe
    credentials: true, // Allow cookies/headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Request dynamic update limits
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

module.exports = app;
