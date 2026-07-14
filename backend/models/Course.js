const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Course = sequelize.define("Course", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  lecturer: { type: DataTypes.STRING, defaultValue: "" },
  sks: { type: DataTypes.INTEGER, defaultValue: 0 },
  semester: { type: DataTypes.INTEGER, defaultValue: 1 },
  color: { type: DataTypes.STRING, defaultValue: "#2563EB" },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Course;
