import { setBlog } from "@/Redux/Slice/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const YourBlog = () => {
  const blogs = [
    {
      id: 1,
      title: "Mastering React State Management in 2026",
      category: "Web Development",
      date: "June 28, 2026",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Why Tailwind CSS Rules Modern UI Design",
      category: "CSS & Design",
      date: "June 25, 2026",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=150&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Building Scalable MERN Stack Applications",
      category: "Backend",
      date: "June 20, 2026",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&auto=format&fit=crop&q=60",
    },
  ];

  const dispatch = useDispatch();
  const { blog } = useSelector((state) => state.blog);

  const getOwnBlog = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog/getBlog", {
        withCredentials: true,
      });

      console.log("getown ", res);

      if (res.data.status) {
        dispatch(setBlog(res.data.blogs));
      }

      console.log(res);
    } catch (error) {
      console.log("Error get blog", error);
    }
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  return (
    <div className="w-full max-w-none p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Catalog Table Header - Visible only on medium screens and larger */}
        {/* Column Width breakdown: Title (40%), Category (25%), Date (20%), Action (15%) */}
        <div className="hidden md:flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
          <div className="w-2/5">Title</div>
          <div className="w-1/4">Category</div>
          <div className="w-1/5">Date</div>
          <div className="w-[15%] text-right">Action</div>
        </div>

        {/* Catalog Data Rows list wrapper */}
        <div className="divide-y divide-gray-100">
          {blog.map((elem, id) => (
            <div
              key={id}
              // Responsive switches: Stacks into vertical card slots on mobile, shifts to full row layout on desktop
              className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors gap-4 md:gap-0"
            >
              {/* Main Info Column: Holds thumbnail image and dynamic multi-line title */}
              <div className="w-full md:w-2/5 flex items-center gap-4">
                <img
                  src={elem.image}
                  alt={elem.title}
                  className="w-16 h-12 md:w-20 md:h-14 object-cover rounded-lg bg-gray-100 shrink-0 shadow-sm"
                />
                <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                  {elem.title}
                </h3>
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
                <span>{elem.date}</span>
              </div>

              {/* Action Column: Three-dot trigger with clean alignment mapping */}
              <div className="w-full md:w-[15%] flex md:block items-center justify-between md:text-right">
                <span className="md:hidden text-xs font-semibold text-gray-400 uppercase">
                  Action:
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center justify-center text-gray-500 hover:text-gray-700 md:mr-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2 s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourBlog;
