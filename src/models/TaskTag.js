import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Task from "./Task.js";
import Tag from "./Tag.js";

const TaskTag= sequelize.define("TaskTag",{
    task_id :{type :DataTypes.INTEGER ,primaryKey :true},
    tag_id :{type :DataTypes.INTEGER ,primaryKey :true},
},
{
    tableName :"TaskTag",
    timestamps :false,
});

Task.belongsToMany(Tag,{through :TaskTag ,foreignKey:"task_id"});
Tag.belongsToMany(Task,{through :TaskTag ,foreignKey:"tag_id"});

export default TaskTag;