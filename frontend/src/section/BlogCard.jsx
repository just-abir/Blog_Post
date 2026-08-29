import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog?.createdAt || null);
  const formatDate = !isNaN(date.getTime()) ? date.toLocaleDateString("en-GB") : "";

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Blog Thumbnail */}
        <img
          src={blog?.thumbnail || "https://placehold.co/600x400?text=No+Image"}
          alt={blog?.title || "Blog thumbnail"}
          className="w-full h-52 object-cover"
        />

        {/* Content */}
        <div className="p-5">
          {blog?.category && (
            <span className="inline-block bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2.5">
              {blog.category}
            </span>
          )}

          {/* Title */}
          <h3
            onClick={() => navigate(`/blog-view/${blog?._id}`)}
            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {blog?.title}
          </h3>

          {blog?.subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 line-clamp-2">
              {blog.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Author & Action */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3 border-t border-gray-100 dark:border-slate-800/80 mt-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-200 truncate">
            {blog?.author?.firstName || blog?.author?.name || "Anonymous"}{" "}
            {blog?.author?.lastName || ""}
          </p>
          {formatDate && (
            <p className="text-xs text-gray-500 dark:text-slate-400">{formatDate}</p>
          )}
        </div>

        <button
          onClick={() => navigate(`/blog-view/${blog?._id}`)}
          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shrink-0"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;

