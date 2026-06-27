const sendResponse = require("../utils/response.utils");
const blogModel = require("../models/blog.model");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("../utils/cloudinary");

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

module.exports = { createBlog, updateBlog };
