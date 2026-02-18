import React, { useContext, useEffect, useState } from "react";
import { backendurl } from "../App";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Blogcontext } from "../context/Blogcontext";
const Blog = () => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const userId = user?.id;
  const navigate = useNavigate();
  const {blogs,setblogs} = useContext(Blogcontext)
  const [fetchBlog, setfetchBlog] = useState([]);
  const fetchdata = async () => {
    try {
      const response = await axios.get(`${backendurl}/blog/api/getallblog`);
      if (response.data.success) {
        setblogs(response.data.fetchblog);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const delbloghandler = async (blogid) => {
    try {
      const response = await axios.delete(
        `${backendurl}/blog/api/deleteblog/${blogid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.data.success) {
        const newblog = blogs.filter((blogs) => blogs._id !== blogid);
        setblogs(newblog);
      } else {
        alert(response.data.message);
      }
      console.log("i have click");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <section className="w-full min-h-screen px-6 py-24 bg-linear-to-b from-white to-blue-50">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12 animate-fadeIn">
        Explore Our Blogs
      </h1>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className={`
              bg-white rounded-3xl shadow-lg overflow-hidden 
              hover:shadow-2xl transition-all cursor-pointer group 
              transform opacity-0 animate-slideUp

            `}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={`${backendurl}/uploads/${blog.thumbnail}`}
                alt="image"
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                {blog.heading}
              </h2>

              {/* READ BTN */}
              <div className="flex flex-wrap gap-3 mb-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm shadow-md">
                  <Link to={`blog/${blog._id}`}> Read More</Link>
                  
                </button>
                {blog.user._id === userId && (
                  <>
                    <button
                      onClick={() => delbloghandler(blog._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition text-sm shadow-md"
                    >
                      Delete
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition text-sm shadow-md">
                      Update
                    </button>
                  </>
                )}
              </div>

              {/* AUTHOR SECTION */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  {blog.user.username.charAt(0)}
                </div>
                <span className="text-sm text-gray-700 font-semibold">
                  {blog.user.username}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
