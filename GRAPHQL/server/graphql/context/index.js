import { verifyToken } from "../../utils/generateToken.js";
import User from "../../models/User.js";

export async function buildContext({ req }) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) return { user: null };

  const payload = verifyToken(token);
  if (!payload) return { user: null };

  const user = await User.findById(payload.userId);
  return { user };
}

export function requireAuth(context) {
  if (!context.user) {
    const err = new Error("You must be logged in to do this.");
    err.extensions = { code: "UNAUTHENTICATED" };
    throw err;
  }
  return context.user;
}

export function requireAdmin(context) {
  const user = requireAuth(context);
  if (user.role !== "admin") {
    const err = new Error("Admin access required.");
    err.extensions = { code: "FORBIDDEN" };
    throw err;
  }
  return user;
}