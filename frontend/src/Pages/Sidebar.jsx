import React from "react";
import { NavLink } from "react-router-dom";
import { User, FileText, MessageSquare, SquarePen } from "lucide-react";
const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white p-5">
      <nav className="flex flex-col gap-2">
        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center gap-3 px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/profile"
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center gap-3 px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/your-blog"
        >
          <FileText size={20} />
          <span>Your Blog</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center gap-3 px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/comments"
        >
          <MessageSquare size={20} />
          <span>Comments</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `h-12 flex items-center gap-3 px-4 rounded-lg transition-all duration-200 ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
            }`
          }
          to="/dashboard/create-blog"
        >
          <SquarePen size={20} />
          <span>Create Blog</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
