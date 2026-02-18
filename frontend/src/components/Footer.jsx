import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Blogify</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            A modern platform to explore quality blogs, learn, and share knowledge.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Blogs</li>
            <li className="hover:text-white cursor-pointer transition">Create Blog</li>
            <li className="hover:text-white cursor-pointer transition">About</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 mt-2">
            <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition" />
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} YourBrand — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
