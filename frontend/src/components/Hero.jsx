import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-center px-6 bg-linear-to-b from-blue-50 to-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4"
      >
        Discover Amazing Stories
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
      >
        Dive into insightful articles, trending topics, and creative posts shared by writers around the world.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-xl flex items-center bg-gray-200 shadow-lg rounded-2xl px-4 py-3 "
      >
        <Search className="text-gray-500" size={24} />
        <input
          type="text"
          placeholder="Search for blogs, topics, or authors..."
          className="w-full ml-3 outline-none text-gray-700 placeholder-gray-400"
        />
      </motion.div>

      {/* Small Bottom Text */}
      <p className="mt-6 text-gray-500 text-sm">Start exploring thousands of posts today</p>
    </section>
  );
};

export default Hero;
