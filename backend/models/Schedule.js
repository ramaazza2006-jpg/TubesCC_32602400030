const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Schedule = sequelize.define("Schedule", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  day: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.STRING, allowNull: false },
  lecturer: { type: DataTypes.STRING, defaultValue: "" },
  room: { type: DataTypes.STRING, defaultValue: "" },
  start: { type: DataTypes.STRING, allowNull: false },
  end: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Schedule;
