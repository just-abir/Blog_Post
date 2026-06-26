import UserPopup from "@/Features/UserPopup";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mt-10 mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
          <img
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="text-gray-600">@{user?.userName}</p>

          <p className="mt-2 text-gray-600">{user?.occupation}</p>

          <p className="text-gray-500">{user?.location}</p>

          <div className="flex gap-4 mt-5">
            {user?.socialLinks?.linkedin && (
              <a
                href={user.socialLinks.linkedin.trim()}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700"
              >
                LinkedIn
              </a>
            )}

            {user?.socialLinks?.facebook && (
              <a
                href={user.socialLinks.facebook.trim()}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                Facebook
              </a>
            )}

            {user?.socialLinks?.instagram && (
              <a
                href={user.socialLinks.instagram.trim()}
                target="_blank"
                rel="noreferrer"
                className="text-pink-500"
              >
                Instagram
              </a>
            )}

            {user?.socialLinks?.github && (
              <a
                href={user.socialLinks.github.trim()}
                target="_blank"
                rel="noreferrer"
                className="text-gray-900"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>

          <p className="text-gray-500 mt-2">{user?.email}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>

            <p className="text-gray-600 leading-relaxed">
              {user?.bio || "No bio available"}
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>

          <UserPopup isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-gray-500">Total Views</h3>
          <p className="text-3xl font-bold mt-2">12.5K</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-gray-500">Total Blogs</h3>
          <p className="text-3xl font-bold mt-2">34</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-gray-500">Comments</h3>
          <p className="text-3xl font-bold mt-2">289</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5">
          <h3 className="text-gray-500">Likes</h3>
          <p className="text-3xl font-bold mt-2">1.8K</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
