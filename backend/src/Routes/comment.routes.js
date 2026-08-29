const express = require("express");
const router = express.Router();

const commentController = require("../Controller/comment.controller");

const isUserAuth = require("../middlewares/userAuth.middleware");

router.post("/:id/create", isUserAuth, commentController.crateComment);

router.get("/:id/comment/all", commentController.getCommentPost);

router.delete("/:id/delete", isUserAuth, commentController.deleteComment);

router.put("/:id/edit", isUserAuth, commentController.editeComment);

router.post("/:id/like", isUserAuth, commentController.likeComment);

router.get(
  "/myBlog/comments",
  isUserAuth,
  commentController.getAllCommentOnMyBLog,
);

module.exports = router;
