const blogModel = require("../models/blog.model");
const sendResponse = require("../utils/response.utils");
const commentModel = require("../models/comment.model");

const crateComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commenterUserId = req.id;

    const { content } = req.body;
    const blog = await blogModel.findById(postId);

    if (!content) {
      return sendResponse(res, 400, false, "Text is requerd");
    }

    const comment = await commentModel.create({
      content,
      userId: commenterUserId,
      postId: postId,
    });
    await comment.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    blog.comments.push(comment._id);

    await blog.save();

    sendResponse(res, 201, true, "comment add", comment);
  } catch (eror) {
    console.log(error);
  }
};

const getCommentPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await commentModel
      .find({ postId: blogId })
      .populate({ path: "userId", select: "firstName lastName photoUrl" })
      .sort({ createdAt: -1 });

    if (!comments) {
      sendResponse(res, 404, false, "no Comments found ");
    }
    sendResponse(res, 200, true, "commentd success", comments);
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      sendResponse(res, 404, false, "comment not found");
    }

    const blogId = comment.postId;

    await commentModel.findByIdAndDelete(commentId);

    await blogModel.findByIdAndUpdate(blogId, {
      $pull: { comments: commentId },
    });

    sendResponse(res, 200, "comment done delet");
  } catch (error) {
    sendResponse(res, 500, false, "error deleting comment");
  }
};

const editeComment = async (req, res) => {
  try {
    const userId = req.id;
    const { content } = req.body;
    const commentId = req.params.id;
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      sendResponse(res, 404, false, "commenet not found");
    }
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this comment",
      });
    }
    comment.content = content;
    comment.editedAt = new Date();

    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    sendResponse(res, 500, false, error);
  }
};

const likeComment = async (req, res) => {
  try {
    const userId = req.id; // Assuming you're using auth middleware to get user ID
    const commentId = req.params.id;

    const comment = await commentModel.findById(commentId).populate("userId");
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    const alreadyLiked = comment.like.includes(userId);

    if (alreadyLiked) {
      // If already liked, unlike it
      comment.like = comment.like.filter((id) => id !== userId);
      comment.numberOfLikes -= 1;
    } else {
      // If not liked yet, like it
      comment.like.push(userId);
      comment.numberOfLikes += 1;
    }
    await comment.save();
    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Comment unliked" : "Comment liked",
      updatedComment: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while liking the comment",
      error: error.message,
    });
  }
};

const getAllCommentOnMyBLog = async (req, res) => {
  try {
    const userId = req.id;
    const myBlogs = await blogModel.find({ author: userId }).select("_id");
    const blogIds = myBlogs.map((blog) => blog._id);

    if (blogIds.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "No blogs found for this user.",
      });
    }

    const comments = await commentModel
      .find({ postId: { $in: blogIds } })
      .populate("userId", "firstName lastName email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments on user's blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments.",
    });
  }
};

module.exports = {
  crateComment,
  getCommentPost,
  deleteComment,
  editeComment,
  likeComment,
  getAllCommentOnMyBLog,
};
