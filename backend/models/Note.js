const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Note = sequelize.define("Note", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.STRING, defaultValue: "" },
  content: { type: DataTypes.TEXT, defaultValue: "" },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Note;
