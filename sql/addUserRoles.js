const sequelize = require("../config/database");
const UserRole = require("../models/UserRole");

const addUserRoles = async () => {
  try {
    // Synchronize the models with the database
    const exists = await UserRole.findOne({ nume: "Administrator" });
    if (exists) {
      console.log("Rolurile exista deja");
      return;
    }

    // Create the roles
    const adminRole = await UserRole.create({
      nume: "Administrator",
    });
    console.log("Administrator role created:", adminRole.toJSON());

    const userRole = await UserRole.create({
      nume: "Utilizator",
    });
    console.log("User role created:", userRole.toJSON());
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

module.exports = { addUserRoles };
