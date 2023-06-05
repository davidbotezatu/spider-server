const bcrypt = require("bcryptjs");
const randomPass = require("../utils/generatePassword");
const sendEmail = require("../utils/sendEmail");
const { emailUserNou, schimbareParola } = require("../utils/emailTemplates");

const User = require("../models/User");
const UserRole = require("../models/UserRole");

exports.getUsers = async (req, res) => {
  try {
    const { sortBy = "asc" } = req.query;

    const users = await User.findAll({
      order: [
        ["nume", sortBy === "desc" ? "DESC" : "ASC"],
        ["prenume", sortBy === "desc" ? "DESC" : "ASC"],
      ],
      attributes: ["id", "nume", "prenume"],
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsersWithPagination = async (req, res) => {
  try {
    const { page, limit, sortBy = "asc" } = req.query;

    const users = await User.findAndCountAll({
      include: [{ model: UserRole, as: "role" }],
      order: [
        ["nume", sortBy === "desc" ? "DESC" : "ASC"],
        ["prenume", sortBy === "desc" ? "DESC" : "ASC"],
      ],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    const totalPages = Math.ceil(users.count / limit);
    res.json({ users: users.rows, totalPages });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { nume, prenume, email, avatar, rol, schimbaParola } = req.body;

    const pass = randomPass;
    const hashedPassword = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      nume,
      prenume,
      email,
      parola: hashedPassword,
      avatar,
      rol,
      schimbaParola,
    });

    const emailContent = emailUserNou(pass);
    sendEmail(email, emailContent.subiect, emailContent.text);

    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { avatar, nume, prenume, email, parola, rol, schimbaParola } =
      req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user fields
    user.avatar = avatar;
    user.nume = nume;
    user.prenume = prenume;
    user.email = email;
    user.rol = rol;
    user.schimbaParola = schimbaParola;

    if (parola) {
      user.parola = await bcrypt.hash(parola, 10);
      sendEmail(email, schimbareParola.subiect, schimbareParola.text);
    }

    // Save the updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
