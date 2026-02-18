import React, { useState } from "react";
import { User, Feather, Menu, X, LogOutIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-lg px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Feather size={30} className="text-blue-600" />
        <span className="text-2xl font-bold text-blue-600">
          <NavLink to="/">Blogify</NavLink>
        </span>
      </motion.div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 text-lg">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          {token ? (
            <NavLink to="/createpost">Create Post</NavLink>
          ) : (
            <NavLink to="/auth">Get Started</NavLink>
          )}
        </motion.button>
        <NavLink to="/auth">
          <User
            className=" hover:text-blue-600 cursor-pointer transition"
            size={28}
          />
        </NavLink>
        {token ? (
          <span>
            <LogOutIcon
              className=" hover:text-blue-600 cursor-pointer transition"
              onClick={() => {
                setToken("");
                localStorage.removeItem("token");
                alert("Account has been logout");
              }}
              size={28}
            />
          </span>
        ) : (
          <></>
        )}
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-start p-4 gap-4 md:hidden text-lg"
          >
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition text-left">
              {token ? (
                <NavLink to="/createpost">Create Post</NavLink>
              ) : (
                <NavLink to="/auth">Get Started</NavLink>
              )}
            </button>
            <div className="flex items-center gap-2 text-gray-700 text-lg">
              <NavLink to="auth">
                <User size={26} /> Login
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
