import express from "express";
import { getMe, updateMe, updatePassword } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();



router.get("/me", authMiddleware, getMe);
router.put("/me", authMiddleware, updateMe);
router.put("/me/password", authMiddleware, updatePassword);

export default router;
