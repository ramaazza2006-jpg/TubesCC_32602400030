const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }, // bcrypt hash
  nim: { type: DataTypes.STRING, defaultValue: "" },
  semester: { type: DataTypes.STRING, defaultValue: "" },
  phone: { type: DataTypes.STRING, defaultValue: "" },
  university: {
    type: DataTypes.STRING,
    defaultValue: "Universitas Islam Sultan Agung",
  },
  program: { type: DataTypes.STRING, defaultValue: "Teknik Informatika" },
  photo: { type: DataTypes.TEXT, defaultValue: "" },
});

module.exports = User;
