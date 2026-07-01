const sendResponse = require("../utils/response.utils");
const blogModel = require("../models/blog.model");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");
const userModel = require("../models/user.model");

const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      sendResponse(res, 400, false, "Blog title & Category is required");
    }

    const blog = await blogModel.create({
      title,
      category,
      author: req.id,
    });

    console.log("hi", blog);

    return sendResponse(res, 201, true, "Blog created Successfully", blog);
  } catch (error) {
    console.log("Eror", error);
    return sendResponse(res, 500, false, error.message);
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category } = req.body;

    const file = req.file;

    let blog = await blogModel.findById(blogId);

    if (!blog) {
      sendResponse(res, 404, false, "Blog not found");
    }
    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri.content);
    }

    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
      thumbnail: thumbnail?.secure_url,
    };

    blog = await blogModel.findByIdAndUpdate(blogId, updateData, {
      returnDocument: "after",
    });

    sendResponse(res, 200, true, "Blog updated successfully", updateData);
  } catch (error) {
    console.log("error upade ", error.message);
    sendResponse(res, 500, false, error.message);
  }
};

const getOwnBlog = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return sendResponse(res, 400, false, "User id is required");
    }

    const blogs = await blogModel
      .find({ author: userId })
      .populate({ path: "author", select: "firstName lastName photoUrl" });

    if (!blogs) {
      return sendResponse(res, 404, false, "No blogs found");
    }

    sendResponse(res, 200, true, "Get blogs successfully fetched", blogs);
  } catch (error) {
    sendResponse(res, 500, false, "Error fetching blosg");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      sendResponse(res, 404, false, "Blog not found ");
    }

    if (blog.author.toString() !== authorId) {
      sendResponse(res, 403, false, "unauthorized to delete the blog");
    }

    await blogModel.findByIdAndDelete(blogId);
    sendResponse(res, 200, true, "Blog deleted success");
  } catch (error) {
    sendResponse(res, 500, false, "Error to delete blosg");
  }
};

const getPublishBlog = async (res, req) => {
  try {
    const blog = (await blogModel.find({ isPublished: true }))
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "firstName lastName, photoUrl" });

    if (!blog) {
      return sendResponse(res, 401, false, "Blog not found ");
    }
    return sendResponse(res, 200, true, "Published blog Successfully", blog);
  } catch (error) {
    return sendResponse(res, 500, false, "Error to published blog");
  }
};

const togglePublishedBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { publish } = req.query;

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return sendResponse(res, 404, false, "Blog not found ");
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";
    return sendResponse(res, 200, true, `Blog is ${statusMessage}`);
  } catch (error) {
    sendResponse(res, 500, false, "Failed to updated Status");
  }
};

const likeInBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeUser = req.id;

    const blog = await blogModel.findById(blogId).populate({ path: "like" });
    if (!blog) {
      sendResponse(res, 404, false, "Blog not found");
    }

    await blog.updateOne({ $addToSet: { like: likeUser } });
    await blog.save();

    return sendResponse(res, 200, true, "Blog liked");
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

const dislikeInBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const likeUser = req.id;

    const blog = await blogModel.findById(blogId);
    if (!blog) {
      sendResponse(res, 404, false, "Blog not found");
    }

    await blog.updateOne({ $pull: { like: likeUser } });
    await blog.save();

    return sendResponse(res, 200, true, "Blog disliked");
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

const getMyTotalBlogLikes = async (req, res) => {
  try {
    const userId = req.id;
    const myBlogs = await blogModel.find({ author: userId }).select("like");

    const totalLikes = myBlogs.reduce(
      (acc, blog) => acc + (blog.like?.length || 0),
      0,
    );
    return res.status(200).json({
      success: true,
      totalBlogs: myBlogs.length,
      totalLikes,
    });
  } catch (error) {
    sendResponse(res, 500, false, "failed to fettch total blogs like");
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getOwnBlog,
  deleteBlog,
  getPublishBlog,
  togglePublishedBlog,
  likeInBlog,
  dislikeInBlog,
  getMyTotalBlogLikes,
};
