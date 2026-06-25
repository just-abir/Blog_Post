import React from "react";

const Profile = () => {
  return (
    <div className="space-y-6 max-w-7xl mt-10 mx-auto ">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between md:flex-row gap-8">
        {/* Left Side */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center">
          <img
            src="https://i.pravatar.cc/300"
            alt="profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />

          <p className="mt-4 text-gray-600">
            MERN Stack Developer passionate about building modern web
            applications.
          </p>

          <div className="flex gap-4 mt-5 text-2xl">
            <a href="#" className="hover:text-blue-600">
              LinkedIn
            </a>

            <a href="#" className="hover:text-blue-500">
              FB
            </a>

            <a href="#" className="hover:text-pink-500">
              Insta
            </a>

            <a href="#" className="hover:text-gray-900">
              GitHub
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">John Doe</h1>

          <p className="text-gray-500 mt-2">john@example.com</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">About Me</h2>

            <p className="text-gray-600 leading-relaxed">
              I am a MERN Stack developer with experience in React, Node.js,
              Express, MongoDB and Firebase. I love creating scalable and
              user-friendly web applications.
            </p>
          </div>

          <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
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
