import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./Project.js";

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  project_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  due_date: { type: DataTypes.DATE },
  priority: { type: DataTypes.ENUM("low", "medium", "high"), defaultValue: "medium" },
  status: { type: DataTypes.ENUM("pending", "in_progress", "completed"), defaultValue: "pending" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "tasks",
  timestamps: false
});

Task.belongsTo(Project, { foreignKey: "project_id" });

export default  Task;
