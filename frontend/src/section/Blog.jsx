import { setBlog } from "@/Redux/Slice/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import Footer from "./Footer";

const Blog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlog = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/blog/getPublishBlog",
          { withCredentials: true },
        );

        if (res.data.success) {
          dispatch(setBlog(res.data.blog));
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    getAllPublishedBlog();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <main className="flex-1 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Explore All Blogs
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
              Dive into our complete collection of curated tech, development, and programming articles.
            </p>
          </div>

          {/* Blog Grid */}
          {blog && blog.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {blog.map((item) => (
                <BlogCard key={item._id} blog={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl">
              <p className="text-lg font-bold text-gray-600 dark:text-slate-400">
                No published blogs found yet.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

