import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Task from "./Task.js";

const SharedTask = sequelize.define("SharedTask", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  task_id: {type: DataTypes.INTEGER,allowNull: false, references: { model: Task, key: "id" },},
  user_id: {type: DataTypes.INTEGER,allowNull: false,references: { model: User, key: "id" },},
  permission: {type: DataTypes.ENUM("view", "edit"),allowNull: false,defaultValue: "view",},
});

// Quan hệ N-N giữa User và Task qua SharedTask
SharedTask.belongsTo(User, { foreignKey: "user_id" });
SharedTask.belongsTo(Task, { foreignKey: "task_id" });

User.hasMany(SharedTask, { foreignKey: "user_id" });
Task.hasMany(SharedTask, { foreignKey: "task_id" });


export default SharedTask;
