import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecentBlog = () => {
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">Recent Blogs</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {blog?.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    item.thumbnail ||
                    "https://placehold.co/800x500?text=No+Image"
                  }
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
                    {item.category}
                  </span>

                  <h2 className="text-2xl font-bold mb-3">{item.title}</h2>

                  <p className="text-gray-500 mb-5 line-clamp-3">
                    {item.subtitle || "No subtitle available."}
                  </p>

                  <button
                    onClick={() => navigate(`/blog/${item._id}`)}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Popular Categories */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Popular Categories</h2>

              <div className="flex flex-wrap gap-2">
                {[
                  "Blogging",
                  "Web Development",
                  "Digital Marketing",
                  "Cooking",
                  "AI",
                  "ML",
                  "Python",
                ].map((category) => (
                  <span
                    key={category}
                    className="bg-gray-100 px-3 py-2 rounded-full text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-2">
                Subscribe to Newsletter
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                Get the latest blogs directly in your inbox.
              </p>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 border rounded-lg px-3 py-2 outline-none"
                />

                <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Suggested Blogs */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Suggested Blogs</h2>

              <div className="space-y-3">
                <p className="cursor-pointer hover:text-blue-600">
                  Top 10 Master React
                </p>

                <p className="cursor-pointer hover:text-blue-600">
                  Understand Node.js
                </p>

                <p className="cursor-pointer hover:text-blue-600">
                  Complete JavaScript Guide
                </p>

                <p className="cursor-pointer hover:text-blue-600">
                  MongoDB Aggregation
                </p>

                <p className="cursor-pointer hover:text-blue-600">
                  Next.js Full Course
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBlog;
