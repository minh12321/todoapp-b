import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Project = sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: "projects",
  timestamps: false
});

// Quan hệ
Project.belongsTo(User, { foreignKey: "user_id" });

export default Project;
