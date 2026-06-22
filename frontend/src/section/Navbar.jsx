import React from "react";
import logo from "../assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" max-w-full mx-auto bg-gray-200 py-2">
      <div className=" md:mx-30 mx-0 flex justify-between items-center ">
        <div className="flex gap-4 items-center">
          {" "}
          {/* Logo section */}
          <div className="flex gap-2 items-center">
            <img src={logo} className="h-10 w-10" alt="" />
            <h1 className="text-black font-bold text-3xl">FLOG</h1>
          </div>
          {/* Search option */}
          <div className="flex ml-2 relative w-96 items-center border-2 border-black">
            <Input
              className="h-10  rounded-none"
              type="text"
              placeholder="Enter text..."
            />
            <Button className="rounded-none h-10 absolute right-0 top-0">
              <Search />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* Menubar */}
          <div>
            <ul className="flex items-center gap-6 text-xl font-semibold">
              <li>Home</li>
              <li>Blog</li>
              <li>About</li>
            </ul>
          </div>

          <div className="flex gap-3 items-center">
            <Button className="py-2 h-10">
              <Moon className="text-xl font-bold" size={30} />{" "}
            </Button>
            <Link to="">
              {" "}
              <Button className="text-xl h-10">Login</Button>
            </Link>
            <Link to="/signup">
              {" "}
              <Button className="text-xl h-10">Signup</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
