import { setBlog } from "@/Redux/Slice/blogSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const YourBlog = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);
  const navigate = useNavigate();

  const getOwnBlog = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/getBlog", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setBlog(res.data.data));
      }
    } catch (error) {
      console.log("Error get blog", error);
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  const formatBlogDate = (isoDateString) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return "";

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/blog/deleteBlog/${id}`,
        { withCredentials: true },
      );
      getOwnBlog();
    } catch (error) {
      console.log("Delete blog error:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-colors duration-200">
        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Published & Draft Articles
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
              Manage, edit, or delete all your articles from one place.
            </p>
          </div>
          <Link
            to="/dashboard/create-blog"
            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap"
          >
            + Create New Blog
          </Link>
        </div>

        {/* Catalog Table Header */}
        <div className="hidden md:flex items-center justify-between px-6 py-3.5 bg-gray-50 dark:bg-slate-800/60 border-b border-gray-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400">
          <div className="w-2/5">Article</div>
          <div className="w-1/4">Category</div>
          <div className="w-1/5">Date</div>
          <div className="w-[15%] text-right">Actions</div>
        </div>

        {/* Catalog Data Rows list */}
        <div className="divide-y divide-gray-100 dark:divide-slate-800/80">
          {blog && blog.length > 0 ? (
            blog.map((elem) => (
              <div
                key={elem._id}
                className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors gap-3 md:gap-0"
              >
                {/* Main Info Column */}
                <div className="w-full md:w-2/5 flex items-center gap-3 sm:gap-4">
                  <img
                    src={elem.thumbnail || "https://placehold.co/100x70?text=Blog"}
                    alt={elem.title}
                    className="w-14 h-11 sm:w-16 sm:h-12 object-cover rounded-lg bg-gray-100 dark:bg-slate-800 shrink-0 border border-gray-200 dark:border-slate-700"
                  />
                  <Link
                    to={`/blog-view/${elem._id}`}
                    className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {elem.title}
                  </Link>
                </div>

                {/* Category Column */}
                <div className="w-full md:w-1/4 flex md:block items-center justify-between">
                  <span className="md:hidden text-xs font-bold text-gray-500 dark:text-slate-400">
                    Category:
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                    {elem.category || "General"}
                  </span>
                </div>

                {/* Date Column */}
                <div className="w-full md:w-1/5 flex md:block items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                  <span className="md:hidden text-xs font-bold text-gray-500 dark:text-slate-400">
                    Date:
                  </span>
                  <span>{formatBlogDate(elem.createdAt)}</span>
                </div>

                {/* Action Column */}
                <div className="relative w-full md:w-[15%] flex md:block items-center justify-between md:text-right">
                  <span className="md:hidden text-xs font-bold text-gray-500 dark:text-slate-400">
                    Action:
                  </span>

                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === elem._id ? null : elem._id)
                    }
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-600 dark:text-slate-300 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2 .9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>

                  {openMenu === elem._id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-1">
                      <button
                        onClick={() => {
                          navigate(`/dashboard/write-blog/${elem._id}`);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => {
                          deleteBlog(elem._id);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500 dark:text-slate-400 font-bold">
              You haven't created any blogs yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourBlog;

