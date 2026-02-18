import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Createblog from "./pages/Createblog";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import SingleBlog from "./components/SingleBlog.jsx";
export const  backendurl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token" || ""))
  return (
    <div >
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home token={token}/>} />
        <Route path="createpost" element={<Createblog token={token} />} />
        <Route path="auth" element={<Auth token={token} setToken={setToken} />} />
        <Route  path="blog/:id" element={<SingleBlog token={token}/>} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
