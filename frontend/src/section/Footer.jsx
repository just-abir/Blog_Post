import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 border-t border-slate-800 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* ================= First Column ================= */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="FLOG Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight text-white">FLOG</span>
            </Link>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Empowering writers and readers around the world to share, discover, and learn latest tech insights.
            </p>

            <div className="mt-6 space-y-2.5 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-emerald-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-emerald-400 shrink-0" />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </div>

          {/* ================= Second Column ================= */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>

            <div className="flex flex-col gap-2.5 text-sm text-slate-300">
              <Link to="/" className="font-bold hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link to="/blog" className="font-bold hover:text-emerald-400 transition-colors">
                All Blogs
              </Link>
              <Link to="/about" className="font-bold hover:text-emerald-400 transition-colors">
                About Us
              </Link>
            </div>

            <h3 className="text-lg font-bold text-white mt-6 mb-3">Follow Us</h3>

            <div className="flex gap-4 text-xl">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-pink-400 hover:bg-slate-700 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* ================= Third Column ================= */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-white mb-2">Subscribe Newsletter</h3>

            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              Stay updated with our latest blogs, tutorials, and programming tips.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg outline-none text-white text-sm focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-lg text-white font-bold text-sm transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs sm:text-sm text-slate-400">
          © {new Date().getFullYear()} FLOG. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

