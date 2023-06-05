const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TaskStatus = sequelize.define("TaskStatus", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TaskStatus;
