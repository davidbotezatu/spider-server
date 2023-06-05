const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  descriere: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsabil: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

//Asociere dintre proiect si utilizator (responsabil)
Project.belongsTo(User, { foreignKey: "responsabil", as: "responsible" });

module.exports = Project;
