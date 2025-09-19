import express from "express";
import {createNotification,getNotifications,markAsRead,} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/:userId", getNotifications);
router.put("/:id/read", markAsRead);

export default router;
