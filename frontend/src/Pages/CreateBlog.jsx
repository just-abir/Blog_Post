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
    dispatch(setLoading(true));
    try {
      const res = await axios.post(
        "http://localhost:5000/api/blog/create",
        { title, category },
        { withCredentials: true },
      );
      console.log(res.data.data);

      if (res.data.success) {
        console.log("Current blog:", blog);
        dispatch(setBlog([...blog, res.data.data]));
        console.log("New blog:", res.data.data);
        navigate(`/dashboard/write-blog/${res.data.data._id}`);
        toast.success(res.data.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full h-full p-8">
      {" "}
      <div className="w-full h-full p-8 bg-white rounded-xl shadow">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">
          Let's Create a Blog
        </h1>

        {/* Paragraph */}
        <p className="mt-3 text-gray-600">
          Share your ideas, knowledge, and experiences with the community. Fill
          out the details below to create your blogd.
        </p>

        {/* Blog Title */}
        <div className="mt-8">
          <label className="block mb-2 font-medium text-gray-700">
            Blog Title
          </label>
          <input
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text"
            placeholder="Enter your blog title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div className="mt-6">
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="AI">AI</option>
            <option value="Web Dev">Web Development</option>
            <option value="MERN">MERN Stack</option>
            <option value="React">Reactjs</option>
            <option value="Nodejs">Node js</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={createBlogHandle}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
