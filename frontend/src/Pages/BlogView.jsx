import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setBlog } from "@/Redux/Slice/blogSlice";
import Footer from "@/section/Footer";

const BlogView = () => {
  const dispatch = useDispatch();
  const { id: blogId } = useParams();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);

  const selectBlog = blog?.find((item) => item._id === blogId);

  const [blogLike, setblogLike] = useState(0);
  const [liked, setliked] = useState(false);

  useEffect(() => {
    if (selectBlog) {
      setblogLike(selectBlog.like?.length || 0);
      setliked(selectBlog.like?.includes(user?._id) || false);
    }
  }, [selectBlog, user]);

  const handleShare = async () => {
    const shareData = {
      title: selectBlog?.title || "Check out this blog!",
      text: "Read amazing tech articles on FLOG.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likeDislikeHandle = async () => {
    if (!user) {
      toast.error("Please login to like this post");
      return;
    }
    try {
      const action = liked ? "dislikeBlog" : "likeBlog";

      const res = await axios.post(
        `http://localhost:5000/api/blog/${selectBlog._id}/${action}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        const updatedLikes = liked ? blogLike - 1 : blogLike + 1;
        setblogLike(updatedLikes);
        setliked(!liked);

        const updatedBlogData = blog.map((p) =>
          p._id === selectBlog._id
            ? {
                ...p,
                like: liked
                  ? p.like.filter((id) => id !== user._id)
                  : [...(p.like || []), user._id],
              }
            : p,
        );

        toast.success(res.data.message);
        dispatch(setBlog(updatedBlogData));
      }
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  if (!selectBlog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center pt-20">
        <h2 className="text-xl font-bold text-gray-700 dark:text-slate-300">
          Loading article or article not found...
        </h2>
        <Link
          to="/blog"
          className="mt-4 px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <main className="flex-1 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-10 transition-colors">
            {/* ================= Breadcrumb ================= */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 mb-6 font-bold flex-wrap">
              <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                Home
              </Link>
              <ArrowRight size={14} />
              <Link to="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                Blog
              </Link>
              <ArrowRight size={14} />
              <span className="text-gray-900 dark:text-white truncate max-w-xs sm:max-w-sm">
                {selectBlog.title}
              </span>
            </nav>

            {/* ================= Title & Subtitle ================= */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              {selectBlog.title}
            </h1>

            {selectBlog.subtitle && (
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-medium">
                {selectBlog.subtitle}
              </p>
            )}

            {/* ================= Author Details ================= */}
            <div className="flex flex-wrap justify-between items-center mt-6 sm:mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={
                    selectBlog.author?.photoUrl ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-emerald-500/20"
                  alt={selectBlog.author?.name || "Author"}
                />

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                    {selectBlog.author?.firstName || selectBlog.author?.name || "Anonymous"}{" "}
                    {selectBlog.author?.lastName || ""}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-medium">
                    {selectBlog.category || "General"} Writer
                  </p>
                </div>
              </div>

              <div className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                Published on:{" "}
                <b className="text-gray-800 dark:text-slate-200">
                  {new Date(selectBlog.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </b>
              </div>
            </div>

            {/* ================= Feature Image ================= */}
            {selectBlog.thumbnail && (
              <img
                src={selectBlog.thumbnail}
                className="rounded-2xl mt-6 sm:mt-8 h-64 sm:h-80 md:h-[420px] w-full object-cover border border-gray-200 dark:border-slate-800"
                alt={selectBlog.title}
              />
            )}

            {/* ================= Blog Content ================= */}
            <div
              className="mt-8 text-sm sm:text-base text-gray-800 dark:text-slate-200 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: selectBlog.description,
              }}
            />

            {/* ================= Category Tag ================= */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
              <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold px-3.5 py-1.5 rounded-full text-xs sm:text-sm">
                #{selectBlog.category || "Tech"}
              </span>
            </div>

            {/* ================= Action Buttons (Like / Comment / Share) ================= */}
            <div className="flex justify-between items-center mt-8 border border-gray-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 bg-gray-50/50 dark:bg-slate-800/30">
              <div className="flex gap-6 sm:gap-8">
                <button
                  onClick={likeDislikeHandle}
                  className="flex gap-2 items-center font-bold text-xs sm:text-sm text-gray-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <Heart
                    size={20}
                    className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
                  />
                  <span>{blogLike}</span>
                </button>

                <div className="flex gap-2 items-center font-bold text-xs sm:text-sm text-gray-700 dark:text-slate-300">
                  <MessageCircle size={20} className="text-gray-500" />
                  <span>{selectBlog.comments?.length || 0}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-300 transition-colors font-bold"
                  title="Share Article"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* ================= Comments Section ================= */}
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Comments ({selectBlog.comments?.length || 0})
              </h2>

              {/* Write Comment Box */}
              <div className="flex gap-3 sm:gap-4 mb-8">
                <div className="flex-1 relative flex items-center">
                  <input
                    placeholder="Share your thoughts on this article..."
                    className="w-full border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 bg-emerald-600 hover:bg-emerald-700 p-2 rounded-lg text-white font-bold transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>

              {/* Comments List */}
              {selectBlog.comments && selectBlog.comments.length > 0 ? (
                <div className="space-y-4">
                  {selectBlog.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border border-gray-200 dark:border-slate-800 rounded-xl p-5 bg-gray-50/50 dark:bg-slate-800/20"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              comment.user?.photoUrl ||
                              "https://i.pravatar.cc/150?img=33"
                            }
                            className="w-9 h-9 rounded-full object-cover"
                            alt="User"
                          />
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                              {comment.user?.name || "Community Member"}
                            </h4>
                            <span className="text-xs text-gray-500 dark:text-slate-400">
                              {comment.createdAt
                                ? new Date(comment.createdAt).toLocaleDateString("en-GB")
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-gray-200 dark:border-slate-800 rounded-xl p-8 text-center text-xs sm:text-sm text-gray-500 dark:text-slate-400 font-bold">
                  No comments yet. Be the first to share your thoughts!
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogView;

