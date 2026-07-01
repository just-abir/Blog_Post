import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt || null);
  const formatDate = date.toLocaleDateString("en-GB");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Blog Thumbnail */}
      <img
        src={blog.thumbnail || "https://placehold.co/600x400?text=No+Image"}
        alt={blog.title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        {/* Category */}

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
          {blog.title}
        </h2>

        {/* Author */}
        <div className="flex items-center justify-between gap-3 mt-5">
          <div>
            <p className="text-sm font-semibold">
              {blog.author.firstName} {blog.author.lastName}
            </p>

            <p className="text-xs text-gray-500">{formatDate}</p>
          </div>

          <button
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition duration-300"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
