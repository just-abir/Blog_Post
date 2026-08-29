import React from "react";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <main className="flex-1 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              About Our Blog
            </h1>

            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover stories, explore ideas, and gain valuable knowledge from
              passionate writers around the world.
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Left Side Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
                alt="About Blog"
                className="w-full h-72 sm:h-96 lg:h-[450px] object-cover rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800"
              />
            </div>

            {/* Right Side Description */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Sharing Knowledge, Inspiring Minds
              </h2>

              <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                Our blog is a place where creativity meets knowledge. We publish
                articles on Web Development, Artificial Intelligence, Python,
                Digital Marketing, Programming, and many more exciting topics.
              </p>

              <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                Every article is written to educate, inspire, and help readers
                improve their skills. Whether you're a beginner or an experienced
                developer, you'll always find something valuable here.
              </p>

              <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                We believe learning never stops. Every blog we publish is another
                step toward building a stronger community of curious minds.
              </p>

              {/* Quote */}
              <div className="mt-8 border-l-4 border-emerald-600 dark:border-emerald-500 pl-4 py-1 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r-lg">
                <p className="italic text-base sm:text-lg font-bold text-gray-800 dark:text-slate-200">
                  "The more we share knowledge, the brighter the future becomes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;

