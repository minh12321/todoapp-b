import express from "express";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  getStats,
} from "../controllers/adminController.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/admin/users", isAdmin, getUsers);
router.put("/admin/users/:id/status", isAdmin, updateUserStatus);
router.put("/admin/users/:id/role", isAdmin, updateUserRole);
router.get("/admin/stats", isAdmin, getStats);

export default router;
