import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const RecentBlog = () => {
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);

  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Recent Blogs
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
            Discover our latest published articles written by knowledgeable community members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Left Side - Blog Posts */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {blog && blog.length > 0 ? (
              blog.slice(0, 5).map((item) => (
                <article
                  key={item._id}
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <img
                    src={
                      item.thumbnail ||
                      "https://placehold.co/800x500?text=No+Image"
                    }
                    alt={item.title}
                    className="w-full h-56 sm:h-64 object-cover"
                  />

                  <div className="p-6 sm:p-7">
                    <span className="inline-block bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {item.category || "General"}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <Link to={`/blog-view/${item._id}`}>{item.title}</Link>
                    </h3>

                    <p className="text-gray-600 dark:text-slate-400 mb-5 line-clamp-3 text-sm sm:text-base leading-relaxed">
                      {item.subtitle || "No subtitle available."}
                    </p>

                    <button
                      onClick={() => navigate(`/blog-view/${item._id}`)}
                      className="text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base hover:underline flex items-center gap-1 transition-all"
                    >
                      Read More →
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-8 text-center text-gray-500 dark:text-slate-400 font-bold">
                No recent blogs found.
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6 sm:space-y-8">
            {/* Popular Categories */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Categories
              </h3>

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
                    className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold hover:bg-emerald-100 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Subscribe to Newsletter
              </h3>

              <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                Get the latest blogs directly delivered to your inbox.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Suggested Blogs */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
                Suggested Topics
              </h3>

              <div className="space-y-3">
                {[
                  "Top 10 Master React Patterns",
                  "Understand Node.js Event Loop",
                  "Complete Modern JavaScript Guide",
                  "MongoDB Aggregation Pipelines",
                  "Next.js Full Course Walkthrough",
                ].map((title, idx) => (
                  <p
                    key={idx}
                    className="font-bold text-sm text-gray-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {title}
                  </p>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;


