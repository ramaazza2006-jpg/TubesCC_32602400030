const { sequelize } = require("../config/db");
const User = require("./User");
const Course = require("./Course");
const Task = require("./Task");
const Note = require("./Note");
const Schedule = require("./Schedule");
const Material = require("./Material");

// Associations — every resource belongs to the user who owns it
User.hasMany(Course, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Note, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Schedule, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Material, { foreignKey: "userId", onDelete: "CASCADE" });

Course.belongsTo(User, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });
Schedule.belongsTo(User, { foreignKey: "userId" });
Material.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Course, Task, Note, Schedule, Material };
