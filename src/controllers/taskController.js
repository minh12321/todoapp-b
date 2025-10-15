import Task from "../models/Task.js";

// Danh sách task theo project
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { project_id: req.params.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tạo task
export const createTask = async (req, res) => {
  try {
    const { project_id, title, description, due_date, priority, status } = req.body;
    console.log("📩 Payload nhận từ FE:", req.body);
    const task = await Task.create({ project_id, title, description, due_date, priority, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Chi tiết task
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật task
export const updateTask = async (req, res) => {
  try {
    const { title, description, due_date, priority, status } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.due_date = due_date ?? task.due_date;
    task.priority = priority ?? task.priority;
    task.status = status ?? task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
