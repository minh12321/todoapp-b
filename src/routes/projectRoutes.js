import express from "express";
import { getProjectById, getProjects ,createProject ,updateProject,deleteProject} from "../controllers/projectController.js";
import { createTask,getTaskById ,updateTask,deleteTask ,getTasksByProject} from "../controllers/taskController.js";

const router = express.Router();

router.get("/projects", getProjects);
router.post("/projects", createProject);
router.get("/projects/:id", getProjectById);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// Task theo project
router.get("/projects/:id/tasks", getTasksByProject);

export default router;
