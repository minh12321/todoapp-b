import express from "express";
import { createTask,getTaskById ,updateTask,deleteTask ,getTasksByProject} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
// CRUD Task
router.post("/tasks", createTask);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// Task theo project
router.get("/projects/:id/tasks", getTasksByProject);

export default router;
