import { setBlog } from "@/Redux/Slice/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);
  console.log("Storedd ", blog);
  useEffect(() => {
    const getAllPublishedBlog = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/blog/getPublishBlog",
          { withCredentials: true },
        );

        if (res.data.success) {
          console.log("HI test  1", res.data.success, res.data.blog);
          dispatch(setBlog(res.data.blog));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllPublishedBlog();
  }, [dispatch]);

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-12">Our Blogs</h1>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blog?.map((item) => (
            <BlogCard key={item._id} blog={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
