const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserRole = sequelize.define("UserRole", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserRole;
