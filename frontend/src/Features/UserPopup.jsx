import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/Slice/authSlice";
import { toast } from "sonner";
import { X } from "lucide-react";

const UserPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    bio: "",
    occupation: "",
    location: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    github: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (file) {
      data.append("file", file);
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/update-profile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success("Profile successfully updated!");
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      console.error(
        "Update error details:",
        error.response?.data || error.message,
      );
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 px-6 py-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Profile Picture */}
          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-300">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Email & Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Occupation & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Dhaka, Bangladesh"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* LinkedIn & Facebook */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Facebook URL
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Instagram & GitHub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                Instagram URL
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
                GitHub URL
              </label>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* About / Bio */}
          <div>
            <label className="mb-1 block text-xs font-bold text-gray-700 dark:text-slate-300">
              About Me / Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a brief bio about yourself..."
              rows={3}
              className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-3 text-xs sm:text-sm resize-none outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2 text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPopup;

