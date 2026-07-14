const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define("Task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.STRING, defaultValue: "" },
  priority: {
    type: DataTypes.ENUM("High", "Medium", "Low"),
    defaultValue: "Medium",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Not Started",
  },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  deadline: { type: DataTypes.DATEONLY, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Task;
