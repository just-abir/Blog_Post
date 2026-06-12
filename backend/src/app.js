const express = require("express");
const router = require("./Routes/user.routes");
const app = express();

app.use(express.json());
app.use("/api/user", router);

module.exports = app;
