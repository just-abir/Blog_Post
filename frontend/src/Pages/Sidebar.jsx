import React from "react";
import { NavLink } from "react-router-dom";
import { User, FileText, MessageSquare, SquarePen } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { to: "/dashboard/profile", label: "Profile", icon: User },
    { to: "/dashboard/your-blog", label: "Your Blog", icon: FileText },
    { to: "/dashboard/comments", label: "Comments", icon: MessageSquare },
    { to: "/dashboard/create-blog", label: "Create Blog", icon: SquarePen },
  ];

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-800 p-3 sm:p-4 shrink-0 transition-colors duration-200">
      <nav className="flex md:flex-col gap-1.5 overflow-x-auto pb-1 md:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `h-10 sm:h-11 flex items-center gap-2.5 px-3.5 sm:px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

