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
  const [publish, setpublish] = useState(false);
  const { blog } = useSelector((store) => store.blog);

  // নিরাপদভাবে ব্লগ খুঁজে বের করা
  const selectBlog = blog ? blog.find((b) => b._id === id) : null;

  // স্টেট ইনিশিয়ালাইজেশন
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

    if (blogData.thumbnail) {
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
        console.log("Update successful", res);
        navigate("dashboard/your-blog");
      }
    } catch (error) {
      console.log(error);
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
        toast.success(res.data.message);
        navigate("/dashboard/your-blog");
      } else {
        toast.error("Failed to updaated");
      }
    } catch (error) {
      console.log(error);
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
        navigate("/dashboard/your-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog content here...",
      height: 250,
    }),
    [],
  );

  if (!selectBlog) {
    return (
      <div className="p-6 text-center">
        Loading blog data or blog not found...
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-90px)] p-6 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-md p-6 max-h-full flex flex-col">
        {/* Header Section (ফিক্সড থাকবে) */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Write Your Blog</h1>
          <p className="mt-1 text-gray-500 text-sm">
            Complete your blog details and publish it when you're ready.
          </p>

          {/* Alert */}
          <div className="mt-2 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-2">
            <p className="text-xs text-yellow-800">
              ⚠️ Your blog is currently unpublished. Save your changes before
              publishing.
            </p>
          </div>

          {/* Top Buttons (এখানে বাটন ২টি ফিরিয়ে আনা হয়েছে) */}
          <div className="mt-2 flex justify-end gap-3">
            <button
              onClick={() =>
                toggPubUnpub(selectBlog.isPublished ? "false" : "true")
              }
              className="rounded-lg bg-gray-700 px-4 py-1.5 text-sm text-white hover:bg-gray-800"
            >
              {selectBlog?.isPublished ? "Unpublished" : "Publish"}
            </button>
            <button
              onClick={deleteBlog}
              className="rounded-lg bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Scrollable Form Fields Section */}
        <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-4 thin-scrollbar">
          {/* Title and Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <input
                name="title"
                value={blogData.title}
                onChange={handleChange}
                type="text"
                placeholder="Enter blog title"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                name="subtitle"
                value={blogData.subtitle}
                onChange={handleChange}
                type="text"
                placeholder="Enter subtitle"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
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
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={blogData.category}
                onChange={selecCategory}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
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
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Thumbnail Image
              </label>
              <input
                onChange={selectThumb}
                type="file"
                accept="image/*"
                className="block w-full text-sm rounded-lg border border-gray-300 p-[7px] outline-none focus:border-blue-500"
              />
              {prevThumb && (
                <div className="mt-2">
                  <img
                    src={prevThumb}
                    alt="Preview"
                    className="h-20 w-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Buttons (ফিক্সড থাকবে) */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={updateBlogHandle}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
