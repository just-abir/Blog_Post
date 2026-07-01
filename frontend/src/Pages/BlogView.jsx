import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
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

const BlogView = () => {
  const dispatch = useDispatch();
  const { id: blogId } = useParams();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);

  const selectBlog = blog.find((item) => item._id === blogId);
  console.log("BLog ", selectBlog);

  const [blogLike, setblogLike] = useState(selectBlog.like.length);
  const [liked, setliked] = useState(
    selectBlog.like.includes(user._id) || false,
  );

  const handleShare = async () => {
    const shareData = {
      title: "Check out the blog!",
      text: "Read all amazing blogs.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const likeDislikeHandle = async () => {
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
      }
      const updatedBlogData = blog.map((p) =>
        p._id === selectBlog._id
          ? {
              ...p,
              like: liked
                ? p.like.filter((id) => id !== user._id)
                : [...p.like, user._id],
            }
          : p,
      );

      toast.success(res.data.message);
      dispatch(setBlog(updatedBlogData));
    } catch (error) {
      console.log("Erorr ", error);
    }
  };

  if (!selectBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        {/* ================= Breadcrumb ================= */}

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>

          <ArrowRight size={15} />

          <span className="hover:text-blue-600 cursor-pointer">Blog</span>

          <ArrowRight size={15} />

          <span className="text-gray-800 font-medium">{selectBlog.title}</span>
        </div>

        {/* ================= Title ================= */}

        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          {selectBlog.title}
        </h1>

        {selectBlog.subtitle && (
          <p className="mt-4 text-xl text-gray-500">{selectBlog.subtitle}</p>
        )}

        {/* ================= Author ================= */}

        <div className="flex flex-wrap justify-between items-center mt-8 gap-5">
          <div className="flex items-center gap-4">
            <img
              src={
                selectBlog.author?.photoUrl ||
                "https://i.pravatar.cc/150?img=12"
              }
              className="w-14 h-14 rounded-full object-cover"
              alt="author"
            />

            <div>
              <h3 className="font-semibold text-lg">
                {selectBlog.author?.name || "Unknown Author"}
              </h3>

              <p className="text-gray-500">{selectBlog.category} Writer</p>
            </div>
          </div>

          <div className="text-gray-500 text-sm">
            Published on :{" "}
            <b>
              {new Date(selectBlog.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </b>
          </div>
        </div>

        {/* ================= Feature Image ================= */}

        <img
          src={selectBlog.thumbnail}
          className="rounded-2xl mt-8 h-[450px] w-full object-cover"
          alt={selectBlog.title}
        />

        {/* ================= Blog Content ================= */}

        <div
          className="prose max-w-none mt-10 text-gray-700 leading-8"
          dangerouslySetInnerHTML={{
            __html: selectBlog.description,
          }}
        />

        {/* ================= Tags ================= */}

        <div className="flex flex-wrap gap-3 mt-8">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {selectBlog.category}
          </span>
        </div>

        {/* ================= Like Section ================= */}

        <div className="flex justify-between items-center mt-10 border rounded-xl p-5">
          <div className="flex gap-8">
            <button
              onClick={likeDislikeHandle}
              className="flex gap-2 items-center hover:text-red-500"
            >
              <Heart
                className={`${liked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />

              <span>{selectBlog.like?.length || 0}</span>
            </button>

            <button className="flex gap-2 items-center">
              <MessageCircle />

              <span>{selectBlog.comments?.length || 0}</span>
            </button>
          </div>

          <div className="flex gap-8">
            <button>
              <Bookmark />
            </button>

            <button onClick={handleShare}>
              <Share2 />
            </button>
          </div>
        </div>

        {/* ================= Write Comment ================= */}

        <div className="flex gap-4 mt-10">
          <img
            src="https://i.pravatar.cc/150?img=10"
            className="w-12 h-12 rounded-full"
            alt=""
          />

          <div className="flex-1 relative">
            <input
              placeholder="Write a comment..."
              className="w-full border rounded-full px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              className="absolute right-3 top-1/2 -translate-y-1/2
              bg-blue-600 p-2 rounded-full text-white"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* ================= Comments ================= */}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Comments ({selectBlog.comments?.length || 0})
          </h2>

          {selectBlog.comments?.length > 0 ? (
            selectBlog.comments.map((comment) => (
              <div key={comment._id} className="border rounded-xl p-6 mb-5">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <img
                      src={
                        comment.user?.photoUrl ||
                        "https://i.pravatar.cc/150?img=33"
                      }
                      className="w-12 h-12 rounded-full"
                      alt=""
                    />

                    <div>
                      <h3 className="font-semibold">
                        {comment.user?.name || "Anonymous"}
                      </h3>

                      <span className="text-sm text-gray-500">
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleDateString(
                              "en-GB",
                            )
                          : ""}
                      </span>
                    </div>
                  </div>

                  <MoreHorizontal />
                </div>

                <p className="mt-5 text-gray-700">{comment.comment}</p>

                <div className="flex gap-8 mt-5 text-gray-500">
                  <button className="flex items-center gap-2">
                    <Heart size={18} />
                    {comment.like?.length || 0}
                  </button>

                  <button className="flex items-center gap-2">
                    <MessageCircle size={18} />
                    Reply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="border rounded-xl p-10 text-center text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogView;
