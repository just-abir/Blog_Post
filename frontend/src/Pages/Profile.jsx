import UserPopup from "@/Features/UserPopup";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagramSquare,
  FaGithubSquare,
} from "react-icons/fa";
import userLogo from "../assets/userLogo.jpg";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors duration-200">
        {/* Left Side */}
        <div className="flex w-full flex-col items-center text-center lg:w-1/3">
          <img
            src={user?.photoUrl || userLogo}
            alt="profile"
            className="h-36 w-36 sm:h-40 sm:w-40 rounded-full border-4 border-emerald-500/30 object-cover shadow-sm"
          />

          <p className="mt-4 font-bold text-sm text-gray-700 dark:text-slate-300">
            {user?.occupation || "No occupation added."}
          </p>

          <div className="mt-4 flex gap-4 text-2xl">
            {user?.socialLinks?.linkedin && (
              <a
                href={user.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <FaLinkedin />
              </a>
            )}

            {user?.socialLinks?.facebook && (
              <a
                href={user.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 dark:text-slate-400 hover:text-emerald-500 transition-colors"
              >
                <FaFacebook />
              </a>
            )}

            {user?.socialLinks?.instagram && (
              <a
                href={user.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 dark:text-slate-400 hover:text-pink-500 transition-colors"
              >
                <FaInstagramSquare />
              </a>
            )}

            {user?.socialLinks?.github && (
              <a
                href={user.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaGithubSquare />
              </a>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
              user?.userName ||
              "Unknown User"}
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            {user?.email || "No email available"}
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-700 dark:text-slate-300">
            <p>
              <span className="font-bold text-gray-900 dark:text-white">Username:</span>{" "}
              {user?.userName || "Not provided"}
            </p>

            <p>
              <span className="font-bold text-gray-900 dark:text-white">Occupation:</span>{" "}
              {user?.occupation || "Not provided"}
            </p>

            <p>
              <span className="font-bold text-gray-900 dark:text-white">Location:</span>{" "}
              {user?.location || "Not provided"}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">About Me</h2>

            <p className="leading-relaxed whitespace-pre-line text-sm text-gray-600 dark:text-slate-300">
              {user?.bio || "No bio added yet."}
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
          >
            Edit Profile
          </button>

          <UserPopup isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-5 shadow-sm transition-colors">
          <h3 className="text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400">Total Views</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">12.5K</p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-5 shadow-sm transition-colors">
          <h3 className="text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400">Total Blogs</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">34</p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-5 shadow-sm transition-colors">
          <h3 className="text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400">Comments</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">289</p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-5 shadow-sm transition-colors">
          <h3 className="text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400">Likes</h3>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">1.8K</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

