import express from "express";
import { healthCheck } from "../controllers/homecontroller.js";

const router = express.Router();

// API information
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ecommerce API is running",
    version: "1.0.0",
    docs: "/api/health"
  });
});

// Health monitoring
router.get("/health", healthCheck);

export default router;