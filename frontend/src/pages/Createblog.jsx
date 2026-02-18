import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import axios from "axios";
import { backendurl } from "../App";
const Createblog = ({ token }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnail, setthumbnail] = useState("");
  const [heading, setheading] = useState("");
  const [text, settext] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setthumbnail(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const publishblog = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("thumbnail", thumbnail);
      formdata.append("heading", heading);
      formdata.append("text", text);
     const response = await axios.post(
      `${backendurl}/blog/api/addblog`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
      if (response.data.success) {
        alert("blog has been published");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <section className="w-full min-h-screen px-6 py-24 bg-linear-to-b from-white to-blue-50 flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8"
      >
        <form onSubmit={publishblog}>
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create New Blog
        </h1>

        {/* Image Upload */}
        <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-blue-300 rounded-2xl cursor-pointer hover:border-blue-500 transition">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center text-blue-500">
              <ImagePlus size={40} />
              <p className="mt-2 text-sm">Click to upload image</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* Title */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-1">
            Heading
          </label>
          <input
            onChange={(e) => {
              setheading(e.target.value);
            }}
            type="text"
            placeholder="Enter blog title..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Text */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-1">
            Content
          </label>
          <textarea
            onChange={(e) => {
              settext(e.target.value);
            }}
            placeholder="Write your blog content here..."
            rows="6"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
         type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl shadow-md text-lg font-semibold hover:bg-blue-700 transition"
        >
          Publish Blog
        </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Createblog;
