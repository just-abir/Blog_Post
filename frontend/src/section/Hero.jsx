import { Button } from "@/components/ui/button";
import React from "react";
import blog2 from "../assets/blog2.png";
const Hero = () => {
  return (
    <div className="h-[90vh] max-w-full mx-auto bg-gray-300 py-2">
      <div className="border-2  mx-w-7xl py-6 my-10 mb-7 gap-30 flex justify-around items-center ">
        {/* Hero Left side */}
        <div className="border-2 max-w-4xl">
          <h1 className="text-7xl   font-bold pb-2">
            Explore the Latest Tech & Web Trends
          </h1>

          <p className="text-xl max-w-2xl text-gray-400 pb-6">
            {" "}
            Stay ahead with in-depth articles, tutorials, and insights on web
            development, digital marketing, and tech innovations.
          </p>

          <div className="flex items-center gap-5 pb-2">
            <Button className="h-12 px-6 py-3.5">Get Started</Button>
            <Button
              variant="outline"
              className="h-12 px-6  py-3.5  bg-white text-black  "
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Right Side */}

        <div className=" flex items-center justify-center">
          <img src={blog2} className="h-[500px] w-[500px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
