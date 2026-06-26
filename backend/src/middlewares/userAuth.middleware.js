const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response.utils");
const userModel = require("../models/user.model");

const isUserAuth = (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return sendResponse(res, 401, false, "Please Login First");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      sendResponse(res, 404, false, "Invalid token");
    }

    req.id = decode.id;

    next();
  } catch (error) {
    console.log(error);
    return sendResponse(res, 401, false, "Invalid Token");
  }
};

module.exports = isUserAuth;
