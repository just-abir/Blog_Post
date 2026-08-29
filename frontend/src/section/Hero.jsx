import { Button } from "@/components/ui/button";
import React from "react";
import blog2 from "../assets/blog2.png";
import RecentBlog from "./RecentBlog";
import PopularAuthor from "./PopularAuthor";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full">
      {/* Hero Section Container */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-gray-100 dark:bg-slate-900/60 border-b border-gray-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-12">
            {/* Hero Left side */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs sm:text-sm font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                Welcome to Our Tech Community
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                Explore the Latest Tech & Web Trends
              </h1>

              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Stay ahead with in-depth articles, tutorials, and insights on web
                development, digital marketing, and tech innovations.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link to="/blog">
                  <Button className="h-11 px-6 text-sm sm:text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="h-11 px-6 text-sm sm:text-base font-bold bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Right Side */}
            <div className="flex-1 flex items-center justify-center max-w-sm sm:max-w-md lg:max-w-none">
              <img
                src={blog2}
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] object-contain drop-shadow-md"
                alt="Tech & Web Trends"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other Homepage Sections */}
      <RecentBlog />
      <PopularAuthor />
      <Footer />
    </div>
  );
};

export default Hero;

