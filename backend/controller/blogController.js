import blogmodel from "../models/blogmodel.js";
export const addblog = async (req, res) => {
  try {
    const { heading, text } = req.body;
    if (!req.file) {
      return res.json({ success: false, message: "Thumbnail is required" });
    }
    const blog = new blogmodel({
      thumbnail: req.file.filename,
      heading,
      text,
      user: req.user._id,
    });
    await blog.save();
    return res.json({ success: true, message: "Blog has been added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const delblog = async (req, res) => {
  try {
    const removeblog = await blogmodel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!removeblog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or not authorized to delete",
      });
    }
    return res.json({ success: true, message: "blog delete successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const updateblog = async (req, res) => {
  try {
    const { heading, text } = req.body;
    if (!heading && !text && !req.file) {
      return res.json({ success: false, message: "makes some changing" });
    }
    const updateData = {};
    if (heading) updateData.heading = heading;
    if (text) updateData.text = text;
    if (req.file) updateData.thumbnail = req.file.filename;

    const updateBlog = await blogmodel.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );
    if (!updateBlog) {
      return res.json({ success: false, message: "blog is required" });
    }
    return res.json({
      success: true,
      message: "successfully updated",
      blog: updateBlog,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const getallblog = async (req, res) => {
  try {
    const fetchblog = await blogmodel.find({}).populate("user", "username");
    return res.json({success:true,message:"get all blogs",fetchblog})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
