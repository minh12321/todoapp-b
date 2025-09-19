import express from "express";
import {
  getTags,
  createTag,
  deleteTag,
  addTagToTask,
} from "../controllers/tagController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getTags);
router.post("/", createTag);
router.delete("/:id", deleteTag);
router.post("/tasks/:id/tags/:tagId", addTagToTask);

export default router;
