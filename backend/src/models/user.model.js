const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    userName: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    occupation: {
      type: String,
      default: "",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    socialLinks: {
      instagram: {
        type: String,
        default: "",
      },

      facebook: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      github: {
        type: String,
        default: "",
      },

      website: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },
    },

    location: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
