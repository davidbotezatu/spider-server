const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Project = require("./Project");
const TaskStatus = require("./TaskStatus");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titlu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TaskStatus,
      key: "id",
    },
  },
  idProiect: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: "id",
    },
  },
  reporter: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  assignee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

Task.belongsTo(TaskStatus, { foreignKey: "status", as: "taskStatus" });
Task.belongsTo(Project, { foreignKey: "idProiect", as: "projectName" });
Task.belongsTo(User, { foreignKey: "reporter", as: "reporterName" });
Task.belongsTo(User, { foreignKey: "assignee", as: "assigneeName" });

module.exports = Task;
