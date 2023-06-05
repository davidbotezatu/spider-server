const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserRole = require("./UserRole");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  parola: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserRole,
      key: "id",
    },
  },
  schimbaParola: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// Define the association
User.belongsTo(UserRole, { foreignKey: "rol", as: "role" });

module.exports = User;
