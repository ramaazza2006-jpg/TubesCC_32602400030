const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Material = sequelize.define("Material", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  course: { type: DataTypes.STRING, defaultValue: "" },
  size: { type: DataTypes.STRING, defaultValue: "" },
  type: { type: DataTypes.STRING, defaultValue: "" },
  uploadDate: { type: DataTypes.STRING, defaultValue: "" },
  s3Key: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.TEXT, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Material;
