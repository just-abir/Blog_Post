import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/Slice/authSlice";
const UserPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Text inputs guler jonno single state management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    bio: "", // Short bio matching backend
    occupation: "",
    location: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    github: "",
  });

  // Profile picture fill control korar separate state
  const [file, setFile] = useState(null);

  // Input fields changes track korar handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Profile image changes track korar handler
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Form submit track korar testing function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Test korar jonno data gulo console lock kore dekhbo
    console.log("Form Text Data: ", formData);
    console.log("Selected File: ", file);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (file) {
      data.append("file", file); // Backend controller jodi 'file' name receive kore
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/update-profile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // JWT cookie validation thakle lagbe
        },
      );

      if (response.data.success) {
        alert("Profile successfully updated!");
        onClose(); // Auto modal bondho korbe
        // Dynamic profile status refresh method eikhane callback call hote pare

        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.error(
        "Update error details:",
        error.response?.data || error.message,
      );
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-2xl hover:text-red-500">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Profile Picture & Short Bio */}
          {/* Profile Picture */}
          <div>
            <label className="mb-2 block font-medium">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full rounded-lg border p-2"
            />
          </div>
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="rounded-lg border p-3"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="rounded-lg border p-3"
            />
          </div>

          {/* Email & Username */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-lg border p-3"
            />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
              className="rounded-lg border p-3"
            />
          </div>

          {/* LinkedIn & Facebook */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="rounded-lg border p-3"
            />
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
              className="rounded-lg border p-3"
            />
          </div>

          {/* Instagram & GitHub */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram URL"
              className="rounded-lg border p-3"
            />
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="rounded-lg border p-3"
            />
          </div>

          {/* Occupation & Location */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Occupation"
              className="rounded-lg border p-3"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="rounded-lg border p-3"
            />
          </div>

          {/* About */}
          <div>
            <label className="mb-2 block font-medium">About</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write something about yourself..."
              rows={4}
              className="w-full rounded-lg border p-3 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPopup;
