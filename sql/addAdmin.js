const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const addAdmin = async () => {
  const parola = process.env.ADMIN_PASS;
  const hashedPass = await bcrypt.hash(parola, 10);

  try {
    // Check if admin user already exists
    const existingAdminUser = await User.findOne({ email: "admin@company.ro" });
    if (existingAdminUser) {
      console.log("admin@company.ro user exista deja");
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      email: "admin@company.ro",
      nume: "Admin",
      prenume: "Admin",
      rol: 1,
      parola: hashedPass,
      avatar: "/src/assets/avatar.png",
      schimbaParola: false,
    });

    console.log("admin@company.ro creat:", adminUser.toJSON());
  } catch (error) {
    console.error("Eroare creare Admin:", error);
  }
};

module.exports = {
  addAdmin,
};
