import React, { useRef, useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBlog } from "@/Redux/Slice/blogSlice";

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { blog } = useSelector((store) => store.blog);

  // Find selected blog
  const selectBlog = blog ? blog.find((b) => b._id === id) : null;
  const [publish, setpublish] = useState(selectBlog?.isPublished || false);

  // Form states
  const [content, setcontent] = useState(selectBlog?.description || "");
  const [blogData, setBlogData] = useState({
    title: selectBlog?.title || "",
    subtitle: selectBlog?.subtitle || "",
    description: selectBlog?.description || "",
    category: selectBlog?.category || "",
    thumbnail: selectBlog?.thumbnail || null,
  });

  const [prevThumb, setPrevThumb] = useState(selectBlog?.thumbnail || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const selecCategory = (e) => {
    setBlogData({ ...blogData, category: e.target.value });
  };

  const selectThumb = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData((prev) => ({
        ...prev,
        thumbnail: file,
      }));

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPrevThumb(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandle = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);

    if (blogData.thumbnail && typeof blogData.thumbnail !== "string") {
      formData.append("file", blogData.thumbnail);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/blog/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success("Blog updated successfully");
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("Failed to update blog");
    }
  };

  const toggPubUnpub = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/blog/togglePublishBlog/${id}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        setpublish(!publish);
        toast.success(res.data.message || "Status updated!");
        navigate("/dashboard/your-blog");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.log("Publish toggle error:", error);
      toast.error("Error toggling publish state");
    }
  };

  const deleteBlog = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/blog/deleteBlog/${id}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        const updateBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updateBlogData));
        toast.success("Blog deleted successfully");
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to delete blog");
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog content here...",
      height: 300,
    }),
    [],
  );

  if (!selectBlog) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-slate-400 font-bold">
        Loading blog data or blog not found...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col transition-colors duration-200">
        {/* Header Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Edit & Write Your Blog
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                Complete your blog details and publish it when you're ready.
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggPubUnpub}
                className="rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white transition-colors"
              >
                {selectBlog?.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={deleteBlog}
                className="rounded-lg bg-red-600 hover:bg-red-700 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white transition-colors"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Alert */}
          <div className="mt-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5">
            <p className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300">
              {selectBlog?.isPublished
                ? "✓ This blog is currently Published and visible to the public."
                : "⚠️ Your blog is currently unpublished. Save your changes and click Publish when ready."}
            </p>
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="mt-6 space-y-5">
          {/* Title and Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-bold text-gray-700 dark:text-slate-300">
                Blog Title
              </label>
              <input
                name="title"
                value={blogData.title}
                onChange={handleChange}
                type="text"
                placeholder="Enter blog title"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block mb-1.5 text-sm font-bold text-gray-700 dark:text-slate-300">
                Subtitle
              </label>
              <input
                name="subtitle"
                value={blogData.subtitle}
                onChange={handleChange}
                type="text"
                placeholder="Enter subtitle"
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1.5 text-sm font-bold text-gray-700 dark:text-slate-300">
              Content & Description
            </label>
            <div className="border border-gray-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white text-black">
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => setcontent(newContent)}
                config={config}
              />
            </div>
          </div>

          {/* Category and Thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-bold text-gray-700 dark:text-slate-300">
                Category
              </label>
              <select
                name="category"
                value={blogData.category}
                onChange={selecCategory}
                className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
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
            <div>
              <label className="block mb-1.5 text-sm font-bold text-gray-700 dark:text-slate-300">
                Thumbnail Image
              </label>
              <input
                onChange={selectThumb}
                type="file"
                accept="image/*"
                className="block w-full text-sm rounded-lg border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 p-2 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {prevThumb && (
                <div className="mt-3">
                  <img
                    src={prevThumb}
                    alt="Preview"
                    className="h-24 w-40 object-cover rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-8 pt-5 border-t border-gray-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={updateBlogHandle}
            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;

