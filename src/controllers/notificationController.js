import Notification from "../models/Notification.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

// Tạo thông báo
export const createNotification = async (req, res) => {
  try {
    const { task_id, user_id, notify_time } = req.body;
    const notification = await Notification.create({task_id,user_id,notify_time,status: "pending",});

    res.status(201).json({ message: "Đã tạo thông Báo", notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy danh sách thông báo của user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.findAll({
      where: { user_id: userId },
      include: [
        { model: Task, attributes: ["id", "title", "due_date"] },
      ],
      order: [["notify_time", "DESC"]],
    });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Đánh dấu đã đọc
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);
    if (!notification) return res.status(404).json({ error: "Thông báo không tồn tại" });

    notification.status = "read";
    await notification.save();

    res.json({ message: "Notification marked as read", notification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
