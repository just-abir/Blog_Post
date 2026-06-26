const express = require("express");
const router = express.Router();

const userControllerRoutes = require("../Controller/user.controller");

const isUserAuth = require("../middlewares/userAuth.middleware");

const singleUpload = require("../middlewares/multer.middleware");

router.post("/register", userControllerRoutes.userRegister);
router.post("/login", userControllerRoutes.userLogin);
router.post("/logout", userControllerRoutes.userLogout);
router.put(
  "/update-profile",
  isUserAuth,
  singleUpload,
  userControllerRoutes.updateProfile,
);

module.exports = router;
