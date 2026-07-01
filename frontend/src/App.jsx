import React from "react";
import Navbar from "./section/Navbar";
import Hero from "./section/Hero";
import { Routes, Route } from "react-router-dom";
import Signup from "./section/Signup.";
import Login from "./section/Login";
import { Toaster } from "sonner";
import Dashboard from "./section/Dashboard";
import Profile from "./Pages/Profile";
import YourBlog from "./Pages/YourBlog";
import Comments from "./Pages/Comments";
import CreateBlog from "./Pages/CreateBlog";
import UpdateBlog from "./Pages/UpdateBlog";
import BlogView from "./Pages/BlogView";
import Blog from "./section/Blog";
import About from "./section/About";
const App = () => {
  return (
    <div className="bg-emerald-900">
      <Navbar />
      <Toaster position="top-left" />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog-view/:id" element={<BlogView />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="your-blog" element={<YourBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="write-blog/:id" element={<UpdateBlog />} />
        </Route>
        <Route path="/blog" element={<Blog />} />{" "}
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
