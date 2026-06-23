const express = require("express");
const router = require("./Routes/user.routes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", router);

module.exports = app;
