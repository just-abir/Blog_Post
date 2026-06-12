const userModel = require("../models/user.model");
const validateUserRegister = require("../Validators/user.validators");
const sendResponse = require("../utils/response.utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const validationError = validateUserRegister({
      userName,
      email,
      password,
    });

    if (validationError) {
      return sendResponse(res, 409, false, validationError);
    }

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return sendResponse(res, 409, false, "Email alreday exsits");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      email,
      password: passwordHash,
    });

    return sendResponse(res, 201, true, "user register success");
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await userModel.findOne({ email }).select("+password");
    if (!isUserExist) {
      return sendResponse(res, 404, false, "user not mathcfound");
    }

    const passwordDecode = await bcrypt.compare(password, isUserExist.password);

    if (!passwordDecode) {
      return sendResponse(res, 404, false, "Invalid password");
    }

    const jwtToken = jwt.sign(
      { id: isUserExist._id, email: isUserExist.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return sendResponse(res, 200, true, "user login success");
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");

    return sendResponse(res, 200, true, "Logout success");
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = { userRegister, userLogin, userLogout };
