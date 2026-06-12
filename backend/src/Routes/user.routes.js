const express = require("express");
const router = express.Router();

const userControllerRoutes = require("../Controller/user.controller");

router.post("/register", userControllerRoutes.userRegister);
router.post("/login", userControllerRoutes.userLogin);
router.post("/logout", userControllerRoutes.userLogout);

module.exports = router;
