import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { setUser, passOnOff } from "../Redux/Slice/authSlice";
import { toast } from "sonner";
import { EyeOff, Eye } from "lucide-react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showPass = useSelector((state) => state.auth.showPass);

  const [loading, setloading] = useState(false);
  const [userLoginData, setuserLoginData] = useState({
    email: "",
    password: "",
  });

  const saveLoginInfo = (e) => {
    console.log("..", e.target.value);
    setuserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login data", userLoginData);

    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        userLoginData,
      );

      console.log("Response ", response.data);
      toast.success("User Login Success");
      dispatch(setUser(response.data.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        toast.error("Login Failed", {
          description: error.response?.data?.message || "Something went wrong",
        });
      } else {
        console.error("Network error ", error.message);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="max-w-6xl w-full min-h-[70vh] bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
          {/* Left Side Image */}
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="login"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side Card */}
          <div className="flex flex-col justify-center p-10">
            {/* Header */}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>

            {/* Title */}
            <p className="text-gray-500 mb-8">Login to access your account</p>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  value={userLoginData.email}
                  onChange={saveLoginInfo}
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  name="password"
                  onChange={saveLoginInfo}
                  value={userLoginData.password}
                  type={showPass ? "password" : "text"}
                  placeholder="********"
                  className=" w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {showPass ? (
                  <>
                    <span
                      onClick={() => dispatch(passOnOff())}
                      className="absolute top-10 right-2"
                    >
                      <EyeOff />
                    </span>
                  </>
                ) : (
                  <>
                    {" "}
                    <span
                      onClick={() => dispatch(passOnOff())}
                      className="absolute top-10 right-2"
                    >
                      <Eye />
                    </span>
                  </>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? <Spinner /> : "Login"}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
