import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    setuserLoginData({ ...userLoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        userLoginData,
        {
          withCredentials: true,
        },
      );
      toast.success("User Login Success");
      dispatch(setUser(response.data.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message || "Login Failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 flex items-center justify-center px-4 py-12 pt-24 transition-colors duration-200">
      <div className="max-w-5xl w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden grid md:grid-cols-2">
        {/* Left Side Image */}
        <div className="hidden md:block relative min-h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Card */}
        <div className="flex flex-col justify-center p-6 sm:p-10">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>

          {/* Title */}
          <p className="text-gray-500 dark:text-slate-400 text-sm mb-6">
            Login to access your FLOG account
          </p>

          {/* Form */}
          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                name="email"
                value={userLoginData.email}
                onChange={saveLoginInfo}
                type="email"
                required
                placeholder="example@gmail.com"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  onChange={saveLoginInfo}
                  value={userLoginData.password}
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => dispatch(passOnOff())}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base disabled:opacity-50"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 dark:text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

