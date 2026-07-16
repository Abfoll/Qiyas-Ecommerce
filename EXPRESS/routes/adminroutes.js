import express from "express";
import { getDashboardStats } from "../controllers/admincontroller.js";
import { protect } from "../middleware/auth.js";
import isAdmin from "../middleware/admin.js";

const router = express.Router();

// Every route here is admin-only. Feature-specific admin actions (managing
// products, orders, users, blog posts) live in their own route files
// (productRoutes, orderRoutes, etc.) behind the same `isAdmin` guard —
// this file is just for cross-cutting admin views like the dashboard.
router.use(protect, isAdmin);

router.get('/dashboard', getDashboardStats);

export default router;
