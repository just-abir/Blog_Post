import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* ================= First Column ================= */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />

              <h2 className="text-2xl font-bold">BlogSphere</h2>
            </div>

            <div className="mt-6 space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </div>

          {/* ================= Second Column ================= */}

          <div>
            <h2 className="text-xl font-semibold mb-5">Quick Links</h2>

            <div className="flex flex-col gap-3 text-gray-300">
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>

              <Link to="/blog" className="hover:text-blue-400">
                Blogs
              </Link>

              <Link to="/about" className="hover:text-blue-400">
                About Us
              </Link>

              <Link to="/faq" className="hover:text-blue-400">
                FAQs
              </Link>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Follow Us</h2>

            <div className="flex gap-5 text-2xl">
              <a href="#">
                <FaFacebook className="hover:text-blue-500 transition" />
              </a>

              <a href="#">
                <FaGithub className="hover:text-gray-400 transition" />
              </a>

              <a href="#">
                <FaInstagram className="hover:text-pink-500 transition" />
              </a>
            </div>
          </div>

          {/* ================= Third Column ================= */}

          <div>
            <h2 className="text-xl font-semibold">Subscribe Newsletter</h2>

            <p className="text-gray-300 mt-4 leading-7">
              Stay updated with our latest blogs, tutorials and programming
              tips. Join our newsletter today.
            </p>

            <div className="mt-6 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3    bg-white rounded-l-lg outline-none text-black"
              />

              <button className="bg-blue-600 px-6 rounded-r-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} BlogSphere. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
