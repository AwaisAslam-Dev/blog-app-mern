import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { backendurl } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Auth = ({ token, setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(
          `${backendurl}/auth/api/login`,
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        if (response.data.success) {
          const newtoken = response.data.token;
          setToken(newtoken);
          localStorage.setItem("token", response.data.token);
          alert("Login successfully like");
        } else {
          alert(response.data.message);
        }
      } else {
        const response = await axios.post(
          `${backendurl}/auth/api/register`,
          { username, email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
          const newtoken = response.data.token;
          setToken(newtoken);
          localStorage.setItem("token", response.data.token);
          alert("Account has been created");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <section className="w-full min-h-screen flex justify-center items-center px-4 bg-linear-to-br from-blue-50 to-white py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          {/* Name only for Signup */}
          {!isLogin && (
            <div>
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              onChange={(e) => {
                setemail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative mt-1">
              <input
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-md text-lg font-semibold hover:bg-blue-700 transition mt-4">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {isLogin ? (
          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setIsLogin(false)}
            >
              Create One
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-600 mt-6">
            have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setIsLogin(true)}
            >
              Login now
            </span>
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default Auth;
