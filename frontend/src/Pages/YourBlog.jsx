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
      console.log("getown1 ", res.data.data);
      if (res.data.success) {
        console.log("getown2 ", res.data.data);
        dispatch(setBlog(res.data.data));
      }

      console.log(res);
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

    // 1. Get day, month name, and year
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }); // Returns "July"
    const year = date.getFullYear();

    // 2. Get time in 12-hour format (pm/am)
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // 3. Combine into the exact format: 3/July/2023 at 5:40 pm
    return `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/blog/deleteBlog/${id}`,
        { withCredentials: true },
      );
      getOwnBlog();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[calc(100vh-80px)] p-6 ">
      <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col">
        {/* Catalog Table Header - Visible only on medium screens and larger */}
        {/* Column Width breakdown: Title (40%), Category (25%), Date (20%), Action (15%) */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
          <div className="w-2/5">Title</div>
          <div className="w-1/4">Category</div>
          <div className="w-1/5">Date</div>
          <div className="w-[15%] text-right">Action</div>
        </div>

        {/* Catalog Data Rows list wrapper */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {blog.map((elem) => (
            <div
              key={elem._id}
              // Responsive switches: Stacks into vertical card slots on mobile, shifts to full row layout on desktop
              className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors gap-4 md:gap-0"
            >
              {/* Main Info Column: Holds thumbnail image and dynamic multi-line title */}
              <div className="w-full md:w-2/5 flex items-center gap-4">
                <img
                  src={elem.thumbnail || null}
                  alt={elem.title}
                  className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg bg-gray-100 shrink-0 shadow-sm"
                />
                <Link
                  to={`/blog-view/${elem._id}`}
                  className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {elem.title}
                </Link>
              </div>

              {/* Category Column: Pill badge layout with inline fallback label for mobile views */}
              <div className="w-full md:w-1/4 flex md:block items-center justify-between">
                <span className="md:hidden text-xs font-semibold text-gray-400 uppercase">
                  Category:
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 max-w-full truncate">
                  {elem.category}
                </span>
              </div>

              {/* Date Column: Text layout with inline fallback label for mobile views */}
              <div className="w-full md:w-1/5 flex md:block items-center justify-between text-sm text-gray-500">
                <span className="md:hidden text-xs font-semibold text-gray-400 uppercase">
                  Date:
                </span>
                <span>{formatBlogDate(elem.createdAt)}</span>
              </div>

              {/* Action Column: Three-dot trigger with clean alignment mapping */}
              <div className="relative w-full md:w-[15%] flex md:block items-center justify-between md:text-right">
                <span className="md:hidden text-xs font-semibold text-gray-400 uppercase">
                  Action:
                </span>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === elem._id ? null : elem._id)
                  }
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        navigate(`/dashboard/write-blog/${elem._id}`);
                        console.log("Edit", elem._id);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => {
                        deleteBlog(elem._id);
                        console.log("Delete", elem._id);
                        setOpenMenu(null);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourBlog;
