import React from "react";
import logo from "../assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun, MessageSquare, PenSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleBtn } from "@/Redux/Slice/themeSlice";

import axios from "axios";
import { setUser } from "@/Redux/Slice/authSlice";
import { toast } from "sonner";

("use client");

import { CreditCardIcon, LogOutIcon, ChartLine, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  });
  const [theme, setTheme] = React.useState("light");

  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);

  const themeMode = useSelector((store) => store.theme.mode);

  const dispatch = useDispatch();

  const toggleBtn = () => {
    dispatch(handleToggleBtn());
  };

  const logoutHandle = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/logout",
        { withCredentials: true },
      );
      console.log("hi ", response);
      if (response.data.success) {
        navigate("/");
        dispatch(setUser(null));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("erro", error);
    }
  };

  return (
    <div className=" w-full fixed top-0 left-0  mx-auto bg-gray-200 py-2">
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
            <ul className="flex items-center gap-6 text-xl font-semibold  dark:text-white">
              <li>Home</li>
              <li>Blog</li>
              <li>About</li>
            </ul>
          </div>

          <div className="flex gap-3 items-center">
            <Button onClick={toggleBtn} className="py-2 h-10">
              {themeMode === "dark" ? (
                <>
                  <Moon className="text-xl font-bold" size={30} />{" "}
                </>
              ) : (
                <>
                  <Sun className="text-xl font-bold" size={30} />{" "}
                </>
              )}
            </Button>
            {user ? (
              <>
                {" "}
                <DropdownMenu className="md:flex md:flex-col md:gap-5">
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="shadcn"
                        />
                        <AvatarFallback>LR</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" w-44 mt-4 mr-6">
                    <DropdownMenuGroup className="md:flex md:flex-col md:gap-1">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <Link to="/dashboard/profile">
                        <DropdownMenuItem>
                          <UserIcon />
                          Profile
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>{" "}
                      </Link>
                      <DropdownMenuItem>
                        <ChartLine />
                        Your Blog
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <MessageSquare />
                        Comments
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <PenSquare />
                        Write Blog
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuGroup className=" pt-1">
                      <DropdownMenuItem variant="destructive">
                        <LogOutIcon />
                        Log Out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>{" "}
                <Link to="/logout">
                  {" "}
                  <Button onClick={logoutHandle} className="text-xl h-10">
                    Logout
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to="/login">
                  {" "}
                  <Button className="text-xl h-10">Login</Button>
                </Link>
                <Link to="/signup">
                  {" "}
                  <Button className="text-xl h-10">Signup</Button>
                </Link>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
