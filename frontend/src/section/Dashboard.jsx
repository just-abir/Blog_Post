import Sidebar from "@/Pages/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="pt-16 min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-200">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;

