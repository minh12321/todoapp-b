import SharedTask from "../models/SharedTask.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const shareTask = async (req, res) => {
  try {
    const { id } = req.params; // task_id
    const { user_id, permission } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const shared = await SharedTask.create({
      task_id: id,
      user_id,
      permission: permission || "view",
    });

    res.json({ message: "Task shared successfully", shared });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSharedUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const sharedUsers = await SharedTask.findAll({
      where: { task_id: id },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    res.json(sharedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
