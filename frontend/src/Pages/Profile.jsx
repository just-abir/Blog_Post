import UserPopup from "@/Features/UserPopup";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaInstagramSquare,
  FaGithubSquare,
} from "react-icons/fa";

import userLogo from "../assets/userLogo.jpg";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  console.log("response User", user);

  return (
    <div className="mx-auto mt-10 max-w-7xl space-y-6">
      {/* Profile Section */}
      <div className="flex flex-col justify-between gap-8 rounded-xl bg-white p-6 shadow-md md:flex-row">
        {/* Left Side */}
        <div className="flex w-full flex-col items-center text-center md:w-1/3">
          <img
            src={user?.photoUrl || userLogo}
            alt="profile"
            className="h-40 w-40 rounded-full border-4 border-blue-500 object-cover"
          />

          <p className="mt-4 text-gray-600">
            {user?.occupation || "No occupation added."}
          </p>

          <div className="mt-5 flex gap-4 text-2xl">
            <a
              href={user?.socialLinks?.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin />
            </a>

            <a
              href={user?.socialLinks?.facebook || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>

            <a
              href={user?.socialLinks?.instagram || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagramSquare />
            </a>

            <a
              href={user?.socialLinks?.github || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900"
            >
              <FaGithubSquare />
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {`${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
              "Unknown User"}
          </h1>

          <p className="mt-2 text-gray-500">
            {user?.email || "No email available"}
          </p>

          <div className="mt-4 space-y-1 text-gray-600">
            <p>
              <span className="font-semibold">Username:</span>{" "}
              {user?.userName || "Not provided"}
            </p>

            <p>
              <span className="font-semibold">Occupation:</span>{" "}
              {user?.occupation || "Not provided"}
            </p>

            <p>
              <span className="font-semibold">Location:</span>{" "}
              {user?.location || "Not provided"}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">About Me</h2>

            <p className="leading-relaxed whitespace-pre-line text-gray-600">
              {user?.bio || "No bio added yet."}
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Edit Profile
          </button>

          <UserPopup isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="text-gray-500">Total Views</h3>
          <p className="mt-2 text-3xl font-bold">12.5K</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="text-gray-500">Total Blogs</h3>
          <p className="mt-2 text-3xl font-bold">34</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="text-gray-500">Comments</h3>
          <p className="mt-2 text-3xl font-bold">289</p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-md">
          <h3 className="text-gray-500">Likes</h3>
          <p className="mt-2 text-3xl font-bold">1.8K</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
