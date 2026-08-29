import { setBlog } from "@/Redux/Slice/blogSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setLoading } from "@/Redux/Slice/authSlice";

const CreateBlog = () => {
  const [title, settitle] = useState("");
  const [category, setCategory] = useState("");
  const { blog, loading } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createBlogHandle = async () => {
    if (!title.trim()) {
      toast.error("Please enter a blog title");
      return;
    }

    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        "http://localhost:5000/api/blog/create",
        { title, category },
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(setBlog([...(blog || []), res.data.data]));
        navigate(`/dashboard/write-blog/${res.data.data._id}`);
        toast.success(res.data.message || "Blog created successfully!");
      }
    } catch (error) {
      console.log("Create blog error:", error);
      toast.error(error.response?.data?.message || "Failed to create blog");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <div className="w-full p-6 sm:p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors duration-200">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Let's Create a Blog
        </h1>

        {/* Paragraph */}
        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
          Share your ideas, knowledge, and experiences with the community. Fill
          out the details below to start your draft.
        </p>

        {/* Blog Title */}
        <div className="mt-6 sm:mt-8">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-slate-300">
            Blog Title
          </label>
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Enter your blog title"
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category */}
        <div className="mt-5 sm:mt-6">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-slate-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select a category</option>
            <option value="AI">AI</option>
            <option value="Web Dev">Web Development</option>
            <option value="MERN">MERN Stack</option>
            <option value="React">Reactjs</option>
            <option value="Nodejs">Node js</option>
            <option value="Python">Python</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800">
          <button
            onClick={createBlogHandle}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 sm:py-3 font-bold text-sm sm:text-base text-white hover:bg-emerald-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

