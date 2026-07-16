import { verifyToken } from "../utils/generateToken.js";
import User from "../models/User.js";

export async function requireAdminHttp(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "You must be logged in to do this." });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }

  const user = await User.findById(payload.userId);
  if (!user) {
    return res.status(401).json({ error: "User not found." });
  }
  if (user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }

  req.user = user;
  next();
}