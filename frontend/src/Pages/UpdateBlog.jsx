import React from "react";

const UpdateBlog = () => {
  return (
    <div className="w-full p-8">
      <div className="bg-white rounded-2xl shadow-md p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800">Write Your Blog</h1>

        <p className="mt-2 text-gray-500">
          Complete your blog details and publish it when you're ready.
        </p>

        {/* Alert */}
        <div className="mt-6 rounded-xl border border-yellow-300 bg-yellow-50 px-5 py-4">
          <p className="text-sm text-yellow-800">
            ⚠️ Your blog is currently unpublished. Save your changes before
            publishing.
          </p>
        </div>

        {/* Top Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-800">
            Unpublish
          </button>

          <button className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700">
            Remove
          </button>
        </div>

        {/* Title */}
        <div className="mt-8">
          <label className="block mb-2 font-medium text-gray-700">
            Blog Title
          </label>

          <input
            type="text"
            placeholder="Enter blog title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Subtitle */}
        <div className="mt-6">
          <label className="block mb-2 font-medium text-gray-700">
            Subtitle
          </label>

          <input
            type="text"
            placeholder="Enter subtitle"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>

          {/* Replace this textarea with ZodEditor */}
          <div className="rounded-lg border border-gray-300 min-h-[350px] p-4">
            ZodEditor Here...
          </div>
        </div>

        {/* Category */}
        <div className="mt-6">
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>

          <select className="w-full rounded-lg border border-gray-300 px-4 py-3">
            <option value="">Select a category</option>
            <option>AI</option>
            <option>Web Development</option>
            <option>MERN Stack</option>
            <option>React</option>
            <option>Node.js</option>
            <option>JavaScript</option>
          </select>
        </div>

        {/* Thumbnail */}
        <div className="mt-6">
          <label className="block mb-2 font-medium text-gray-700">
            Thumbnail Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="block w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        {/* Bottom Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          <button className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100">
            Cancel
          </button>

          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
