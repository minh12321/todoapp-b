import express from "express";
import { shareTask, getSharedUsers } from "../controllers/sharingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/tasks/:id/share", shareTask);
router.get("/tasks/:id/shared", getSharedUsers);

export default router;
