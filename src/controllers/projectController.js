
import Task from "../models/Task.js";
import Project from "../models/Project.js";

// Lấy danh sách project
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo project mới
export const createProject = async (req, res) => {
  try {
    const { user_id, name } = req.body;
    const project = await Project.create({ user_id, name });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Chi tiết project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật project
export const updateProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    project.name = name;
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: "Not found" });
    await project.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Danh sách task theo project
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { project_id: req.params.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
