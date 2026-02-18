import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetOtp: {
    type: String,
  },
  resetOtpExpire: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Users", userSchema);
