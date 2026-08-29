const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    like: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const commentModel = mongoose.model("Comment", commentSchema);
module.exports = commentModel;
