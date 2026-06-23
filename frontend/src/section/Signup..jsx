import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const saveUserInfo = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userdataa ", userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        userData,
      );
      console.log("response ", response.data);
      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(error.response.data.message || "Registration failed!");
      } else {
        console.error("Network Error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 ">
      <div className="max-w-7xl min-h-[70vh] w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left Side Image */}
        <div className="hidden md:block">
          <img src={auth} alt="signup" className="w-full h-full object-cover" />
        </div>

        {/* Right Side Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">Sign up to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="text-gray-700 text-sm">Username</label>
              <input
                name="userName"
                value={userData.userName}
                onChange={saveUserInfo}
                type="text"
                placeholder="johndoe"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                name="email"
                value={userData.email}
                onChange={saveUserInfo}
                type="email"
                placeholder="example@gmail.com"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm">Password</label>
              <input
                name="password"
                value={userData.password}
                onChange={saveUserInfo}
                type="password"
                placeholder="********"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
