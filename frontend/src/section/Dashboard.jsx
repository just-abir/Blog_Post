import Sidebar from "@/Pages/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-[94vh] mt-[6vh]">
      <Sidebar />

      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
