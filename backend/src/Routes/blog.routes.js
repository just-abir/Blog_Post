const express = require("express");
const router = express.Router();

const userControllerRoutes = require("../Controller/user.controller");
const blogControllerRoutes = require("../Controller/blog.controller");

const isUserAuth = require("../middlewares/userAuth.middleware");

const singleUpload = require("../middlewares/multer.middleware");

console.log("isUserAuth:", typeof isUserAuth);
console.log("blogControllerRoutes:", blogControllerRoutes);
console.log("createBlog:", typeof blogControllerRoutes.createBlog);

router.post("/create", isUserAuth, blogControllerRoutes.createBlog);
router.put(
  "/update/:blogId",
  isUserAuth,
  singleUpload,
  blogControllerRoutes.updateBlog,
);
router.get("/getBlog", isUserAuth, blogControllerRoutes.getOwnBlog);
router.delete("/deleteBlog/:id", isUserAuth, blogControllerRoutes.deleteBlog);

router.get("/getPublishBlog/", blogControllerRoutes.getPublishBlog);

router.patch(
  "/togglePublishBlog/:id",
  blogControllerRoutes.togglePublishedBlog,
);

router.post("/:id/likeBlog", isUserAuth, blogControllerRoutes.likeInBlog);

router.post("/:id/dislikeBlog", isUserAuth, blogControllerRoutes.dislikeInBlog);

router.get(
  "/allBlogLike/",
  isUserAuth,
  blogControllerRoutes.getMyTotalBlogLikes,
);

module.exports = router;
