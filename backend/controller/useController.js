import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { sendMail } from "../utils/mailer.js";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const exsitUser = await userModel.findOne({ email });
      if (exsitUser) {
        return res.json({ success: false, message: "use another email" });
      }
      if (password.length < 6) {
        return res.json({
          success: false,
          message: "enter the strong password",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
      const user = new userModel({
        username,
        email,
        password: hashpassword,
      });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Acoount has been created",
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const existuser = await userModel.findOne({ email });
      if (existuser) {
        const userpassword = await bcrypt.compare(password, existuser.password);
        if (userpassword) {
          const token = jwt.sign(
            { id: existuser._id, role: existuser.role },
            process.env.JWT_SECRET
          );
          return res.json({
            success: true,
            message: "login successfully",
            token,
            role: existuser.role,
          });
        } else {
          return res.json({
            succcess: false,
            message: "something went wrong..",
          });
        }
      } else {
        return res.json({ success: false, message: "something went wrong" });
      }
    } else {
      return res.json({ success: false, message: "enter all fields" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const admin = async () => {
  try {
    const hashpassword = await bcrypt.hash("awaisaslam12", 10);
    const user = new userModel({
      username: "admin",
      email: "awaisaslam@gmail.com",
      password: hashpassword,
      role: "admin",
    });
    await user.save();
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
    return { success: true, message: "okay admin", token, role: user.role };
  } catch (error) {
    console.log(error);
  }
};
// admin()
export const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 9000000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send OTP Email
    await sendMail({
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export const resetPassword = async (req, res) => {
try {
    const { email, otp, setpassword } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "Invalid email" });
  }
  if (user.resetOtp !== otp) {
    return res.json({ success: false, message: "invalid otp" });
  }
  if(user.resetOtpExpire < Date.now()){
    return res.json({success:false,message:"otp is expired"})
  }
  const salt = await bcrypt.genSalt(10);
 const hashed  = await bcrypt.hash(setpassword,salt);
 user.password=hashed;
 user.resetOtp=undefined;
 user.resetOtpExpire=undefined;
 await user.save();
 return res.json({ success: true, message: "Password reset successful" });

} catch (error) {
  console.log(error);
  return res.json({success:false,message:error.message})
  
}

};
