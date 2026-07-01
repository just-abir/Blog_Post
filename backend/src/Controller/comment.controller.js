const blogModel = require("../models/blog.model");
const sendResponse = require("../utils/response.utils");
const commentModel = require("../models/comment.model");

const crateComment = async (res, res) => {
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
  } catch (eror) {}
};
