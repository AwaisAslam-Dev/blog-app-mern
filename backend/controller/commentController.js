import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
export const addcomment = async (req, res) => {
  try {
    const { text, blogId } = req.body;
    if (!text || !blogId) {
      return res.json({
        success: false,
        message: "comment and blog is required",
      });
    }
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    const comment = new commentModel({
      text,
      blog: blogId,
      user: userId,
      username: user.username,
    });
    await comment.save();
    return res.json({
      success: true,
      message: "comment has been added",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const delcomment = async (req, res) => {
  try {
    const userId = req.user.id;
    const commentId = req.params.id;
    const delcommit = await commentModel.findOneAndDelete({
      _id: commentId,
      user:userId,
    });
    //  if(!delcommit) {
    //   return res.json({
    //     success: false,
    //     message: "Comment not found or you are not the owner",
    //   });
    // }

    return res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const getallcomments = async (req, res) => {
    try {
        const blogId = req.params.id;
        const fetchcomment = await commentModel.find({blog:blogId})
        return res.json({success:true,message:"get all comments",fetchcomment})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
};
