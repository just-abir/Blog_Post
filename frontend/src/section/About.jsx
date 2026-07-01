import React from "react";

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900">About Our Blog</h1>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover stories, explore ideas, and gain valuable knowledge from
            passionate writers around the world.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-14">
          {/* Left Side */}
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
              alt="About Blog"
              className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Sharing Knowledge, Inspiring Minds
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              Our blog is a place where creativity meets knowledge. We publish
              articles on Web Development, Artificial Intelligence, Python,
              Digital Marketing, Programming, and many more exciting topics.
            </p>

            <p className="text-gray-600 leading-8 mb-5">
              Every article is written to educate, inspire, and help readers
              improve their skills. Whether you're a beginner or an experienced
              developer, you'll always find something valuable here.
            </p>

            <p className="text-gray-600 leading-8">
              We believe learning never stops. Every blog we publish is another
              step toward building a stronger community of curious minds.
            </p>

            {/* Quote */}
            <div className="mt-10 border-l-4 border-blue-600 pl-5">
              <p className="italic text-xl text-gray-700">
                "The more we share knowledge, the brighter the future becomes."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
