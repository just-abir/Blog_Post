import axios from "axios";
import React, { useEffect, useState } from "react";
import userLogo from "../assets/userLogo.jpg";

const PopularAuthor = () => {
  const [popularUser, setpopularUser] = useState([]);

  const getAllUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/allUser`);
      if (res.data.success) {
        setpopularUser(res.data.users);
      }
    } catch (error) {
      console.log("error popular author", error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gray-100 dark:bg-slate-900/40 border-t border-b border-gray-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Popular Authors
          </h2>
          <p className="mt-3 text-base text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
            Meet the creative minds behind our top-performing blogs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {popularUser && popularUser.length > 0 ? (
            popularUser.slice(0, 5).map((author, id) => (
              <div
                key={author._id || id}
                className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center"
              >
                <img
                  src={author.photoUrl || userLogo}
                  alt={author.firstName || "Author"}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-emerald-500/30"
                />

                <h3 className="mt-4 text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate max-w-full">
                  {author.firstName} {author.lastName || author.userName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 truncate max-w-full">
                  {author.occupation || "Author"}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500 dark:text-slate-400 font-bold">
              No authors available currently.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularAuthor;

