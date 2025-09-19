import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Tag = sequelize.define("Tag",
    {
        id: {type: DataTypes.INTEGER ,autoIncrement:true,primaryKey:true},
        name :{ type : DataTypes.STRING ,allowNull :false },
        user_id:{type :DataTypes.INTEGER ,allowNull :false}
    },
    {
        tableName : "Tag",
        timestamps :false,
    }
)
// Quan hệ
User.hasMany(Tag,{foreignKey:"user_id"})
Tag.belongsTo(User,{foreignKey:"user_id"})


export default Tag;
