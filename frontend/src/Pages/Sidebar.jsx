import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white p-5">
      <nav className="flex flex-col gap-2">
        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/profile"
        >
          Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/your-blog"
        >
          Your Blog
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/comments"
        >
          Comments
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/create-blog"
        >
          Create Blog
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
