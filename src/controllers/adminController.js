import User from "../models/User.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { Op } from "sequelize";

// limit 50
export const getUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    const { count, rows } = await User.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes: ["id", "name", "email", "role", "is_banned", "created_at"],
      order: [["created_at", "DESC"]],
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      users: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// "active" | "banned" | "expired" | "locked_login"
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "banned", "expired", "locked_login"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.status = status;
    await user.save();

    res.json({ message: "User status updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// thay quyền
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; 

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Sai cú pháp. Chỉ : 'user' hoặc 'admin'." });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Không Thấy User" });

    if (user.role === "admin" && role === "user") {
      const adminCount = await User.count({ where: { role: "admin" } });
      if (adminCount <= 1) {
        return res.status(400).json({ error: "Không được thay thế admin cuối cùng" });
      }
    }

    user.role = role;
    await user.save();

    res.json({ message: "cập nhật quyền thành công", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// lấy stats
export const getStats = async (req, res) => {
  try {
    const { range } = req.query;

    let dateWhere = {};
    const now = new Date();

    if (range === "monthly") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      dateWhere = { [Op.gte]: start };
    } else if (range === "weekly") {
      const start = new Date();
      start.setDate(now.getDate() - 7);
      dateWhere = { [Op.gte]: start };
    }

    const totalUsers = await User.count({ where: range ? { created_at: dateWhere } : {} });
    const totalTasks = await Task.count({ where: range ? { created_at: dateWhere } : {} });
    const totalProjects = await Project.count({ where: range ? { created_at: dateWhere } : {} });

    res.json({
      users: totalUsers,
      tasks: totalTasks,
      projects: totalProjects,
      range: range || "all-time",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
