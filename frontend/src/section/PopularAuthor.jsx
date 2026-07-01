import axios from "axios";
import React, { useEffect, useState } from "react";

const PopularAuthor = () => {
  const [popularUser, setpopularUser] = useState([]);

  const getAllUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/allUser`);

      if (res.data.success) {
        setpopularUser(res.data.users);
      }
      console.log("HI all author", res.data);
    } catch (error) {
      console.log("error popular author  ", error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-4xl font-bold text-center mb-12">
            Popular Authors
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {popularUser?.slice(0, 3).map((author, id) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
              >
                <img
                  src={author.photoUrl}
                  alt={author.firstName}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
                />

                <h2 className="mt-4 text-lg font-semibold">
                  {author.firstName} {author.userName}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularAuthor;
