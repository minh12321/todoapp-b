import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Task from "./Task.js";
import User from "./User.js";

const Notification = sequelize.define("Notification", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  task_id: {type: DataTypes.INTEGER,allowNull: false,references: { model: Task, key: "id" },},
  user_id: {type: DataTypes.INTEGER,allowNull: false,references: { model: User, key: "id" },},
  notify_time: { type: DataTypes.DATE, allowNull: false },
  status: {type: DataTypes.ENUM("pending", "sent", "read"),defaultValue: "pending",},
});

// quan hệ 
Notification.belongsTo(Task, { foreignKey: "task_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Notification, { foreignKey: "user_id" });
Task.hasMany(Notification, { foreignKey: "task_id" });

export default Notification;
