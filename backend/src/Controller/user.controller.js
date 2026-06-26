const userModel = require("../models/user.model");
const validateUserRegister = require("../Validators/user.validators");
const sendResponse = require("../utils/response.utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");

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
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    const user = isUserExist.toObject();
    delete user.password;

    return sendResponse(res, 200, true, "user login success", user);
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

const updateProfile = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    const userId = req.id;
    const {
      firstName,
      lastName,
      userName,
      email,
      bio,
      occupation,
      location,
      instagram,
      facebook,
      linkedin,
      github,
      website,
      twitter,
    } = req.body;

    const file = req.file;
    let cloudResponse;

    if (file) {
      const fileUri = getDataUri(file);

      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    console.log(cloudResponse);
    // Find User
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    // Update Profile
    if (firstName) user.firstName = firstName;

    if (lastName) user.lastName = lastName;

    if (userName) user.userName = userName;

    if (email) user.email = email;

    if (bio) user.bio = bio;

    if (occupation) user.occupation = occupation;

    if (location) user.location = location;

    // Social Links
    if (instagram) user.socialLinks.instagram = instagram;

    if (facebook) user.socialLinks.facebook = facebook;

    if (linkedin) user.socialLinks.linkedin = linkedin;

    if (github) user.socialLinks.github = github;

    if (website) user.socialLinks.website = website;

    if (twitter) user.socialLinks.twitter = twitter;
    // Update Image
    if (cloudResponse) {
      user.photoUrl = cloudResponse.secure_url;
    }

    await user.save();

    console.log(user);
    console.log(user.occupation);
    console.log(user.socialLinks.facebook);

    return sendResponse(res, 200, true, "Profile updated successfully", user);
  } catch (error) {
    return sendResponse(res, 500, false, error.message);
  }
};

module.exports = { userRegister, userLogin, userLogout, updateProfile };
