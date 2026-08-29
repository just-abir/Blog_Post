import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Moon,
  Sun,
  MessageSquare,
  PenSquare,
  Menu,
  X,
  CreditCardIcon,
  LogOutIcon,
  ChartLine,
  UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleBtn } from "@/Redux/Slice/themeSlice";
import axios from "axios";
import { setUser } from "@/Redux/Slice/authSlice";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userLogo from "../assets/userLogo.jpg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch(setUser(null));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("logout error", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo & Search Section */}
          <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logo} className="h-9 w-9 object-contain" alt="Logo" />
              <span className="text-gray-900 dark:text-white font-bold text-2xl tracking-tight">
                FLOG
              </span>
            </Link>

            {/* Search option - visible on sm and up */}
            <div className="hidden sm:flex relative items-center max-w-xs md:max-w-sm w-full">
              <Input
                className="h-9 pr-9 rounded-lg border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus-visible:ring-emerald-600 text-sm"
                type="text"
                placeholder="Search articles..."
              />
              <button
                type="button"
                className="absolute right-2 text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-bold transition-colors"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-bold transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm font-bold transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleBtn}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {themeMode === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-slate-700" />
              )}
            </button>

            {/* User Logged In / Out */}
            {user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600">
                      <Avatar className="h-9 w-9 border border-gray-200 dark:border-slate-700">
                        <AvatarImage
                          src={user.photoUrl || userLogo}
                          alt={user.userName || "User"}
                        />
                        <AvatarFallback className="font-bold bg-emerald-600 text-white text-xs">
                          {user.userName ? user.userName.slice(0, 2).toUpperCase() : "US"}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 mt-2 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100"
                  >
                    <DropdownMenuLabel className="font-bold">
                      {user.userName || "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-100 dark:bg-slate-800" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/profile")}
                        className="cursor-pointer font-bold text-gray-700 dark:text-slate-200"
                      >
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/your-blog")}
                        className="cursor-pointer font-bold text-gray-700 dark:text-slate-200"
                      >
                        <ChartLine className="mr-2 h-4 w-4" />
                        <span>Your Blog</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/comments")}
                        className="cursor-pointer font-bold text-gray-700 dark:text-slate-200"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Comments</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/create-blog")}
                        className="cursor-pointer font-bold text-gray-700 dark:text-slate-200"
                      >
                        <PenSquare className="mr-2 h-4 w-4" />
                        <span>Create Blog</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-gray-100 dark:bg-slate-800" />
                    <DropdownMenuItem
                      onClick={logoutHandle}
                      className="cursor-pointer font-bold text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  onClick={logoutHandle}
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex font-bold border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-slate-200"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-bold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-slate-800 space-y-3">
            {/* Mobile Search */}
            <div className="sm:hidden relative flex items-center">
              <Input
                className="h-9 pr-9 rounded-lg border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100 text-sm"
                type="text"
                placeholder="Search articles..."
              />
              <Search
                size={16}
                className="absolute right-3 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-2 pt-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-base font-bold"
              >
                Home
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-base font-bold"
              >
                Blog
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-base font-bold"
              >
                About
              </Link>
              {user && (
                <div className="pt-2 border-t border-gray-200 dark:border-slate-800 flex flex-col space-y-2">
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-base font-bold flex items-center gap-2"
                  >
                    <UserIcon size={18} /> Profile
                  </Link>
                  <Link
                    to="/dashboard/your-blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-base font-bold flex items-center gap-2"
                  >
                    <ChartLine size={18} /> Your Blog
                  </Link>
                  <Link
                    to="/dashboard/create-blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-base font-bold flex items-center gap-2"
                  >
                    <PenSquare size={18} /> Create Blog
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logoutHandle();
                    }}
                    className="text-left px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-base font-bold flex items-center gap-2"
                  >
                    <LogOutIcon size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

