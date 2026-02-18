import { Blogcontext } from "../context/Blogcontext";
import { useParams } from "react-router-dom";
import { backendurl } from "../App";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
const SingleBlog = () => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const userId = user?.id;
  const { id } = useParams();
  const { blogs } = useContext(Blogcontext);
  const [foundblog, setfoundblog] = useState(null);
  const [comments, setcomments] = useState([]);
  const [textcomment, settextcomment] = useState("");

  // Fetch the blog
  useEffect(() => {
    const fetchBlog = async () => {
      let blogFromContext = blogs.find((b) => b._id === id);
      if (blogFromContext) {
        setfoundblog(blogFromContext);
        window.scrollTo(0, 0);
      } else {
        try {
          const res = await axios.get(`${backendurl}/blog/api/getallblog`);
          if (res.data.success) {
            let blogFromApi = res.data.fetchblog.find((b) => b._id === id);
            if (blogFromApi) {
              setfoundblog(blogFromApi);
              window.scrollTo(0, 0);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchBlog();
  }, [blogs, id]);

  // Fetch comments
  useEffect(() => {
    const getallcomments = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `${backendurl}/comment/api/getcomments/${id}`
        );
        if (response.data.success) {
          setcomments(response.data.fetchcomment);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getallcomments();
  }, [id]);

  const postComments = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendurl}/comment/api/addcomment`,
        { text: textcomment, blogId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setcomments((prev) => [...prev, response.data.comment]); // add new comment
        settextcomment(""); // clear input
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removehandler = async (comId) => {
    try {
      const res = await axios.delete(
        `${backendurl}/comment/api/deletecomment/${comId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        const newComment = comments.filter((c) => c._id !== comId);
        setcomments(newComment);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error)
      
    }
  };
  // Always render component; handle loading / not found in JSX
  return (
    <section className="w-full px-5 md:px-16 py-10 animate-fadeIn mt-20">
      {!foundblog ? (
        <div className="w-full min-h-screen flex justify-center items-center text-gray-700 text-xl">
          Loading blog...
        </div>
      ) : (
        <>
          {/* BLOG IMAGE */}
          <img
            src={`${backendurl}/uploads/${foundblog.thumbnail}`}
            className="w-full h-72 md:h-112 object-cover rounded-2xl shadow-lg"
          />
          {/* CONTENT */}
          <h1 className="text-3xl md:text-5xl font-extrabold mt-8 text-gray-900 leading-tight">
            {foundblog.heading}
          </h1>
          {/* AUTHOR */}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {foundblog.user.username.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {foundblog.user.username}
              </p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
          {/* DESCRIPTION */}
          <p className="text-gray-700 mt-8 text-lg leading-relaxed md:w-4/5">
            {foundblog.text}
          </p>
          {/* COMMENTS */}
          <div className="mt-16 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Comments</h2>
            <form onSubmit={postComments} className="flex gap-3 mb-6">
              <input
                value={textcomment}
                onChange={(e) => settextcomment(e.target.value)}
                type="text"
                placeholder="Write a comment..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Post
              </button>
            </form>
            {comments.map((c) => (
              <div key={c._id} className="space-y-5">
                <div className="flex gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {c.username.charAt(0)}
                  </div>
                  <div className="bg-gray-100 px-4 py-3 rounded-xl max-w-lg ">
                    <p className="text-sm font-medium text-gray-900">
                      {c.username}
                    </p>
                    <p className="text-gray-700 text-sm">{c.text}</p>
                  </div>
                  {c.user === userId && (
                    <>
                      <button
                        onClick={()=>removehandler(c._id)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleBlog;
