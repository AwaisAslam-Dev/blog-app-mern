import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1]; // Bearer token 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   // decoded = { id: "...", role: "user/admin" }

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; //  FULL USER (id, email, role, everything)
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ADMIN ONLY
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// USER ONLY
export const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Users only" });
  }
  next();
};
